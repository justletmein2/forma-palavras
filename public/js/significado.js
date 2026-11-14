// Significado resumido das palavras, puxado do Wikcionário (pt.wiktionary.org) na hora do toque.
// Plural, feminino e verbo conjugado ("acharam") viram a palavra base ("achar").
import { lookup, semAcento, ehPalavrao } from './dict.js';

const API = 'https://pt.wiktionary.org/w/api.php?action=parse&prop=text&format=json&origin=*&formatversion=2&redirects=1&page=';
export const paginaWiki = w => 'https://pt.wiktionary.org/wiki/' + encodeURIComponent(w);

// Classes gramaticais que interessam (o resto, tipo Anagramas e Tradução, fica de fora)
const CLASSES = /^(Substantivo|Verbo|Adjetivo|Advérbio|Interjeição|Pronome|Preposição|Conjunção|Numeral|Artigo|Locução|Contração|Forma|Particípio|Gerúndio)/i;
const FEIO = /\((obsceno|chulo|vulgar|calão|tabuísmo)[^)]*\)/i;

const cache = new Map();

// Lê a página do Wikcionário e devolve as seções em português: [{classe, defs, base}]
async function ler(palavra) {
  if (cache.has(palavra)) return cache.get(palavra);
  const p = (async () => {
    const r = await fetch(API + encodeURIComponent(palavra)).then(x => x.json());
    if (r.error) { if (r.error.code === 'missingtitle') return []; throw new Error(r.error.code); } // ex.: muitas buscas seguidas
    if (!r.parse) return [];
    const doc = new DOMParser().parseFromString(r.parse.text, 'text/html');
    doc.querySelectorAll('style, script, sup.reference').forEach(x => x.remove());
    const raiz = doc.querySelector('.mw-parser-output') || doc.body;
    let emPt = false, classe = null;
    const secoes = [];
    // percorre títulos e listas na ordem da página (mesmo dentro de caixas/divs)
    for (const el of raiz.querySelectorAll('.mw-heading, h1, h2, h3, h4, ol')) {
      if (/^H\d$/.test(el.tagName) && el.parentElement.classList.contains('mw-heading')) continue;
      if (el.tagName === 'OL' && el.parentElement.closest('ol, li')) continue;
      const nivel = el.matches('.mw-heading1, h1') ? 1 : el.matches('.mw-heading, h2, h3, h4') ? 2 : 0;
      const txt = el.textContent.replace(/\[editar\]/g, '').trim();
      if (nivel === 1) { emPt = /^Portugu/i.test(txt); continue; }
      if (!emPt) continue;
      if (nivel) { classe = CLASSES.test(txt) ? txt.replace(/\d+$/, '').trim() : null; continue; }
      if (el.tagName !== 'OL' || !classe) continue;
      const lis = [...el.children].filter(li => li.tagName === 'LI');
      let base = null;
      const defs = lis.map(li => {
        const c = li.cloneNode(true);
        c.querySelectorAll('dl, ul, ol').forEach(x => x.remove());
        if (!base && /^Forma|Particípio|Gerúndio/i.test(classe)) {
          const links = [...c.querySelectorAll('a[href^="/wiki/"]')].map(a => decodeURIComponent(a.getAttribute('href').slice(6)).replace(/_/g, ' ').split('#')[0]).filter(t => !t.includes(':'));
          base = links[links.length - 1] || null;
        }
        return c.textContent.replace(/\s+/g, ' ').trim().replace(/[.:;]$/, '');
      }).filter(Boolean);
      if (defs.length) secoes.push({ classe, defs, base });
    }
    return secoes;
  })().catch(e => { cache.delete(palavra); throw e; });
  cache.set(palavra, p);
  return p;
}

const sep = t => t.split(' ');
const VERBOS = [
  ['ar', sep('o as a amos ais am ei aste ou astes aram ava avas ávamos áveis avam ara aras áramos áreis arei arás ará aremos areis arão aria arias aríamos aríeis ariam e es emos eis em asse asses ássemos ásseis assem ares armos ardes arem ando ado ada ados adas')],
  ['er', sep('o es e emos eis em i este eu estes eram ia ias íamos íeis iam era eras êramos êreis erei erás erá eremos ereis erão eria erias eríamos eríeis eriam a as amos ais am esse esses êssemos êsseis essem eres ermos erdes erem endo ido ida idos idas')],
  ['ir', sep('o es e imos is em i iste iu istes iram ia ias íamos íeis iam ira iras íramos íreis irei irás irá iremos ireis irão iria irias iríamos iríeis iriam a as amos ais am isse isses íssemos ísseis issem ires irmos irdes irem indo ido ida idos idas')],
].map(([inf, fins]) => [inf, fins.sort((x, y) => y.length - x.length)]);

// Palavras "base" prováveis quando o Wikcionário não tem a forma flexionada
function candidatos(w) {
  const out = [];
  // "solto" aceita acento diferente (cafezinho → café); no resto a grafia tem que bater (evita ester → éster)
  const add = (c, solto = false) => {
    const r = c.length >= 2 && lookup(semAcento(c), false);
    if (r && r.word !== w && (solto || r.word === c) && !out.includes(r.word)) out.push(r.word);
  };
  // diminutivos, plurais e femininos
  for (const [fim, troca] of [['zinhos', ''], ['zinhas', ''], ['zinho', ''], ['zinha', ''], ['inhos', 'o'], ['inhas', 'a'], ['inho', 'o'], ['inha', 'a'],
    ['ões', 'ão'], ['ães', 'ão'], ['ais', 'al'], ['éis', 'el'], ['eis', 'el'], ['óis', 'ol'], ['is', 'il'], ['ns', 'm'], ['res', 'r'], ['zes', 'z'], ['ses', 's'], ['s', '']]) {
    if (w.endsWith(fim) && w.length > fim.length + 1) add(w.slice(0, -fim.length) + troca, fim.includes('inh'));
  }
  const sing = w.endsWith('s') ? w.slice(0, -1) : w;
  if (sing.endsWith('a')) add(sing.slice(0, -1) + 'o');
  // verbos conjugados: só quando o final é mesmo uma terminação de verbo regular
  for (const [inf, fins] of VERBOS) for (const f of fins) {
    if (!w.endsWith(f) || w.length - f.length < 2) continue;
    const raiz = w.slice(0, -f.length);
    add(raiz + inf);
    // mudanças de grafia: fique → ficar, chegue → chegar, comece → começar, corrija → corrigir, conheço → conhecer
    if (raiz.endsWith('qu')) add(raiz.slice(0, -2) + 'c' + inf);
    if (raiz.endsWith('gu')) add(raiz.slice(0, -2) + 'g' + inf);
    if (raiz.endsWith('c') && inf === 'ar') add(raiz.slice(0, -1) + 'ç' + inf);
    if (raiz.endsWith('ç') && inf !== 'ar') add(raiz.slice(0, -1) + 'c' + inf);
    if (raiz.endsWith('j') && inf !== 'ar') add(raiz.slice(0, -1) + 'g' + inf);
    if (raiz.endsWith('g') && inf !== 'ar') add(raiz + 'u' + inf);
  }
  return out.slice(0, 4);
}

const principais = s => s.filter(x => !/^(Forma|Particípio|Gerúndio)/i.test(x.classe));

// Fica só a classe principal: a que tem mais sentidos (ex.: "achar" verbo, e não "achar" a conserva indiana)
function resumo(secoes, family, palavrao) {
  const ord = [...secoes].sort((a, b) => b.defs.length - a.defs.length);
  if (palavrao) ord.sort((a, b) => /Interjei/i.test(b.classe) - /Interjei/i.test(a.classe));
  for (const s of ord) {
    const defs = s.defs.filter(d => !(family && FEIO.test(d))).slice(0, 3);
    if (defs.length) return [{ classe: s.classe, defs }];
  }
  return [];
}

// { palavra, pagina, nota?, base?, secoes: [{classe, defs}] } ou null se não achar
export async function significado(palavra, family = false) {
  const w = palavra.toLowerCase();
  let secoes = await ler(w), nota = null, base = null;
  const tentarBase = async (b, n) => {
    let s = await ler(b);
    if (!principais(s).length) { // forma de forma (ex.: "votada" → "votado" → "votar")
      const f = s.find(x => x.base && x.base !== b);
      if (!f) return false;
      s = await ler(f.base); b = f.base;
      if (n.startsWith('forma de')) n = `forma de ${b}`;
    }
    if (!principais(s).length) return false;
    secoes = s; base = b; nota = n.length > 34 ? `forma de ${b}` : n; return true;
  };
  if (!principais(secoes).length) {
    const forma = secoes.find(x => x.base);
    let ok = false;
    if (forma) ok = await tentarBase(forma.base, forma.defs[0]);
    if (!ok) for (const c of candidatos(w)) if (await tentarBase(c, `forma de ${c}`)) break;
  }
  const r = resumo(principais(secoes), family, ehPalavrao(semAcento(w)));
  if (!r.length) return null;
  return { palavra: w, base, nota, pagina: paginaWiki(base || w), secoes: r };
}
