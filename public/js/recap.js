// Recapitulação: monta a sequência de "passos" a partir das palavras de cada jogador.
// Todos os celulares montam a mesma sequência com os mesmos dados e o mesmo relógio,
// então todo mundo vê a mesma palavra ao mesmo tempo.
import { pontos } from './dict.js';

// jogadores: [{id, name, look, palavras: [plain...]}]
// maior: a maior palavra possível no quadro (sem acento), para a curiosidade do final
export function montarRecap(jogadores, maior = null) {
  const varios = jogadores.length > 1;
  const quem = new Map();
  for (const j of jogadores) for (const w of j.palavras) {
    if (!quem.has(w)) quem.set(w, []);
    quem.get(w).push(j.id);
  }
  const ordem = (a, b) => a.length - b.length || a.localeCompare(b, 'pt');
  const todas = [...quem.keys()];
  const compartilhadas = todas.filter(w => quem.get(w).length > 1).sort(ordem);
  const exclusivas = todas.filter(w => quem.get(w).length === 1).sort(ordem);

  const final = Object.fromEntries(jogadores.map(j => [j.id, 0]));
  const nExcl = Object.fromEntries(jogadores.map(j => [j.id, 0]));
  const nWords = compartilhadas.length + exclusivas.length;
  const dPal = nWords <= 25 ? 1900 : Math.max(800, Math.round(48000 / nWords));
  const passos = [];
  const add = p => passos.push(p);

  add({ t: 'titulo', h: '🎬 Recapitulação!', p: nWords ? `${nWords} palavras achadas` : 'Ninguém achou nada?! 😱', dur: 2600, som: 'whoosh' });

  if (varios && compartilhadas.length) {
    add({ t: 'titulo', h: '👯 Achadas por mais de uma pessoa', p: 'Valem os pontos normais', dur: 2400, som: 'whoosh', secao: 'Repetidas' });
    compartilhadas.forEach((w, i) => {
      const pts = pontos(w.length);
      quem.get(w).forEach(id => { final[id] += pts; });
      add({ t: 'palavra', w, pts, quem: quem.get(w), excl: false, n: i + 1, de: compartilhadas.length, dur: dPal, secao: 'Repetidas' });
    });
  }
  if (exclusivas.length) {
    if (varios) add({ t: 'titulo', h: '⭐ Exclusivas!', p: 'Só uma pessoa achou: valem o DOBRO', dur: 2600, som: 'brilho', secao: 'Exclusivas' });
    exclusivas.forEach((w, i) => {
      const base = pontos(w.length), pts = varios ? base * 2 : base, id = quem.get(w)[0];
      final[id] += pts; nExcl[id]++;
      add({ t: 'palavra', w, pts, base, quem: [id], excl: varios, n: i + 1, de: exclusivas.length, dur: dPal, secao: varios ? 'Exclusivas' : 'Suas palavras' });
    });
  }

  const inicioRanking = passos.reduce((s, p) => s + p.dur, 0);
  if (maior) add({ t: 'maior', w: maior, quem: quem.get(maior) || [], dur: 5200, som: 'brilho', secao: 'Curiosidade' });
  const rank = jogadores.map(j => ({ id: j.id, score: final[j.id] })).sort((a, b) => a.score - b.score);
  const topo = rank.length ? rank[rank.length - 1].score : 0;
  const vencedores = rank.filter(r => r.score === topo);
  const outros = rank.filter(r => r.score !== topo);
  const lugar = s => 1 + new Set(rank.filter(r => r.score > s).map(r => r.score)).size;

  if (varios) {
    add({ t: 'titulo', h: '🏆 E o ranking fica…', p: '', dur: 2200, som: 'whoosh', secao: 'Ranking' });
    outros.forEach((r, i) => {
      const pos = lugar(r.score), ultimoAntes = i === outros.length - 1;
      add({ t: 'rank', id: r.id, score: r.score, pos, dur: ultimoAntes ? 3000 : 2000, secao: 'Ranking' });
    });
    add({ t: 'suspense', dur: 2600, secao: 'Ranking' });
  }
  add({ t: 'campeao', ids: vencedores.map(v => v.id), score: topo, varios, dur: 7000, secao: varios ? 'Ranking' : 'Fim' });

  let acc = 0;
  for (const p of passos) { p.ini = acc; acc += p.dur; }
  return { passos, total: acc, inicioRanking, final, nExcl, quem, vencedores: vencedores.map(v => v.id) };
}

// Em que passo estamos depois de "ms" milissegundos de recapitulação
export function passoEm(recap, ms) {
  if (ms < 0) return -1;
  const ps = recap.passos;
  for (let i = ps.length - 1; i >= 0; i--) if (ms >= ps[i].ini) return i;
  return 0;
}
