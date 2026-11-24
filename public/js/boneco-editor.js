// Tela única de "Personalizar boneco", usada pelo portal e pelos jogos (menos a Cripta de Cristal).
// O boneco é um só: fica no perfil do Firebase (cacapalavras/profiles/{uid}/look), então mudar aqui
// muda em todos os jogos. Quem chama passa o perfil e uma função pra salvar.
//
//   import { abrirEditorBoneco } from '/forma-palavras/js/boneco-editor.js';
//   const novo = await abrirEditorBoneco({ perfil: { tag, look, xp, ach }, salvar: async ({ look, tag }) => {...}, pedirNome: true });
//   // novo = { look, tag } se salvou, ou null se cancelou
import { avatarSVG, CATALOGO, PARTES, partesDe, normalizar, rotuloCor, liberado, nivelDe, faixaNivel, lookPadrao, CONQUISTAS } from './avatar.js';
import { darVida } from './boneco-vivo.js';

const CSS = `
.be-fundo { position: fixed; inset: 0; z-index: 9999; background: rgba(12,6,34,.78); display: flex; align-items: flex-end; justify-content: center;
  font-family: Nunito, "Trebuchet MS", system-ui, sans-serif; -webkit-tap-highlight-color: transparent; animation: beEntra .18s ease-out; }
@keyframes beEntra { from { opacity: 0; } }
.be-caixa { width: min(480px, 100%); max-height: 94vh; display: flex; flex-direction: column; background: #2a2163; color: #fff;
  border: 3px solid #ffd23f; border-bottom: 0; border-radius: 24px 24px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,.45);
  padding: 16px 14px max(14px, env(safe-area-inset-bottom)); box-sizing: border-box; animation: beSobe .22s ease-out; }
@keyframes beSobe { from { transform: translateY(40px); } }
.be-topo { display: flex; align-items: center; gap: 12px; }
.be-previa { width: 112px; height: 112px; flex: none; border-radius: 50%; border: 3px solid #ffd23f; overflow: hidden; background: #e9e2ff; box-shadow: 0 5px 0 rgba(0,0,0,.3); }
.be-previa svg { width: 100%; height: 100%; display: block; }
.be-info { flex: 1; min-width: 0; }
.be-info h2 { margin: 0; font-size: 22px; color: #ffd23f; font-weight: 900; }
.be-info small { display: block; color: #9fe6ff; font-weight: 800; font-size: 13px; margin-top: 2px; }
.be-xp { height: 7px; background: rgba(255,255,255,.15); border-radius: 4px; overflow: hidden; margin-top: 6px; }
.be-xp i { display: block; height: 100%; background: linear-gradient(90deg, #ffd23f, #ff9f1c); }
.be-nome { margin-top: 8px; width: 100%; box-sizing: border-box; font: inherit; font-weight: 800; font-size: 16px; padding: 9px 12px; border-radius: 12px;
  border: 2px solid #5a4aa8; background: #1b1440; color: #fff; }
.be-abas { display: flex; gap: 6px; overflow-x: auto; padding: 14px 2px 8px; scrollbar-width: none; }
.be-abas::-webkit-scrollbar { display: none; }
.be-aba { flex: none; font: inherit; font-weight: 800; font-size: 14px; color: #fff; background: #3a2f80; border: 2px solid transparent; border-radius: 999px; padding: 8px 14px; cursor: pointer; }
.be-aba.on { background: #ffd23f; color: #3a1d00; }
.be-itens { flex: 1; overflow-y: auto; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; padding: 4px 2px 10px; min-height: 160px; }
.be-item { position: relative; font: inherit; color: #fff; background: #1b1440; border: 2px solid #3a2f80; border-radius: 16px; padding: 6px 4px 6px; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 3px; }
.be-item svg { width: 100%; max-width: 64px; height: auto; aspect-ratio: 1; border-radius: 50%; }
.be-item span { font-size: 11px; font-weight: 800; line-height: 1.1; text-align: center; opacity: .9; }
.be-item.on { border-color: #ffd23f; background: #3a2f80; box-shadow: 0 0 0 3px rgba(255,210,63,.25); }
.be-item.preso { opacity: .5; }
.be-item .be-req { font-size: 10px; color: #ffd23f; }
.be-cad { position: absolute; top: 4px; right: 6px; font-size: 13px; }
.be-botoes { display: flex; gap: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,.12); }
.be-botoes button { flex: 1; font: inherit; font-weight: 900; font-size: 17px; border: 0; border-radius: 14px; padding: 13px; cursor: pointer; min-height: 48px; }
.be-salvar { background: linear-gradient(#ffd23f, #ff9f1c); color: #3a1d00; box-shadow: 0 4px 0 #b35c00; }
.be-cancelar { background: #3a2f80; color: #fff; box-shadow: 0 4px 0 rgba(0,0,0,.3); flex: .6 !important; }
.be-botoes button:active { transform: translateY(3px); box-shadow: none; }
.be-aviso { min-height: 18px; color: #ff9fb0; font-weight: 800; font-size: 13px; text-align: center; padding-top: 6px; }
.be-dado { font: inherit; font-weight: 800; font-size: 13px; color: #9fe6ff; background: none; border: 0; text-decoration: underline; cursor: pointer; padding: 4px 0 0; }
`;
let cssPosto = false;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const TAG_OK = /^[\p{L}\p{N}_]{3,14}$/u;

export function abrirEditorBoneco({ perfil = {}, salvar, pedirNome = false } = {}) {
  if (!cssPosto) { cssPosto = true; const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); }
  return new Promise(resolve => {
    const nv = nivelDe(perfil.xp || 0), faixa = faixaNivel(perfil.xp || 0), ach = perfil.ach || {};
    let rascunho = { ...lookPadrao(), ...normalizar(perfil.look || {}) };
    let aba = 'tipo';
    const fundo = document.createElement('div');
    fundo.className = 'be-fundo';
    fundo.innerHTML = `<div class="be-caixa" role="dialog" aria-modal="true" aria-label="Personalizar boneco">
      <div class="be-topo">
        <div class="be-previa"></div>
        <div class="be-info">
          <h2>${perfil.tag ? esc(perfil.tag) : 'Seu boneco'}</h2>
          <small>Nível ${nv} · vale em todos os jogos</small>
          <div class="be-xp"><i style="width:${Math.round(faixa.frac * 100)}%"></i></div>
          ${pedirNome ? `<input class="be-nome" maxlength="14" placeholder="Seu nome (3 a 14 letras)" value="${esc(perfil.tag || '')}" autocomplete="off">` : ''}
          <button class="be-dado" type="button">Sortear um visual</button>
        </div>
      </div>
      <div class="be-abas" role="tablist"></div>
      <div class="be-itens"></div>
      <div class="be-aviso"></div>
      <div class="be-botoes"><button class="be-cancelar" type="button">Voltar</button><button class="be-salvar" type="button">Salvar</button></div>
    </div>`;
    document.body.appendChild(fundo);
    const $ = s => fundo.querySelector(s);
    const vivo = darVida($('.be-previa'));

    function desenhar() {
      $('.be-previa').innerHTML = avatarSVG(rascunho, 112);
      const visiveis = partesDe(rascunho).filter(k => k !== 'comemora' && k !== 'frase');
      const bicho = rascunho.tipo !== 'pessoa';
      const partes = PARTES.filter(([k]) => visiveis.includes(k)).map(([k, n]) => [k, bicho && k === 'corRoupa' ? rotuloCor(rascunho.tipo) : n]);
      if (!partes.some(([k]) => k === aba)) aba = 'tipo';
      $('.be-abas').innerHTML = partes.map(([k, n]) => `<button class="be-aba ${k === aba ? 'on' : ''}" data-k="${k}" role="tab" aria-selected="${k === aba}">${esc(n)}</button>`).join('');
      $('.be-itens').innerHTML = CATALOGO[aba].map(it => {
        const ok = liberado(it, nv, ach);
        return `<button class="be-item ${rascunho[aba] === it.id ? 'on' : ''} ${ok ? '' : 'preso'}" data-id="${it.id}" type="button">
          ${ok ? '' : '<span class="be-cad" aria-hidden="true">🔒</span>'}
          ${avatarSVG({ ...rascunho, [aba]: it.id }, 64)}<span>${esc(it.nome)}</span>
          ${ok ? '' : `<span class="be-req">${it.ach ? 'Troféu' : 'Nível ' + it.lvl}</span>`}</button>`;
      }).join('');
    }
    function fechar(res) { vivo.parar(); fundo.remove(); resolve(res); }
    $('.be-abas').onclick = e => {
      const b = e.target.closest('.be-aba'); if (!b) return;
      aba = b.dataset.k; desenhar();
      $('.be-abas .on')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    };
    $('.be-itens').onclick = e => {
      const b = e.target.closest('.be-item'); if (!b) return;
      const it = CATALOGO[aba].find(x => x.id === b.dataset.id);
      if (!liberado(it, nv, ach)) {
        $('.be-aviso').textContent = it.ach ? `🔒 Ganhe o troféu: ${CONQUISTAS[it.ach] || 'especial'}` : `🔒 Libera no nível ${it.lvl}`;
        return;
      }
      $('.be-aviso').textContent = '';
      rascunho[aba] = it.id; desenhar(); vivo.falar(500);
    };
    $('.be-dado').onclick = () => {
      // sorteia só entre o que já está liberado
      const novo = { ...rascunho };
      for (const k of partesDe(novo)) {
        if (k === 'comemora' || k === 'frase' || k === 'tipo' || !CATALOGO[k]) continue;
        const opcoes = CATALOGO[k].filter(it => liberado(it, nv, ach));
        if (opcoes.length) novo[k] = opcoes[Math.floor(Math.random() * opcoes.length)].id;
      }
      rascunho = novo; desenhar(); vivo.falar(700);
    };
    $('.be-cancelar').onclick = () => fechar(null);
    fundo.addEventListener('click', e => { if (e.target === fundo) fechar(null); });
    $('.be-salvar').onclick = async () => {
      const tag = pedirNome ? $('.be-nome').value.trim() : perfil.tag;
      if (pedirNome && !TAG_OK.test(tag || '')) { $('.be-aviso').textContent = 'O nome precisa de 3 a 14 letras ou números, sem espaço.'; $('.be-nome').focus(); return; }
      const b = $('.be-salvar'); b.disabled = true; b.textContent = 'Salvando…';
      try {
        const erro = salvar ? await salvar({ look: rascunho, tag }) : null;
        if (erro) { $('.be-aviso').textContent = erro; b.disabled = false; b.textContent = 'Salvar'; return; }
        fechar({ look: rascunho, tag });
      } catch (e) {
        $('.be-aviso').textContent = 'Não deu pra salvar agora. Tenta de novo?'; b.disabled = false; b.textContent = 'Salvar';
      }
    };
    desenhar();
  });
}
