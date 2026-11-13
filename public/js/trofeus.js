// Troféus (igual aos de videogame): bronze, prata, ouro e a platina,
// que só vem depois de ganhar todos os outros. Ficam guardados em P.ach.
// Alguns troféus antigos (vitoria, longa, exclusivas, maratona) também liberam roupinhas.

export const TROFEUS = [
  // bronze
  { id: 'estreia', grau: 'bronze', icone: '🎮', nome: 'Estreia', desc: 'Jogue sua primeira partida.' },
  { id: 'treino', grau: 'bronze', icone: '🎯', nome: 'Treino é treino', desc: 'Jogue uma partida no Treinar sozinho.' },
  { id: 'aquecendo', grau: 'bronze', icone: '🔥', nome: 'Aquecendo', desc: 'Ache 10 palavras numa partida.' },
  { id: 'palavra6', grau: 'bronze', icone: '📏', nome: 'Palavra comprida', desc: 'Ache uma palavra de 6 letras ou mais.' },
  { id: 'so_minha', grau: 'bronze', icone: '⭐', nome: 'Só eu vi', desc: 'Ache uma palavra que ninguém mais achou.' },
  { id: 'galera', grau: 'bronze', icone: '🎉', nome: 'Galera reunida', desc: 'Jogue uma partida com 4 pessoas ou mais.' },
  { id: 'boca_suja', grau: 'bronze', icone: '🤬', nome: 'Boca suja', desc: 'Ache um palavrão (com o modo família desligado).' },
  { id: 'pestinha', grau: 'bronze', icone: '😈', nome: 'Pestinha', desc: 'Atrapalhe alguém no modo Atrapalhar.' },
  { id: 'estilo', grau: 'bronze', icone: '👗', nome: 'Estiloso', desc: 'Personalize e salve seu boneco.' },
  // prata
  { id: 'vitoria', grau: 'prata', icone: '🥇', nome: 'Primeira vitória', desc: 'Vença uma partida com 2 pessoas ou mais.' },
  { id: 'cacador', grau: 'prata', icone: '🔎', nome: 'Caçador de palavras', desc: 'Ache 25 palavras numa partida.' },
  { id: 'pontos60', grau: 'prata', icone: '💯', nome: 'Pontuação alta', desc: 'Faça 60 pontos numa partida.' },
  { id: 'exclusivas', grau: 'prata', icone: '🕵️', nome: 'Exclusivo', desc: 'Ache 10 palavras que só você achou numa partida.' },
  { id: 'maior', grau: 'prata', icone: '🏅', nome: 'Achei a maior!', desc: 'Ache a maior palavra possível do quadro.' },
  { id: 'frequente', grau: 'prata', icone: '📅', nome: 'Frequentador', desc: 'Jogue 10 partidas.' },
  { id: 'nivel5', grau: 'prata', icone: '⬆️', nome: 'Subindo', desc: 'Chegue ao nível 5.' },
  // ouro
  { id: 'longa', grau: 'ouro', icone: '🐍', nome: 'Palavra gigante', desc: 'Ache uma palavra de 8 letras ou mais.' },
  { id: 'maquina', grau: 'ouro', icone: '⚡', nome: 'Máquina de palavras', desc: 'Faça 100 pontos numa partida.' },
  { id: 'campeao', grau: 'ouro', icone: '👑', nome: 'Campeão', desc: 'Vença 10 partidas.' },
  { id: 'maratona', grau: 'ouro', icone: '🏃', nome: 'Maratonista', desc: 'Jogue 30 partidas.' },
  { id: 'lenda', grau: 'ouro', icone: '🌟', nome: 'Lenda', desc: 'Chegue ao nível 15.' },
  // platina
  { id: 'platina', grau: 'platina', icone: '🏆', nome: 'Mestre das Palavras', desc: 'Ganhe todos os outros troféus.' },
];

export const GRAUS = { bronze: 'Bronze', prata: 'Prata', ouro: 'Ouro', platina: 'Platina' };
export const trofeu = id => TROFEUS.find(t => t.id === id);

// Troféus que dependem só do perfil (partidas, vitórias, nível)
function doPerfil(P, nivel) {
  const out = [];
  if ((P.games || 0) >= 1) out.push('estreia');
  if ((P.games || 0) >= 10) out.push('frequente');
  if ((P.games || 0) >= 30) out.push('maratona');
  if ((P.wins || 0) >= 1) out.push('vitoria');
  if ((P.wins || 0) >= 10) out.push('campeao');
  if (nivel >= 5) out.push('nivel5');
  if (nivel >= 15) out.push('lenda');
  return out;
}

// Troféus de uma partida. m = { solo, nJog, venceu, pontos, palavras (sem acento), exclusivas, family, maior, palavrao(w) }
function daPartida(m) {
  const out = [];
  const ws = m.palavras || [];
  if (m.solo) out.push('treino');
  if (ws.length >= 10) out.push('aquecendo');
  if (ws.length >= 25) out.push('cacador');
  if (ws.some(w => w.length >= 6)) out.push('palavra6');
  if (ws.some(w => w.length >= 8)) out.push('longa');
  if (m.nJog > 1 && m.exclusivas >= 1) out.push('so_minha');
  if (m.nJog > 1 && m.exclusivas >= 10) out.push('exclusivas');
  if (m.nJog >= 4) out.push('galera');
  if (!m.family && m.palavrao && ws.some(m.palavrao)) out.push('boca_suja');
  if (m.pontos >= 60) out.push('pontos60');
  if (m.pontos >= 100) out.push('maquina');
  if (m.maior && ws.includes(m.maior)) out.push('maior');
  return out;
}

// Marca em P.ach o que foi conquistado e devolve os troféus novos (platina por último)
export function conferir(P, nivel, partida = null, extras = []) {
  P.ach = P.ach || {};
  const ids = [...doPerfil(P, nivel), ...(partida ? daPartida(partida) : []), ...extras];
  const novos = [];
  for (const id of ids) if (!P.ach[id] && trofeu(id)) { P.ach[id] = true; novos.push(id); }
  if (!P.ach.platina && TROFEUS.every(t => t.id === 'platina' || P.ach[t.id])) { P.ach.platina = true; novos.push('platina'); }
  return novos;
}

export const contar = P => TROFEUS.filter(t => P.ach && P.ach[t.id]).length;
