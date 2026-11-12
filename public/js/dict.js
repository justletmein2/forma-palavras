// Dicionário, grade e "solucionador" (acha todas as palavras de uma grade).
// palavras.txt: uma palavra por linha, já com acento, da mais comum para a mais rara.

export function semAcento(w) {
  return w.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

let display = null;   // Map: "coracao" -> "coração"
let rank = null;      // Map: "coracao" -> posição de frequência (menor = mais comum)
let sorted = null;    // chaves ordenadas, para busca de prefixo
let palavroes = null; // Set de chaves sem acento
let loading = null;

export function dictReady() { return !!display; }

export function loadDict(base = '') {
  if (loading) return loading;
  loading = (async () => {
    const [txt, pal] = await Promise.all([
      fetch(base + 'palavras.txt').then(r => { if (!r.ok) throw new Error('dicionário'); return r.text(); }),
      fetch(base + 'palavroes.txt').then(r => r.ok ? r.text() : ''),
    ]);
    const lines = txt.split('\n');
    display = new Map();
    rank = new Map();
    for (let i = 0; i < lines.length; i++) {
      const w = lines[i].trim();
      if (!w) continue;
      const k = semAcento(w);
      if (!display.has(k)) { display.set(k, w); rank.set(k, i); }
    }
    sorted = Array.from(display.keys()).sort();
    palavroes = new Set(pal.split('\n').map(s => s.trim()).filter(Boolean));
  })();
  return loading;
}

export function lookup(plain, family) {
  const k = plain.toLowerCase();
  if (k.length < 3 || !display.has(k)) return null;
  if (family && palavroes.has(k)) return { blocked: true };
  return { word: display.get(k), plain: k };
}

export function pontos(len) {
  if (len <= 3) return 1;
  if (len === 4) return 2;
  if (len === 5) return 3;
  if (len === 6) return 5;
  if (len === 7) return 7;
  if (len === 8) return 10;
  return 10 + 3 * (len - 8);
}

// ---------- grade ----------

// Frequência de letras do português (acentos e ç já juntados à letra base).
const PESOS = {
  A: 14, E: 12.5, O: 10, S: 7.8, R: 6.5, I: 6.4, N: 5, D: 5, M: 4.7, U: 4.6, T: 4.4,
  C: 3.9, L: 2.9, P: 2.6, V: 1.6, G: 1.3, H: 1.0, B: 1.1, F: 1.0, Q: 0.5, Z: 0.5, J: 0.4, X: 0.25,
};
const LETRAS = Object.keys(PESOS);
const TOTAL = LETRAS.reduce((s, l) => s + PESOS[l], 0);

export function rng(seed) { // mulberry32
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gradeAleatoria(rand) {
  const g = [];
  for (let i = 0; i < 36; i++) {
    let r = rand() * TOTAL;
    for (const l of LETRAS) { r -= PESOS[l]; if (r <= 0) { g.push(l); break; } }
    if (g.length <= i) g.push('A');
  }
  // Q sem U por perto não forma nada: troca por outra letra.
  for (let i = 0; i < 36; i++) {
    if (g[i] === 'Q' && !vizinhos(i).some(j => g[j] === 'U')) g[i] = 'R';
  }
  return g.join('');
}

export const N = 6;
const VIZ = Array.from({ length: 36 }, (_, i) => {
  const r = Math.floor(i / N), c = i % N, out = [];
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    if (!dr && !dc) continue;
    const rr = r + dr, cc = c + dc;
    if (rr >= 0 && rr < N && cc >= 0 && cc < N) out.push(rr * N + cc);
  }
  return out;
});
export function vizinhos(i) { return VIZ[i]; }
export function adjacentes(a, b) { return VIZ[a].includes(b); }

function temPrefixo(p) {
  let lo = 0, hi = sorted.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (sorted[m] < p) lo = m + 1; else hi = m; }
  return lo < sorted.length && sorted[lo].startsWith(p);
}

// Todas as palavras (sem acento) que dá pra formar na grade.
export function resolver(grid, family = false) {
  const g = grid.toLowerCase();
  const achadas = new Set();
  const usado = new Array(36).fill(false);
  const dfs = (i, pre) => {
    const w = pre + g[i];
    if (!temPrefixo(w)) return;
    if (w.length >= 3 && display.has(w) && !(family && palavroes.has(w))) achadas.add(w);
    if (w.length >= 13) return;
    usado[i] = true;
    for (const j of VIZ[i]) if (!usado[j]) dfs(j, w);
    usado[i] = false;
  };
  for (let i = 0; i < 36; i++) dfs(i, '');
  return achadas;
}

// Gera várias grades e fica com a mais "rica" (mais palavras de uso comum).
export function gerarGrade(seed = Date.now()) {
  const rand = rng(seed);
  let melhor = null, melhorNota = -1;
  for (let t = 0; t < 14; t++) {
    const g = gradeAleatoria(rand);
    const ws = resolver(g, true);
    let nota = 0;
    for (const w of ws) if (rank.get(w) < 60000) nota += 1 + w.length / 4;
    if (nota > melhorNota) { melhorNota = nota; melhor = g; }
  }
  return melhor;
}

export function exibir(plain) { return display.get(plain) || plain; }
export function raridade(plain) { return rank.get(plain) ?? 1e9; }
export function ehPalavrao(plain) { return palavroes.has(plain); }

// Um caminho no quadro que forma a palavra (lista de casas), ou null
export function caminhoDe(plain, grid) {
  const g = grid.toLowerCase(), w = plain.toLowerCase(), res = [], usado = new Set();
  const vai = (i, k) => {
    if (g[i] !== w[k] || usado.has(i)) return false;
    usado.add(i); res.push(i);
    if (k === w.length - 1) return true;
    for (const j of VIZ[i]) if (vai(j, k + 1)) return true;
    usado.delete(i); res.pop(); return false;
  };
  for (let i = 0; i < 36; i++) if (vai(i, 0)) return res;
  return null;
}
