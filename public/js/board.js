// Tabuleiro 6x6: desenha as letras e liga as letras com o dedo, na ordem do toque.
import { N, adjacentes } from './dict.js';

const CORES = ['#ff7eb6', '#ffb14e', '#ffe14d', '#7be38a', '#5ad1ff', '#a98bff'];

export function criarTabuleiro(el, { onChange, onSubmit, onTile }) {
  el.innerHTML = '';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('trilha');
  svg.setAttribute('viewBox', '0 0 600 600');
  const linha = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  svg.appendChild(linha);
  const tiles = [];
  for (let i = 0; i < N * N; i++) {
    const t = document.createElement('div');
    t.className = 'tile';
    t.style.setProperty('--cor', CORES[(i * 7 + Math.floor(i / N)) % CORES.length]);
    t.innerHTML = '<span></span>';
    el.appendChild(t);
    tiles.push(t);
  }
  el.appendChild(svg);

  let grid = '', path = [], ativo = false, travado = true;

  function desenhar() {
    tiles.forEach((t, i) => t.classList.toggle('on', path.includes(i)));
    tiles.forEach(t => t.classList.remove('ultimo'));
    if (path.length) tiles[path[path.length - 1]].classList.add('ultimo');
    linha.setAttribute('points', path.map(i => `${(i % N) * 100 + 50},${Math.floor(i / N) * 100 + 50}`).join(' '));
    onChange(path.map(i => grid[i]).join(''));
  }

  function tileEm(x, y) {
    const b = el.getBoundingClientRect();
    const cel = b.width / N;
    const c = Math.floor((x - b.left) / cel), r = Math.floor((y - b.top) / cel);
    if (c < 0 || r < 0 || c >= N || r >= N) return -1;
    // Só conta perto do centro: assim dá pra passar na diagonal sem pegar o vizinho.
    const cx = b.left + (c + 0.5) * cel, cy = b.top + (r + 0.5) * cel;
    const raio = path.length ? cel * 0.36 : cel * 0.5;
    return Math.hypot(x - cx, y - cy) <= raio ? r * N + c : -1;
  }

  function tocar(i) {
    if (i < 0) return;
    if (!path.length) { path.push(i); onTile(path.length); desenhar(); return; }
    const last = path[path.length - 1];
    // Regras: letra já usada não entra de novo e não dá pra pular letra (só vizinhas).
    if (path.includes(i) || !adjacentes(last, i)) return;
    path.push(i); onTile(path.length); desenhar();
  }

  function fim() {
    if (!ativo) return;
    ativo = false;
    const p = path.slice();
    const palavra = p.map(i => grid[i]).join('');
    path = [];
    linha.setAttribute('points', '');
    tiles.forEach(t => t.classList.remove('on', 'ultimo'));
    onChange('');
    if (palavra.length) onSubmit(palavra, p);
  }

  el.addEventListener('pointerdown', e => {
    if (travado) return;
    e.preventDefault();
    try { el.setPointerCapture(e.pointerId); } catch {}
    ativo = true; path = [];
    tocar(tileEm(e.clientX, e.clientY));
  });
  el.addEventListener('pointermove', e => {
    if (!ativo) return;
    e.preventDefault();
    // Eventos intermediários: movimentos rápidos não pulam letras
    const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    for (const ev of (evs.length ? evs : [e])) tocar(tileEm(ev.clientX, ev.clientY));
  });
  el.addEventListener('pointerup', fim);
  el.addEventListener('pointercancel', fim);
  el.addEventListener('contextmenu', e => e.preventDefault());

  return {
    setGrid(g) { grid = g; tiles.forEach((t, i) => { t.firstChild.textContent = g[i] || ''; }); },
    travar(v) { travado = v; if (v) { ativo = false; path = []; desenhar(); } },
    piscar(idx, tipo) {
      idx.forEach(i => { tiles[i].classList.remove('ok', 'erro', 'rep'); void tiles[i].offsetWidth; tiles[i].classList.add(tipo); });
      setTimeout(() => idx.forEach(i => tiles[i].classList.remove(tipo)), 450);
    },
    embaralharVisual() { tiles.forEach((t, i) => t.style.animationDelay = (i % 7) * 25 + 'ms'); el.classList.remove('entrar'); void el.offsetWidth; el.classList.add('entrar'); },
  };
}
