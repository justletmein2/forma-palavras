// Paleta de cores escolhida pelo jogador (vale no portal e nos jogos que usam: hoje o Pé na Tábua).
// Fica guardada no aparelho ('jogos_paleta'), no mesmo endereço justletmein2.github.io.
//   import { aplicarPaleta, montarSeletor } from '/forma-palavras/js/paleta.js';
//   aplicarPaleta();                 // aplica a escolhida (ou a padrão)
//   montarSeletor(elemento);         // 3 botões pra trocar
// As cores viram variáveis CSS: --p-fundo1, --p-fundo2, --p-painel, --p-texto, --p-suave, --p-a1, --p-a2,
// --p-sombra, --p-borda, --p-cena1, --p-cena2, --p-btn1, --p-btn2, --p-btn-txt, --p-btn-sombra, --p-sec.

export const PALETAS = {
  ceu: { nome: 'Céu', fundo1: '#eaf5ff', fundo2: '#cfe6ff', painel: '#ffffff', texto: '#12233f', suave: '#56667f', a1: '#2f7bf6', a2: '#ff8a3d',
    sombra: '#bcdcff', borda: 'rgba(18,35,63,.13)', cena1: '#d7ebff', cena2: '#b9d8fb', btn1: '#ff9a52', btn2: '#ff7a2e', 'btn-txt': '#ffffff', 'btn-sombra': '#c0561a', sec: '#e3efff' },
  areia: { nome: 'Areia', fundo1: '#fff4e6', fundo2: '#ffe3c8', painel: '#ffffff', texto: '#3a2418', suave: '#7f5f4d', a1: '#e8452a', a2: '#1e8ea6',
    sombra: '#ffd0b5', borda: 'rgba(58,36,24,.13)', cena1: '#ffe4cc', cena2: '#ffd1a8', btn1: '#ff6a4d', btn2: '#ef4a2c', 'btn-txt': '#ffffff', 'btn-sombra': '#b0311b', sec: '#fff0e2' },
  doce: { nome: 'Doce', fundo1: '#fff1e4', fundo2: '#ffe0ea', painel: '#ffffff', texto: '#2b1d5c', suave: '#6f5f92', a1: '#6c5ce7', a2: '#ff5a7a',
    sombra: '#ffc2d1', borda: 'rgba(43,29,92,.13)', cena1: '#e7e0ff', cena2: '#d4c9ff', btn1: '#ff6f8e', btn2: '#ff4f74', 'btn-txt': '#ffffff', 'btn-sombra': '#c22e52', sec: '#efeaff' },
};
const CHAVE = 'jogos_paleta';
export function lerPaleta() { try { const p = localStorage.getItem(CHAVE); return PALETAS[p] ? p : 'ceu'; } catch { return 'ceu'; } }
export function aplicarPaleta(id = lerPaleta()) {
  if (!PALETAS[id]) id = 'ceu';
  const P = PALETAS[id], r = document.documentElement;
  for (const [k, v] of Object.entries(P)) if (k !== 'nome') r.style.setProperty('--p-' + k, v);
  r.dataset.paleta = id;
  const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.content = P.fundo1;
  try { localStorage.setItem(CHAVE, id); } catch {}
  dispatchEvent(new CustomEvent('paleta', { detail: id }));
  return id;
}
export function montarSeletor(el) {
  const desenhar = () => {
    const atual = lerPaleta();
    el.innerHTML = Object.entries(PALETAS).map(([id, P]) => `<button type="button" data-p="${id}" aria-pressed="${id === atual}"
      style="font:inherit;font-weight:900;font-size:14px;display:inline-flex;align-items:center;gap:6px;padding:8px 12px;min-height:44px;border-radius:12px;cursor:pointer;
      background:${P.fundo1};color:${P.texto};border:2px solid ${id === atual ? P.a1 : P.borda};box-shadow:${id === atual ? `0 0 0 3px ${P.a1}40` : 'none'}">
      <span style="width:14px;height:14px;border-radius:50%;background:${P.a1}"></span><span style="width:14px;height:14px;border-radius:50%;background:${P.a2}"></span>${P.nome}</button>`).join('');
  };
  el.style.display = 'flex'; el.style.gap = '8px'; el.style.flexWrap = 'wrap'; el.style.justifyContent = 'center';
  el.onclick = e => { const b = e.target.closest('button[data-p]'); if (!b) return; aplicarPaleta(b.dataset.p); desenhar(); };
  desenhar();
}
