// Modo "Atrapalhar": os poderes que aparecem no quadro de quem foi atrapalhado.
import { avatarSVG } from './avatar.js';
import * as som from './audio.js';

export const PODERES = {
  gelo: { nome: 'Congelamento', icone: '🧊', desc: 'Congela o quadro: 10 toques pra quebrar o gelo' },
  gosma: { nome: 'Gosma', icone: '🧪', desc: 'Cobre o quadro de gosma: tem que limpar com o dedo' },
  carmela: { nome: 'Carmela agitada', icone: '🐶', desc: 'A Carmela mastiga 10 letras por uns 10 segundos' },
  dracula: { nome: 'Drácula', icone: '🦇', desc: 'Uma nuvem de morcegos voa na frente das letras' },
};
export const TIPOS = Object.keys(PODERES);

const rand = (a, b) => a + Math.random() * (b - a);
const embaralhar = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const MORCEGO = `<svg viewBox="0 0 64 34" aria-hidden="true">
  <path class="asa" d="M32 15 C25 3 11 2 1 10 C7 12 9 18 7 23 C13 19 17 21 19 27 C23 21 28 21 32 23Z"/>
  <path class="asa" d="M32 15 C39 3 53 2 63 10 C57 12 55 18 57 23 C51 19 47 21 45 27 C41 21 36 21 32 23Z"/>
  <ellipse cx="32" cy="18" rx="6" ry="8"/><path d="M27.5 11 L28.5 5 L30.5 10.5Z M36.5 11 L35.5 5 L33.5 10.5Z"/>
  <circle cx="30" cy="16.5" r="1.3" fill="#ff5470"/><circle cx="34" cy="16.5" r="1.3" fill="#ff5470"/></svg>`;

export function criarEfeitos(wrap, tab) {
  const timers = new Set();
  const limpezas = new Set();
  const mastigadas = new Set();
  const depois = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
  const camada = cls => { const d = document.createElement('div'); d.className = 'fx ' + cls; wrap.appendChild(d); return d; };

  // 1) Congelamento: camada de gelo por cima; 10 toques quebram
  function gelo() {
    tab.cancelar();
    const d = camada('fx-gelo');
    d.innerHTML = `<svg class="rachas" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
      <div class="fx-aviso">🧊 Toque pra quebrar o gelo! <b>10</b></div>`;
    const svg = d.querySelector('svg'), cont = d.querySelector('b');
    let falta = 10, fim = false;
    const tirar = () => { fim = true; d.remove(); limpezas.delete(tirar); };
    limpezas.add(tirar);
    const quebrar = () => {
      if (fim) return;
      fim = true; som.sfx('quebra');
      d.classList.add('quebrando');
      for (let i = 0; i < 16; i++) {
        const c = document.createElement('i'); c.className = 'caco';
        c.style.left = rand(5, 90) + '%'; c.style.top = rand(5, 90) + '%';
        c.style.setProperty('--dx', rand(-140, 140) + 'px'); c.style.setProperty('--dy', rand(-60, 200) + 'px');
        c.style.setProperty('--r', rand(-220, 220) + 'deg');
        d.appendChild(c);
      }
      depois(tirar, 700);
    };
    d.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      if (fim) return;
      falta--; cont.textContent = Math.max(falta, 0);
      const b = d.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width * 100, y = (e.clientY - b.top) / b.height * 100;
      let linhas = '';
      for (let i = 0; i < 4; i++) {
        let px = x, py = y; const ang = rand(0, Math.PI * 2), pts = [`${px.toFixed(1)},${py.toFixed(1)}`];
        for (let j = 0; j < 3; j++) { px += Math.cos(ang + rand(-0.6, 0.6)) * rand(6, 14); py += Math.sin(ang + rand(-0.6, 0.6)) * rand(6, 14); pts.push(`${px.toFixed(1)},${py.toFixed(1)}`); }
        linhas += `<polyline points="${pts.join(' ')}"/>`;
      }
      svg.insertAdjacentHTML('beforeend', linhas);
      d.style.setProperty('--forca', (falta / 10).toFixed(2));
      d.classList.remove('treme'); void d.offsetWidth; d.classList.add('treme');
      if (navigator.vibrate) navigator.vibrate(12);
      if (falta <= 0) quebrar(); else som.sfx('gelo', 10 - falta);
    });
    depois(quebrar, 20000); // derrete sozinho se a pessoa não mexer
  }

  // 2) Gosma: canvas verde por cima; arrastar o dedo limpa
  function gosma() {
    tab.cancelar();
    const c = document.createElement('canvas'); c.className = 'fx fx-gosma'; wrap.appendChild(c);
    const aviso = camada('fx-aviso-solto'); aviso.textContent = '🧽 Arraste o dedo pra limpar!';
    const b = wrap.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = Math.max(60, Math.round(b.width)), H = Math.max(60, Math.round(b.height));
    c.width = W * dpr; c.height = H * dpr;
    const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, W * 0.3, H);
    g.addColorStop(0, '#8be85a'); g.addColorStop(0.5, '#5fcf3a'); g.addColorStop(1, '#379f25');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 46; i++) {
      ctx.fillStyle = i % 3 ? 'rgba(35,125,25,.42)' : 'rgba(185,255,130,.38)';
      ctx.beginPath(); ctx.ellipse(rand(0, W), rand(0, H), rand(10, 50), rand(8, 36), rand(0, 3), 0, 7); ctx.fill();
    }
    for (let i = 0; i < 22; i++) {
      const x = rand(0, W), y = rand(0, H), r = rand(3, 11);
      ctx.fillStyle = 'rgba(225,255,205,.55)'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.3, 0, 7); ctx.fill();
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = W * 0.17;
    let ult = null, fim = false, verT = 0;
    const tirar = () => { fim = true; c.remove(); aviso.remove(); limpezas.delete(tirar); };
    limpezas.add(tirar);
    const pos = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
    const limpo = () => {
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let cheio = 0, tot = 0;
      for (let i = 3; i < d.length; i += 4 * 9) { tot++; if (d[i] > 40) cheio++; }
      return 1 - cheio / tot;
    };
    const terminar = () => {
      if (fim) return;
      fim = true; c.classList.add('sumindo'); aviso.remove(); som.sfx('brilho');
      depois(tirar, 450);
    };
    c.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      if (fim) return;
      try { c.setPointerCapture(e.pointerId); } catch {}
      ult = pos(e); aviso.classList.add('some');
      ctx.beginPath(); ctx.arc(ult[0], ult[1], ctx.lineWidth / 2, 0, 7); ctx.fill();
      som.sfx('gosma');
    });
    c.addEventListener('pointermove', e => {
      if (!ult || fim) return;
      e.preventDefault();
      const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      for (const ev of (evs.length ? evs : [e])) {
        const p = pos(ev);
        ctx.beginPath(); ctx.moveTo(ult[0], ult[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
        ult = p;
      }
      const t = performance.now();
      if (t - verT > 200) { verT = t; if (limpo() > 0.88) terminar(); }
    });
    const solta = () => { ult = null; if (!fim && limpo() > 0.88) terminar(); };
    c.addEventListener('pointerup', solta); c.addEventListener('pointercancel', solta);
    depois(terminar, 25000);
  }

  // 3) Carmela agitada: cachorrinhas mastigam 10 letras, que voltam em ~10 s
  function carmela() {
    const alvos = embaralhar([...Array(36).keys()]).slice(0, 10);
    som.sfx('latido');
    alvos.forEach((i, k) => depois(() => {
      const tile = tab.tileEl(i);
      const wb = wrap.getBoundingClientRect(), tb = tile.getBoundingClientRect();
      const tam = tb.width * 1.55;
      const dog = document.createElement('div'); dog.className = 'fx-dog';
      dog.style.cssText = `left:${tb.left - wb.left + tb.width / 2 - tam / 2}px;top:${tb.top - wb.top + tb.height / 2 - tam / 2}px;width:${tam}px;height:${tam}px`;
      dog.style.setProperty('--vira', Math.random() < 0.5 ? -1 : 1);
      dog.innerHTML = avatarSVG({ tipo: 'caramelo', corRoupa: ['rosa', 'azul', 'amarelo', 'verde'][k % 4], olhos: k % 2 ? 'feliz' : 'normal' }, tam, { semFundo: true }) + '<span class="nhac">nhac!</span>';
      wrap.appendChild(dog);
      depois(() => {
        som.sfx('nhac');
        tile.style.setProperty('--rot', rand(-50, 50).toFixed(0) + 'deg');
        tile.classList.add('mastigada');
        mastigadas.add(i); tab.ocultar(mastigadas);
      }, 480);
      depois(() => dog.remove(), 1350);
    }, k * 210));
    // cada letra volta uns 10 s depois de mastigada
    alvos.forEach((i, k) => depois(() => {
      const tile = tab.tileEl(i);
      tile.classList.remove('mastigada'); tile.classList.add('regenera');
      depois(() => tile.classList.remove('regenera'), 800);
      mastigadas.delete(i); tab.ocultar(mastigadas);
      if (k === 0) som.sfx('brilho');
    }, k * 210 + 480 + 10000));
  }

  // 4) Drácula: muitos morcegos na frente das letras (dá pra continuar jogando)
  function dracula() {
    som.sfx('morcegos');
    depois(() => som.sfx('morcegos'), 2600);
    const d = camada('fx-morcegos');
    const b = wrap.getBoundingClientRect(), W = b.width, H = b.height;
    for (let i = 0; i < 110; i++) {
      const m = document.createElement('div'); m.className = 'morcego';
      const tam = rand(32, 78);
      m.style.width = tam + 'px'; m.style.height = (tam * 34 / 64) + 'px';
      m.style.setProperty('--bate', rand(0.11, 0.19).toFixed(2) + 's');
      m.innerHTML = MORCEGO;
      d.appendChild(m);
      const pontos = [];
      for (let j = 0; j < 6; j++) pontos.push({ transform: `translate(${(rand(-0.12, 1) * W - tam / 4).toFixed(0)}px, ${(rand(-0.08, 0.98) * H).toFixed(0)}px) rotate(${rand(-28, 28).toFixed(0)}deg)` });
      if (m.animate) m.animate(pontos, { duration: rand(1700, 3300), iterations: Infinity, direction: 'alternate', easing: 'ease-in-out', delay: -rand(0, 3000) });
    }
    const tirar = () => { d.remove(); limpezas.delete(tirar); };
    limpezas.add(tirar);
    depois(() => d.classList.add('indo'), 7000);
    depois(tirar, 7700);
  }

  const EFEITOS = { gelo, gosma, carmela, dracula };
  return {
    aplicar(tipo) { (EFEITOS[tipo] || dracula)(); },
    limpar() {
      timers.forEach(clearTimeout); timers.clear();
      [...limpezas].forEach(fn => fn());
      wrap.querySelectorAll('.fx, .fx-dog').forEach(e => e.remove());
      mastigadas.forEach(i => tab.tileEl(i).classList.remove('mastigada', 'regenera'));
      mastigadas.clear(); tab.ocultar(mastigadas);
    },
  };
}
