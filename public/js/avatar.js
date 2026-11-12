// Bonequinho/bonequinha em SVG + catálogo de cosméticos e o que desbloqueia cada um.
// lvl: nível necessário. ach: conquista necessária (vitoria, longa, exclusivas, maratona).

export const CATALOGO = {
  tipo: [
    { id: 'pessoa', nome: 'Pessoa' }, { id: 'caramelo', nome: 'Carmelinha' }, { id: 'morcego', nome: 'Drácula' },
    { id: 'passaro', nome: 'Passarinho' },
  ],
  // cores do passarinho (funciona como o tom de pele)
  plumagem: [
    { id: 'sanhaco', nome: 'Sanhaço' }, { id: 'maritaca', nome: 'Maritaca' }, { id: 'sabia', nome: 'Sabiá' },
  ],
  pele: [
    { id: 'p1', nome: 'Tom 1', cor: '#ffe0c7' }, { id: 'p2', nome: 'Tom 2', cor: '#f6c7a1' },
    { id: 'p3', nome: 'Tom 3', cor: '#e0a47a' }, { id: 'p4', nome: 'Tom 4', cor: '#c07f55' },
    { id: 'p5', nome: 'Tom 5', cor: '#8d5a3b' }, { id: 'p6', nome: 'Tom 6', cor: '#5e3a27' },
    { id: 'verde', nome: 'Alien', cor: '#9be37a', lvl: 12 }, { id: 'azul', nome: 'Avatar', cor: '#7cc8ff', lvl: 16 },
  ],
  cabelo: [
    { id: 'curto', nome: 'Curtinho' }, { id: 'longo', nome: 'Comprido' }, { id: 'cacheado', nome: 'Cacheado' },
    { id: 'rabo', nome: 'Rabo de cavalo' }, { id: 'careca', nome: 'Careca' },
    { id: 'espetado', nome: 'Espetado', lvl: 2 }, { id: 'chiquinha', nome: 'Maria-chiquinha', lvl: 3 },
    { id: 'coque', nome: 'Coque', lvl: 4 }, { id: 'blackpower', nome: 'Black power', lvl: 5 },
    { id: 'moicano', nome: 'Moicano', lvl: 8 },
    { id: 'chanel', nome: 'Chanel' }, { id: 'franja', nome: 'Franjinha' }, { id: 'raspado', nome: 'Raspadinho' },
    { id: 'topete', nome: 'Topete', lvl: 2 }, { id: 'lado', nome: 'Franja de lado', lvl: 3 },
    { id: 'trancas', nome: 'Tranças', lvl: 5 }, { id: 'dreads', nome: 'Dreads', lvl: 6 },
  ],
  barba: [
    { id: 'nada', nome: 'Sem barba' }, { id: 'bigodinho', nome: 'Bigodinho' }, { id: 'curta', nome: 'Barba por fazer' },
    { id: 'cavanhaque', nome: 'Cavanhaque' }, { id: 'costeletas', nome: 'Costeletas', lvl: 2 },
    { id: 'cheia', nome: 'Barba cheia', lvl: 3 }, { id: 'lenhador', nome: 'Barba de lenhador', lvl: 7 },
  ],
  corCabelo: [
    { id: 'preto', nome: 'Preto', cor: '#2a1f1a' }, { id: 'castanho', nome: 'Castanho', cor: '#6b3f22' },
    { id: 'loiro', nome: 'Loiro', cor: '#f2c94c' }, { id: 'ruivo', nome: 'Ruivo', cor: '#d9622b' },
    { id: 'grisalho', nome: 'Grisalho', cor: '#c9c9d4', lvl: 3 }, { id: 'rosa', nome: 'Rosa', cor: '#ff7eb6', lvl: 4 },
    { id: 'azulc', nome: 'Azul', cor: '#36b6ff', lvl: 6 }, { id: 'verdec', nome: 'Verde', cor: '#2fd47a', lvl: 7 },
    { id: 'roxo', nome: 'Roxo', cor: '#8f6bff', lvl: 9 }, { id: 'arcoiris', nome: 'Arco-íris', cor: 'url(#arco)', lvl: 15 },
  ],
  olhos: [
    { id: 'normal', nome: 'Normal' }, { id: 'feliz', nome: 'Felizinho' }, { id: 'piscando', nome: 'Piscadinha', lvl: 2 },
    { id: 'sono', nome: 'Sonolento', lvl: 3 }, { id: 'brilho', nome: 'Brilhando', lvl: 5 },
    { id: 'estrela', nome: 'Estrelas', lvl: 10 }, { id: 'coracao', nome: 'Corações', lvl: 13 },
  ],
  boca: [
    { id: 'sorriso', nome: 'Sorriso' }, { id: 'risada', nome: 'Risadão' }, { id: 'o', nome: 'Ohhh', lvl: 2 },
    { id: 'lingua', nome: 'Linguinha', lvl: 4 }, { id: 'dentuco', nome: 'Dentucinho', lvl: 6 }, { id: 'gato', nome: 'Gatinho', lvl: 11 },
  ],
  roupa: [
    { id: 'camiseta', nome: 'Camiseta' }, { id: 'listrada', nome: 'Listrada', lvl: 2 }, { id: 'moletom', nome: 'Moletom', lvl: 3 },
    { id: 'vestido', nome: 'Vestido', lvl: 4 }, { id: 'macacao', nome: 'Macacão', lvl: 6 }, { id: 'smoking', nome: 'Smoking', lvl: 9 },
    { id: 'heroi', nome: 'Super-herói', lvl: 14 }, { id: 'astronauta', nome: 'Astronauta', lvl: 18 },
  ],
  corRoupa: [
    { id: 'rosa', nome: 'Rosa', cor: '#ff5fa2' }, { id: 'azul', nome: 'Azul', cor: '#36b6ff' }, { id: 'verde', nome: 'Verde', cor: '#2fd47a' },
    { id: 'amarelo', nome: 'Amarelo', cor: '#ffd23f' }, { id: 'roxo', nome: 'Roxo', cor: '#8f6bff' }, { id: 'laranja', nome: 'Laranja', cor: '#ff9f43' },
    { id: 'preto', nome: 'Preto', cor: '#33334d', lvl: 5 }, { id: 'ouro', nome: 'Dourado', cor: '#e8b923', lvl: 12 },
  ],
  chapeu: [
    { id: 'nada', nome: 'Nada' }, { id: 'bone', nome: 'Boné', lvl: 2 }, { id: 'laco', nome: 'Laço', lvl: 3 },
    { id: 'gorro', nome: 'Gorro', lvl: 4 }, { id: 'festa', nome: 'Chapéu de festa', lvl: 5 }, { id: 'gatinho', nome: 'Orelhas de gato', lvl: 7 },
    { id: 'bruxa', nome: 'Chapéu de bruxa', lvl: 10 }, { id: 'cartola', nome: 'Cartola', lvl: 13 },
    { id: 'coroa', nome: 'Coroa', ach: 'vitoria' }, { id: 'aureola', nome: 'Auréola', ach: 'maratona' },
  ],
  acessorio: [
    { id: 'nada', nome: 'Nada' }, { id: 'sardas', nome: 'Sardas' }, { id: 'oculos', nome: 'Óculos', lvl: 2 },
    { id: 'bigode', nome: 'Bigodão', lvl: 4 }, { id: 'escuros', nome: 'Óculos escuros', lvl: 6 }, { id: 'fone', nome: 'Fone de ouvido', lvl: 8 },
    { id: 'curativo', nome: 'Curativo', lvl: 3 }, { id: 'estrelas', nome: 'Óculos estrela', ach: 'longa' },
    { id: 'monoculo', nome: 'Monóculo', ach: 'exclusivas' },
  ],
  fundo: [
    { id: 'lilas', nome: 'Lilás', cor: '#e9e2ff' }, { id: 'menta', nome: 'Menta', cor: '#d6f7e3' }, { id: 'pessego', nome: 'Pêssego', cor: '#ffe3cf' },
    { id: 'ceu', nome: 'Céu', cor: '#d5efff', lvl: 2 }, { id: 'chiclete', nome: 'Chiclete', cor: '#ffd3e8', lvl: 3 },
    { id: 'sol', nome: 'Sol', cor: '#fff1a8', lvl: 5 }, { id: 'noite', nome: 'Noite', cor: '#2b2a5c', lvl: 11 },
  ],
};

export const PARTES = [
  ['tipo', 'Personagem'], ['plumagem', 'Cor das penas'], ['pele', 'Pele'], ['cabelo', 'Cabelo'], ['corCabelo', 'Cor do cabelo'], ['barba', 'Barba'], ['olhos', 'Olhos'], ['boca', 'Boca'],
  ['roupa', 'Roupa'], ['corRoupa', 'Cor da roupa'], ['chapeu', 'Chapéu'], ['acessorio', 'Acessório'], ['fundo', 'Fundo'],
];

// Partes que valem para os bichinhos (o resto é só para pessoa)
export const PARTES_BICHO = ['tipo', 'olhos', 'corRoupa', 'chapeu', 'acessorio', 'fundo'];
// partes que aparecem em cada personagem
export function partesDe(look) {
  const t = normalizar(look).tipo || 'pessoa';
  if (t === 'pessoa') return PARTES.filter(([k]) => k !== 'plumagem').map(([k]) => k);
  return t === 'passaro' ? ['tipo', 'plumagem', ...PARTES_BICHO.slice(1)] : PARTES_BICHO;
}
// looks antigos guardavam cada pássaro como um personagem separado
export function normalizar(look = {}) {
  if (['sanhaco', 'maritaca', 'sabia'].includes(look.tipo)) return { ...look, tipo: 'passaro', plumagem: look.tipo };
  return look;
}
export const ehBicho = look => !!look && !!look.tipo && normalizar(look).tipo !== 'pessoa';

export const CONQUISTAS = {
  vitoria: 'Vencer uma partida com 2+ jogadores',
  longa: 'Achar uma palavra de 8 letras ou mais',
  exclusivas: 'Achar 10 palavras exclusivas numa partida',
  maratona: 'Jogar 30 partidas',
};

export function lookPadrao() {
  const r = a => a.filter(x => !x.lvl && !x.ach)[Math.floor(Math.random() * a.filter(x => !x.lvl && !x.ach).length)].id;
  return {
    tipo: 'pessoa', barba: 'nada', plumagem: 'sanhaco',
    pele: r(CATALOGO.pele), cabelo: r(CATALOGO.cabelo), corCabelo: r(CATALOGO.corCabelo), olhos: 'normal', boca: 'sorriso',
    roupa: 'camiseta', corRoupa: r(CATALOGO.corRoupa), chapeu: 'nada', acessorio: 'nada', fundo: r(CATALOGO.fundo),
  };
}

export function liberado(item, nivel, ach = {}) {
  if (item.ach) return !!ach[item.ach];
  return nivel >= (item.lvl || 1);
}

const pega = (parte, id) => CATALOGO[parte].find(x => x.id === id) || CATALOGO[parte][0];

let uid = 0;
// Desenha o boneco. Retorna uma string <svg>.
export function avatarSVG(look = {}, tam = 64, opts = {}) {
  const L = { ...BASE, ...normalizar(look) };
  const k = 'a' + (++uid);
  const pele = pega('pele', L.pele).cor;
  const cab = pega('corCabelo', L.corCabelo).cor.replace('#arco', '#' + k + 'arco');
  const roupa = pega('corRoupa', L.corRoupa).cor;
  const fundo = pega('fundo', L.fundo).cor;
  const esc = '#2b1d5c';
  const s = [];
  s.push(`<defs><linearGradient id="${k}arco" x1="0" x2="1"><stop offset="0" stop-color="#ff5fa2"/><stop offset=".33" stop-color="#ffd23f"/><stop offset=".66" stop-color="#2fd47a"/><stop offset="1" stop-color="#36b6ff"/></linearGradient>
    <clipPath id="${k}c"><circle cx="50" cy="50" r="50"/></clipPath></defs>`);
  if (!opts.semFundo) s.push(`<circle cx="50" cy="50" r="50" fill="${fundo}"/>`);
  s.push(`<g clip-path="url(#${k}c)">`);

  const bicho = ehBicho(L);
  if (bicho) s.push(desenharBicho(L.tipo === 'passaro' ? L.plumagem : L.tipo, roupa));
  else {
  // cabelo de trás
  const atras = {
    chanel: `<path d="M25 44 Q23 66 31 70 L69 70 Q77 66 75 44 Z" fill="${cab}"/>`,
    franja: `<path d="M24 44 Q22 80 30 92 L70 92 Q78 80 76 44 Z" fill="${cab}"/>`,
    lado: `<path d="M25 44 Q24 64 30 68 L70 68 Q76 64 75 44 Z" fill="${cab}"/>`,
    trancas: `<g fill="${cab}">${[52, 60, 68, 76, 84].map(y => `<circle cx="23" cy="${y}" r="5"/><circle cx="77" cy="${y}" r="5"/>`).join('')}</g>`,
    dreads: `<g stroke="${cab}" stroke-width="6" stroke-linecap="round">${[[24, 78], [30, 84], [70, 84], [76, 78], [36, 88], [64, 88]].map(([x, y]) => `<path d="M${x} 40 L${x} ${y}"/>`).join('')}</g>`,
    longo: `<path d="M24 44 Q22 80 30 92 L70 92 Q78 80 76 44 Z" fill="${cab}"/>`,
    rabo: `<path d="M70 40 Q92 52 80 80 Q76 66 70 58 Z" fill="${cab}"/>`,
    chiquinha: `<circle cx="20" cy="50" r="9" fill="${cab}"/><circle cx="80" cy="50" r="9" fill="${cab}"/><path d="M16 56 Q12 72 18 80 Q22 70 22 58Z M84 56 Q88 72 82 80 Q78 70 78 58Z" fill="${cab}"/>`,
    blackpower: `<circle cx="50" cy="38" r="31" fill="${cab}"/>`,
    cacheado: `<g fill="${cab}"><circle cx="27" cy="46" r="8"/><circle cx="73" cy="46" r="8"/><circle cx="26" cy="58" r="7"/><circle cx="74" cy="58" r="7"/></g>`,
  }[L.cabelo] || '';
  s.push(atras);

  // corpo / roupa
  const corpo = `M18 100 Q20 76 50 74 Q80 76 82 100 Z`;
  if (L.roupa === 'heroi') s.push(`<path d="M22 100 Q14 80 32 76 L68 76 Q86 80 78 100Z" fill="#e8455b"/>`);
  s.push(`<path d="${corpo}" fill="${L.roupa === 'astronauta' ? '#eef1f7' : roupa}"/>`);
  if (L.roupa === 'listrada') s.push(`<g stroke="#fff" stroke-width="3" opacity=".7"><path d="M20 86 H80"/><path d="M19 94 H81"/></g>`);
  if (L.roupa === 'moletom') s.push(`<path d="M38 76 Q50 88 62 76" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3"/><path d="M45 82 v8 M55 82 v8" stroke="#fff" stroke-width="2"/>`);
  if (L.roupa === 'vestido') s.push(`<path d="M36 76 Q50 84 64 76" fill="#fff" opacity=".8"/><circle cx="50" cy="88" r="2.5" fill="#fff"/><circle cx="50" cy="95" r="2.5" fill="#fff"/>`);
  if (L.roupa === 'macacao') s.push(`<rect x="34" y="86" width="32" height="16" rx="3" fill="#3f6fd8"/><path d="M36 76 L38 88 M64 76 L62 88" stroke="#3f6fd8" stroke-width="4"/><circle cx="38" cy="88" r="2" fill="#ffd23f"/><circle cx="62" cy="88" r="2" fill="#ffd23f"/>`);
  if (L.roupa === 'smoking') s.push(`<path d="M42 75 L50 100 L58 75 Q50 78 42 75Z" fill="#fff"/><path d="M44 80 L50 83 L44 86Z M56 80 L50 83 L56 86Z" fill="#e8455b"/>`);
  if (L.roupa === 'heroi') s.push(`<path d="M50 84 l3 6 h6 l-5 4 2 6 -6 -4 -6 4 2 -6 -5 -4 h6z" fill="#ffd23f"/>`);
  if (L.roupa === 'astronauta') s.push(`<rect x="40" y="84" width="20" height="10" rx="2" fill="${roupa}"/><circle cx="45" cy="89" r="2" fill="#fff"/><circle cx="55" cy="89" r="2" fill="#e8455b"/>`);

  // pescoço e cabeça
  s.push(`<rect x="44" y="64" width="12" height="12" rx="4" fill="${pele}"/>`);
  s.push(`<ellipse cx="27" cy="50" rx="5" ry="6" fill="${pele}"/><ellipse cx="73" cy="50" rx="5" ry="6" fill="${pele}"/>`);
  s.push(`<ellipse cx="50" cy="46" rx="23" ry="24" fill="${pele}"/>`);
  }

  // olhos
  const olhos = {
    normal: `<circle cx="41" cy="48" r="3.2" fill="${esc}"/><circle cx="59" cy="48" r="3.2" fill="${esc}"/><circle cx="42" cy="47" r="1" fill="#fff"/><circle cx="60" cy="47" r="1" fill="#fff"/>`,
    feliz: `<path d="M37 49 Q41 44 45 49 M55 49 Q59 44 63 49" fill="none" stroke="${esc}" stroke-width="2.6" stroke-linecap="round"/>`,
    piscando: `<circle cx="41" cy="48" r="3.2" fill="${esc}"/><path d="M55 48 Q59 51 63 48" fill="none" stroke="${esc}" stroke-width="2.6" stroke-linecap="round"/>`,
    sono: `<path d="M37 49 H45 M55 49 H63" stroke="${esc}" stroke-width="2.6" stroke-linecap="round"/>`,
    brilho: `<circle cx="41" cy="48" r="4.6" fill="${esc}"/><circle cx="59" cy="48" r="4.6" fill="${esc}"/><circle cx="42.6" cy="46.4" r="1.8" fill="#fff"/><circle cx="60.6" cy="46.4" r="1.8" fill="#fff"/><circle cx="39.6" cy="49.6" r=".9" fill="#fff"/><circle cx="57.6" cy="49.6" r=".9" fill="#fff"/>`,
    estrela: [41, 59].map(x => `<path transform="translate(${x} 48) scale(.55)" d="M0 -9 L2.6 -3 9 -2.8 4 1.6 5.6 8 0 4.4 -5.6 8 -4 1.6 -9 -2.8 -2.6 -3Z" fill="#ffc400" stroke="${esc}" stroke-width="1.4"/>`).join(''),
    coracao: [41, 59].map(x => `<path transform="translate(${x} 48) scale(.5)" d="M0 7 C-12 -1 -7 -10 0 -4 C7 -10 12 -1 0 7Z" fill="#ff3d7f"/>`).join(''),
  }[L.olhos] || '';
  s.push(olhos);
  if (L.acessorio !== 'escuros') s.push(`<ellipse cx="35" cy="56" rx="4" ry="2.4" fill="#ff7e9e" opacity=".45"/><ellipse cx="65" cy="56" rx="4" ry="2.4" fill="#ff7e9e" opacity=".45"/>`);

  // barba (fica atrás da boca)
  if (!bicho) s.push({
    bigodinho: `<path d="M42 56.6 Q46 53.8 50 55.4 Q54 53.8 58 56.6" fill="none" stroke="${cab}" stroke-width="2" stroke-linecap="round"/>`,
    curta: `<path d="M29 50 Q29 74 50 76 Q71 74 71 50 Q66 62 58 60 Q50 57 42 60 Q34 62 29 50Z" fill="${cab}" opacity=".35"/>`,
    cavanhaque: `<path d="M44 62 Q50 60 56 62 Q57 72 50 75 Q43 72 44 62Z" fill="${cab}"/><path d="M42 56.6 Q46 53.8 50 55.4 Q54 53.8 58 56.6" fill="none" stroke="${cab}" stroke-width="2.4" stroke-linecap="round"/>`,
    costeletas: `<path d="M26.5 42 L31.5 42 L31.5 60 Q28 60 26.5 55Z M73.5 42 L68.5 42 L68.5 60 Q72 60 73.5 55Z" fill="${cab}"/>`,
    cheia: `<path d="M28 46 Q28 76 50 78 Q72 76 72 46 Q67 62 58 59 Q50 56 42 59 Q33 62 28 46Z" fill="${cab}"/>`,
    lenhador: `<path d="M26 44 Q24 86 50 90 Q76 86 74 44 Q68 62 58 59 Q50 56 42 59 Q32 62 26 44Z" fill="${cab}"/>`,
  }[L.barba] || '');
  // boca (ou focinho/bico)
  if (bicho) s.push(focinho(L.tipo === 'passaro' ? L.plumagem : L.tipo));
  else s.push({
    sorriso: `<path d="M43 58 Q50 64 57 58" fill="none" stroke="${esc}" stroke-width="2.4" stroke-linecap="round"/>`,
    risada: `<path d="M42 57 Q50 68 58 57 Z" fill="${esc}"/><path d="M45 61 Q50 64 55 61" fill="#ff7e9e"/>`,
    o: `<ellipse cx="50" cy="60" rx="3" ry="3.6" fill="${esc}"/>`,
    lingua: `<path d="M43 58 Q50 63 57 58" fill="none" stroke="${esc}" stroke-width="2.4" stroke-linecap="round"/><path d="M48 60.5 Q50 67 53 60.5Z" fill="#ff5f7e"/>`,
    dentuco: `<path d="M43 57 Q50 64 57 57" fill="${esc}"/><rect x="47.3" y="57.5" width="5.4" height="4.4" rx="1" fill="#fff"/>`,
    gato: `<path d="M43 58 Q46.5 61 50 58 Q53.5 61 57 58" fill="none" stroke="${esc}" stroke-width="2.4" stroke-linecap="round"/>`,
  }[L.boca] || '');

  // cabelo da frente
  const frente = {
    chanel: `<path d="M26 46 Q26 20 50 20 Q74 20 74 46 Q72 37 66 35 L34 35 Q28 37 26 46Z" fill="${cab}"/>`,
    franja: `<path d="M26 44 Q26 19 50 19 Q74 19 74 44 L70 38 Q60 39.5 50 38.5 Q40 39.5 30 38Z" fill="${cab}"/>`,
    raspado: `<path d="M27 42 Q28 21 50 21 Q72 21 73 42 Q62 33 50 33 Q38 33 27 42Z" fill="${cab}" opacity=".55"/>`,
    topete: `<path d="M28 40 Q26 22 44 18 Q62 9 72 25 Q74 32 73 40 Q66 30 52 31 Q38 30 28 40Z" fill="${cab}"/>`,
    lado: `<path d="M26 46 Q24 20 50 20 Q76 20 74 40 Q60 31 45 34 Q34 40 30 52Z" fill="${cab}"/>`,
    trancas: `<path d="M27 44 Q28 20 50 21 Q72 20 73 44 Q66 30 50 32 Q34 30 27 44Z" fill="${cab}"/><path d="M50 21 L50 32" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>`,
    dreads: `<path d="M27 44 Q28 20 50 21 Q72 20 73 44 Q62 31 50 33 Q38 31 27 44Z" fill="${cab}"/><g stroke="${cab}" stroke-width="5" stroke-linecap="round"><path d="M36 24 L33 38"/><path d="M50 21 L50 34"/><path d="M64 24 L67 38"/></g>`,
    curto: `<path d="M27 44 Q28 20 50 21 Q72 20 73 44 Q66 32 50 33 Q36 32 27 44Z" fill="${cab}"/>`,
    longo: `<path d="M26 48 Q26 20 50 21 Q74 20 74 48 Q70 34 58 30 Q48 38 30 38 Q28 42 26 48Z" fill="${cab}"/>`,
    cacheado: `<g fill="${cab}"><circle cx="32" cy="34" r="8"/><circle cx="42" cy="26" r="9"/><circle cx="55" cy="25" r="9"/><circle cx="66" cy="31" r="8"/><circle cx="71" cy="40" r="6"/><circle cx="29" cy="41" r="6"/></g>`,
    rabo: `<path d="M27 44 Q28 20 50 21 Q72 20 73 44 Q60 30 40 32 Q32 36 27 44Z" fill="${cab}"/>`,
    careca: `<path d="M34 28 Q42 23 48 24" stroke="#fff" stroke-width="2" opacity=".4" fill="none" stroke-linecap="round"/>`,
    espetado: `<path d="M27 42 L28 26 L35 32 L38 18 L45 28 L50 14 L55 28 L62 18 L65 32 L72 26 L73 42 Q62 32 50 33 Q38 32 27 42Z" fill="${cab}"/>`,
    chiquinha: `<path d="M27 44 Q28 20 50 21 Q72 20 73 44 Q66 30 50 32 Q34 30 27 44Z" fill="${cab}"/>`,
    coque: `<circle cx="50" cy="17" r="9" fill="${cab}"/><path d="M27 44 Q28 20 50 21 Q72 20 73 44 Q64 30 50 31 Q36 30 27 44Z" fill="${cab}"/>`,
    blackpower: `<path d="M27 42 Q30 30 50 30 Q70 30 73 42 Q60 35 50 36 Q40 35 27 42Z" fill="${cab}"/>`,
    moicano: `<path d="M44 34 Q42 12 50 6 Q58 12 56 34 Q50 30 44 34Z" fill="${cab}"/>`,
  }[L.cabelo] || '';
  if (!bicho) s.push(frente);

  // acessório
  s.push({
    sardas: `<g fill="#b8734a" opacity=".6"><circle cx="36" cy="53" r=".9"/><circle cx="39" cy="55" r=".9"/><circle cx="34" cy="55.5" r=".9"/><circle cx="64" cy="53" r=".9"/><circle cx="61" cy="55" r=".9"/><circle cx="66" cy="55.5" r=".9"/></g>`,
    oculos: `<g fill="none" stroke="${esc}" stroke-width="2"><circle cx="41" cy="48" r="7"/><circle cx="59" cy="48" r="7"/><path d="M48 48 H52 M34 47 L27 45 M66 47 L73 45"/></g>`,
    escuros: `<g fill="${esc}"><path d="M32 44 H48 Q48 54 40 54 Q32 54 32 44Z M52 44 H68 Q68 54 60 54 Q52 54 52 44Z"/><path d="M48 46 H52" stroke="${esc}" stroke-width="2"/></g><path d="M35 46 L39 46" stroke="#fff" stroke-width="1.4" opacity=".6"/>`,
    bigode: `<path d="M50 55 Q44 51 38 55 Q42 58 50 56 Q58 58 62 55 Q56 51 50 55Z" fill="${cab}"/>`,
    fone: `<path d="M24 46 Q24 16 50 16 Q76 16 76 46" fill="none" stroke="#33334d" stroke-width="4"/><rect x="19" y="42" width="9" height="14" rx="4" fill="#ff5fa2"/><rect x="72" y="42" width="9" height="14" rx="4" fill="#ff5fa2"/>`,
    curativo: `<g transform="rotate(-30 64 39)"><rect x="57" y="36" width="14" height="6" rx="3" fill="#f7c59f"/><rect x="62" y="36" width="4" height="6" fill="#e9a978"/></g>`,
    estrelas: [41, 59].map(x => `<path transform="translate(${x} 48) scale(1)" d="M0 -9 L2.6 -3 9 -2.8 4 1.6 5.6 8 0 4.4 -5.6 8 -4 1.6 -9 -2.8 -2.6 -3Z" fill="rgba(255,196,0,.55)" stroke="#ff5fa2" stroke-width="1.6"/>`).join('') + `<path d="M48 47 H52" stroke="#ff5fa2" stroke-width="2"/>`,
    monoculo: `<circle cx="59" cy="48" r="6.5" fill="rgba(255,255,255,.25)" stroke="#d4a017" stroke-width="2"/><path d="M65 50 Q68 62 64 72" fill="none" stroke="#d4a017" stroke-width="1"/>`,
  }[L.acessorio] || '');

  // chapéu
  s.push({
    bone: `<path d="M27 38 Q28 18 50 18 Q72 18 73 38 Z" fill="${roupa}"/><path d="M50 34 Q70 33 86 38 Q72 41 52 39Z" fill="${roupa}" opacity=".85"/><circle cx="50" cy="19" r="2" fill="#fff"/>`,
    laco: `<g transform="translate(64 24) rotate(20)"><path d="M0 0 L-10 -7 L-10 7Z M0 0 L10 -7 L10 7Z" fill="#ff3d7f"/><circle r="3" fill="#ff7eb6"/></g>`,
    gorro: `<path d="M26 38 Q26 12 50 12 Q74 12 74 38 Z" fill="${roupa}"/><rect x="24" y="33" width="52" height="8" rx="4" fill="#fff"/><circle cx="50" cy="10" r="5" fill="#fff"/>`,
    festa: `<path d="M38 28 L50 0 L62 28 Z" fill="#ffd23f"/><path d="M41 21 L59 21 M44 14 L56 14" stroke="#ff5fa2" stroke-width="3"/><circle cx="50" cy="1" r="3" fill="#36b6ff"/>`,
    gatinho: `<path d="M28 30 L30 12 L42 24Z M72 30 L70 12 L58 24Z" fill="${cab}"/><path d="M31 25 L32 17 L38 23Z M69 25 L68 17 L62 23Z" fill="#ff9ac8"/>`,
    bruxa: `<path d="M20 30 Q50 22 80 30 Q50 36 20 30Z" fill="#3a2a6e"/><path d="M34 29 L56 0 L66 28Z" fill="#3a2a6e"/><path d="M36 26 Q50 22 64 26 L64 29 Q50 26 36 29Z" fill="#ffd23f"/>`,
    cartola: `<rect x="22" y="26" width="56" height="5" rx="2.5" fill="#26263a"/><rect x="34" y="4" width="32" height="24" rx="2" fill="#26263a"/><rect x="34" y="21" width="32" height="5" fill="#e8455b"/>`,
    coroa: `<path d="M32 26 L34 10 L42 18 L50 6 L58 18 L66 10 L68 26 Z" fill="#ffc400" stroke="#d49a00" stroke-width="1.5"/><circle cx="50" cy="20" r="2.5" fill="#ff3d7f"/><circle cx="40" cy="22" r="1.8" fill="#36b6ff"/><circle cx="60" cy="22" r="1.8" fill="#2fd47a"/>`,
    aureola: `<ellipse cx="50" cy="12" rx="17" ry="5" fill="none" stroke="#ffd23f" stroke-width="3.5"/>`,
  }[L.chapeu] || '');
  if (!bicho && L.roupa === 'astronauta') s.push(`<circle cx="50" cy="46" r="31" fill="rgba(180,220,255,.22)" stroke="#dfe6f2" stroke-width="3"/><path d="M33 28 Q40 22 48 21" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>`);
  s.push('</g>');
  return `<svg class="boneco" viewBox="0 0 100 100" width="${tam}" height="${tam}" role="img" aria-label="avatar">${s.join('')}</svg>`;
}
const BASE = { tipo: 'pessoa', barba: 'nada', plumagem: 'sanhaco', pele: 'p2', cabelo: 'curto', corCabelo: 'castanho', olhos: 'normal', boca: 'sorriso', roupa: 'camiseta', corRoupa: 'azul', chapeu: 'nada', acessorio: 'nada', fundo: 'lilas' };

// ---------- níveis ----------
// Nível n precisa de 50·n·(n−1) de XP: 2→100, 3→300, 4→600, 5→1000...
export function nivelDe(xp) {
  let n = 1;
  while (50 * (n + 1) * n <= xp) n++;
  return n;
}
export function faixaNivel(xp) {
  const n = nivelDe(xp), ini = 50 * n * (n - 1), fim = 50 * (n + 1) * n;
  return { n, ini, fim, frac: (xp - ini) / (fim - ini) };
}

export function itensNovos(antes, depois) {
  const out = [];
  for (const [parte] of PARTES) for (const it of CATALOGO[parte]) {
    if (!liberado(it, antes.nivel, antes.ach) && liberado(it, depois.nivel, depois.ach)) out.push(it.nome);
  }
  return out;
}

// ---------- bichinhos ----------
const ESC = '#2b1d5c';
const lenco = cor => `<path d="M33 73 L67 73 L50 91 Z" fill="${cor}"/><path d="M33 73 L67 73" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`;
const AVES = {
  sanhaco: { cabeca: '#a9bfd0', corpo: '#9db4c6', asa: '#4f8fb8', barriga: '#c9d7e2' },
  maritaca: { cabeca: '#5bbd4a', corpo: '#4caf50', asa: '#2e8b3e', barriga: '#93d66e', anel: '#f3efe0' },
  sabia: { cabeca: '#8b7860', corpo: '#8b7860', asa: '#6e5c47', barriga: '#e08a3c', anel: '#f2c14e' },
};

function desenharBicho(tipo, roupa) {
  if (tipo === 'caramelo') {
    const c = '#d99a4e', claro = '#f6d7a7', esc = '#a8682c';
    return `<path d="M18 100 Q20 74 50 72 Q80 74 82 100 Z" fill="${c}"/><ellipse cx="50" cy="96" rx="14" ry="14" fill="${claro}"/>
      ${lenco(roupa)}
      <path d="M33 38 L3 33 Q8 41 33 54 Z M67 38 L97 33 Q92 41 67 54 Z" fill="${c}"/>
      <path d="M31 41 L12 37.5 Q16 42 31 49 Z M69 41 L88 37.5 Q84 42 69 49 Z" fill="${claro}" opacity=".7"/>
      <ellipse cx="50" cy="46" rx="23" ry="22" fill="${c}"/>
      <path d="M44 25 Q50 22 56 25 Q54 36 50 40 Q46 36 44 25Z" fill="${claro}" opacity=".7"/>`;
  }
  if (tipo === 'morcego') {
    const c = '#6b5b8e', esc = '#4a3d66', rosa = '#f2a7c3';
    return `<path d="M50 78 L2 66 Q10 78 7 90 Q16 84 19 96 Q26 87 31 100 L50 100Z" fill="${esc}"/>
      <path d="M50 78 L98 66 Q90 78 93 90 Q84 84 81 96 Q74 87 69 100 L50 100Z" fill="${esc}"/>
      <ellipse cx="50" cy="96" rx="20" ry="22" fill="${c}"/>${lenco(roupa)}
      <path d="M30 38 L23 7 L45 26Z M70 38 L77 7 L55 26Z" fill="${c}"/>
      <path d="M31 33 L26.5 14 L40 27Z M69 33 L73.5 14 L60 27Z" fill="${rosa}"/>
      <ellipse cx="50" cy="46" rx="22" ry="21" fill="${c}"/>
      <ellipse cx="50" cy="52" rx="15" ry="12" fill="#8a7bab"/>`;
  }
  const a = AVES[tipo] || AVES.sanhaco;
  return `<ellipse cx="22" cy="90" rx="9" ry="19" transform="rotate(14 22 90)" fill="${a.asa}"/>
    <ellipse cx="78" cy="90" rx="9" ry="19" transform="rotate(-14 78 90)" fill="${a.asa}"/>
    <ellipse cx="50" cy="98" rx="28" ry="27" fill="${a.corpo}"/>
    <ellipse cx="50" cy="100" rx="18" ry="19" fill="${a.barriga}"/>
    ${tipo === 'sabia' ? `<g stroke="#f4efe6" stroke-width="1.6" stroke-linecap="round"><path d="M45 66 L44 71"/><path d="M50 67 L50 72"/><path d="M55 66 L56 71"/></g>` : ''}
    ${lenco(roupa)}
    <circle cx="50" cy="46" r="23" fill="${a.cabeca}"/>
    ${tipo === 'maritaca' ? `<g fill="#e53935"><circle cx="31" cy="60" r="2.2"/><circle cx="69" cy="60" r="2.2"/><circle cx="34" cy="64" r="1.6"/><circle cx="66" cy="64" r="1.6"/></g>` : ''}
    ${tipo === 'sanhaco' ? `<path d="M28 40 Q50 26 72 40" fill="none" stroke="${a.asa}" stroke-width="3" opacity=".35" stroke-linecap="round"/>` : ''}
    ${a.anel ? `<circle cx="41" cy="48" r="6.4" fill="${a.anel}"/><circle cx="59" cy="48" r="6.4" fill="${a.anel}"/>` : ''}`;
}

function focinho(tipo) {
  if (tipo === 'caramelo') return `<ellipse cx="50" cy="58" rx="11.5" ry="8.5" fill="#f6d7a7"/><ellipse cx="50" cy="53.5" rx="4.4" ry="3.2" fill="${ESC}"/>
    <path d="M45.5 59 Q48 62 50 59 Q52 62 54.5 59" fill="none" stroke="${ESC}" stroke-width="1.6" stroke-linecap="round"/><path d="M48.3 61 Q50 66.5 51.7 61Z" fill="#ff6f8e"/>`;
  if (tipo === 'morcego') return `<path d="M47.5 53 Q50 55.5 52.5 53" fill="none" stroke="${ESC}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M43 58 Q50 63.5 57 58" fill="none" stroke="${ESC}" stroke-width="2" stroke-linecap="round"/><path d="M45.6 59.6 L47.2 63.4 L48.6 60.6Z M51.4 60.6 L52.8 63.4 L54.4 59.6Z" fill="#fff"/>`;
  if (tipo === 'maritaca') return `<path d="M43.5 53 Q50 49.5 56.5 53 Q56 61.5 50 65 Q48.5 59 43.5 53Z" fill="#efe2c4" stroke="#b9a77f" stroke-width="1"/>`;
  if (tipo === 'sabia') return `<path d="M45 54 L55 54 L50 63.5Z" fill="#e8b730"/><path d="M45 54 L55 54" stroke="#b8860b" stroke-width="1"/>`;
  return `<path d="M45 54 L55 54 L50 62.5Z" fill="#5d6670"/>`;
}
