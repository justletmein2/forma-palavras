// Deixa o boneco "vivo" em qualquer jogo: pisca sozinho e mexe a boca enquanto fala.
// Uso: const vivo = darVida(elementoQueTemOSvgDoBoneco); vivo.falar(1600); vivo.parar();
// Funciona com o desenho de avatar.js (grupos .av-olhos e .av-boca).

const CSS = `
.av-olhos, .av-boca { transform-box: fill-box; transform-origin: 50% 50%; }
.av-olhos { transition: transform .06s ease-in; }
.av-pisca .av-olhos { transform: scaleY(.08); }
.av-pisca svg.av-robo { filter: brightness(1.35); }
.av-falando .av-boca { animation: avFala .16s ease-in-out infinite alternate; }
@keyframes avFala { from { transform: scaleY(.55) scaleX(.95); } to { transform: scaleY(1.75) scaleX(1.05); } }
@media (prefers-reduced-motion: reduce) { .av-falando .av-boca { animation: none; } }
`;
let cssPosto = false;
function porCSS() {
  if (cssPosto) return; cssPosto = true;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
}

export function darVida(el) {
  porCSS();
  let vivo = true, tFala = 0, tPisca = 0;
  const piscar = () => {
    if (!vivo) return;
    el.classList.add('av-pisca');
    setTimeout(() => el.classList.remove('av-pisca'), 130);
    // às vezes pisca duas vezes seguidas
    if (Math.random() < 0.2) setTimeout(() => { el.classList.add('av-pisca'); setTimeout(() => el.classList.remove('av-pisca'), 120); }, 260);
    tPisca = setTimeout(piscar, 2200 + Math.random() * 3800);
  };
  tPisca = setTimeout(piscar, 800 + Math.random() * 2000);
  return {
    falar(ms = 1500) {
      el.classList.add('av-falando');
      clearTimeout(tFala); tFala = setTimeout(() => el.classList.remove('av-falando'), ms);
    },
    calar() { clearTimeout(tFala); el.classList.remove('av-falando'); },
    parar() { vivo = false; clearTimeout(tPisca); clearTimeout(tFala); },
  };
}
