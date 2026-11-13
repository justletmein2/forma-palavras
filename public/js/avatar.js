// Bonequinho/bonequinha em SVG + catálogo de cosméticos e o que desbloqueia cada um.
// lvl: nível necessário. ach: conquista necessária (vitoria, longa, exclusivas, maratona).

export const CATALOGO = {
  tipo: [
    { id: 'pessoa', nome: 'Pessoa' }, { id: 'caramelo', nome: 'Carmelinha' }, { id: 'morcego', nome: 'Drácula' },
    { id: 'passaro', nome: 'Passarinho' }, { id: 'maltes', nome: 'Maltesinha' }, { id: 'gato', nome: 'Gatinho' },
    { id: 'alien', nome: 'Alien' }, { id: 'robo', nome: 'Robô' },
  ],
  // comemoração do vencedor (só aparece no card de campeão, no fim da recapitulação)
  comemora: [
    { id: 'pulinho', nome: 'Pulinhos' }, { id: 'giro', nome: 'Giro' }, { id: 'danca', nome: 'Dancinha', lvl: 2 },
    { id: 'gigante', nome: 'Fica gigante', lvl: 3 }, { id: 'foguete', nome: 'Foguete', lvl: 4 }, { id: 'cambalhota', nome: 'Cambalhota', lvl: 5 },
    { id: 'estrelas', nome: 'Chuva de estrelas', lvl: 7 }, { id: 'disco', nome: 'Discoteca', lvl: 9 }, { id: 'aura', nome: 'Aura dourada', ach: 'vitoria' },
  ],
  frase: [
    { id: 'ganhei', nome: 'Ganhei! 🎉' }, { id: 'facil', nome: 'Foi fácil!' }, { id: 'gg', nome: 'GG! 🤝', lvl: 2 },
    { id: 'dicionario', nome: 'Sou um dicionário! 📖', lvl: 3 }, { id: 'manga', nome: 'Chupa essa manga! 🥭', lvl: 4 },
    { id: 'aprendam', nome: 'Aprendam comigo 😎', lvl: 5 }, { id: 'lenco', nome: 'Alguém tem um lencinho? 🤧', lvl: 6 },
    { id: 'suei', nome: 'Nem suei 😅', lvl: 8 }, { id: 'realeza', nome: 'Realeza das letras 👑', lvl: 10 },
    { id: 'proximo', nome: 'Próximo! 💅', lvl: 12 }, { id: 'imparavel', nome: 'Sou imparável! 🚀', ach: 'maratona' },
  ],
  // orelhas da Maltesinha
  orelhas: [
    { id: 'curtas', nome: 'Curtinhas' }, { id: 'medias', nome: 'Médias' }, { id: 'compridas', nome: 'Compridas', lvl: 3 },
    { id: 'super', nome: 'Supercompridas', lvl: 6 }, { id: 'gigantes', nome: 'Arrastando no chão', lvl: 10 },
  ],
  corAlien: [
    { id: 'verde', nome: 'Verdinho', cor: '#8ee36b' }, { id: 'azul', nome: 'Azulzinho', cor: '#79c7ff' },
    { id: 'roxo', nome: 'Roxinho', cor: '#b28cff', lvl: 2 }, { id: 'rosa', nome: 'Rosinha', cor: '#ff9fd0', lvl: 3 },
    { id: 'laranja', nome: 'Laranja', cor: '#ffb05c', lvl: 5 }, { id: 'prata', nome: 'Prateado', cor: '#c9d1de', lvl: 7 },
    { id: 'neon', nome: 'Neon', cor: '#4dff7a', lvl: 9 }, { id: 'galaxia', nome: 'Galáxia', cor: '#2c2f6e', lvl: 12 },
    { id: 'dourado', nome: 'Dourado', cor: '#e8b923', ach: 'vitoria' },
  ],
  modeloAlien: [
    { id: 'antenas', nome: 'Anteninhas' }, { id: 'tresolhos', nome: 'Três olhos', lvl: 2 }, { id: 'orelhudo', nome: 'Orelhudo', lvl: 4 },
    { id: 'cabecudo', nome: 'Cabeçudo', lvl: 6 }, { id: 'tentaculos', nome: 'Tentáculos', lvl: 8 }, { id: 'ciclope', nome: 'Ciclope', lvl: 10 },
  ],
  corRobo: [
    { id: 'prata', nome: 'Prateado', cor: '#c9d1de' }, { id: 'azul', nome: 'Azul', cor: '#7fb8e6' },
    { id: 'vermelho', nome: 'Vermelho', cor: '#f0727a', lvl: 2 }, { id: 'amarelo', nome: 'Amarelo', cor: '#ffd35c', lvl: 3 },
    { id: 'verde', nome: 'Verde', cor: '#7fdc9a', lvl: 4 }, { id: 'rosa', nome: 'Rosa', cor: '#ffadd6', lvl: 5 },
    { id: 'preto', nome: 'Preto fosco', cor: '#3b3f4f', lvl: 7 }, { id: 'cobre', nome: 'Cobre', cor: '#d08a5a', lvl: 9 },
    { id: 'dourado', nome: 'Dourado', cor: '#e8b923', ach: 'vitoria' },
  ],
  modeloRobo: [
    { id: 'quadrado', nome: 'Quadradão' }, { id: 'redondo', nome: 'Redondinho' }, { id: 'tv', nome: 'Cara de TV', lvl: 3 },
    { id: 'antigo', nome: 'Retrô', lvl: 5 }, { id: 'visor', nome: 'Visor', lvl: 7 }, { id: 'urso', nome: 'Robô-urso', lvl: 9 },
  ],
  // cores do gatinho (a maioria desbloqueia jogando)
  pelagem: [
    { id: 'laranja', nome: 'Laranjinha' }, { id: 'cinza', nome: 'Cinzinha' }, { id: 'preto', nome: 'Pretinho', lvl: 2 },
    { id: 'branco', nome: 'Branquinho', lvl: 3 }, { id: 'frajola', nome: 'Frajola', lvl: 4 }, { id: 'siames', nome: 'Siamês', lvl: 5 },
    { id: 'rajado', nome: 'Rajado', lvl: 6 }, { id: 'tricolor', nome: 'Tricolor', lvl: 7 }, { id: 'rosa', nome: 'Rosinha', lvl: 9 },
    { id: 'lilas', nome: 'Lilás', lvl: 11 }, { id: 'galaxia', nome: 'Galáxia', lvl: 14 }, { id: 'dourado', nome: 'Dourado', ach: 'vitoria' },
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
    { id: 'sininho', nome: 'Coleira com sininho' }, { id: 'flor', nome: 'Florzinha' }, { id: 'gravata', nome: 'Gravata-borboleta', lvl: 2 },
    { id: 'bochechas', nome: 'Bochechas de coração', lvl: 3 }, { id: 'cachecol', nome: 'Cachecol', lvl: 4 },
    { id: 'perolas', nome: 'Colar de pérolas', lvl: 5 }, { id: 'osso', nome: 'Ossinho', lvl: 6 }, { id: 'tapaolho', nome: 'Tapa-olho pirata', lvl: 7 },
    { id: 'medalha', nome: 'Medalha de ouro', ach: 'vitoria' },
  ],
  fundo: [
    { id: 'lilas', nome: 'Lilás', cor: '#e9e2ff' }, { id: 'menta', nome: 'Menta', cor: '#d6f7e3' }, { id: 'pessego', nome: 'Pêssego', cor: '#ffe3cf' },
    { id: 'ceu', nome: 'Céu', cor: '#d5efff', lvl: 2 }, { id: 'chiclete', nome: 'Chiclete', cor: '#ffd3e8', lvl: 3 },
    { id: 'sol', nome: 'Sol', cor: '#fff1a8', lvl: 5 }, { id: 'noite', nome: 'Noite', cor: '#2b2a5c', lvl: 11 },
    { id: 'patinhas', nome: 'Patinhas', cor: '#ffe6f1' }, { id: 'bolinhas', nome: 'Bolinhas', cor: '#d9f1ff' },
    { id: 'nuvens', nome: 'Nuvens', cor: '#bfe6ff', lvl: 2 }, { id: 'listras', nome: 'Listras', cor: '#fff3c4', lvl: 3 },
    { id: 'coracoes', nome: 'Corações', cor: '#ffdbe7', lvl: 4 }, { id: 'pordosol', nome: 'Pôr do sol', cor: '#ffb27a', lvl: 6 },
    { id: 'estrelado', nome: 'Céu estrelado', cor: '#26245a', lvl: 8 }, { id: 'arcoiris', nome: 'Arco-íris', cor: '#e8f7ff', lvl: 10 },
    { id: 'confete', nome: 'Confete', cor: '#fff8ee', ach: 'maratona' },
  ],
};

export const PARTES = [
  ['tipo', 'Personagem'], ['plumagem', 'Cor das penas'], ['pelagem', 'Cor do pelo'], ['orelhas', 'Orelhas'],
  ['corAlien', 'Cor do alien'], ['modeloAlien', 'Modelo'], ['corRobo', 'Cor da lataria'], ['modeloRobo', 'Modelo'], ['pele', 'Pele'], ['cabelo', 'Cabelo'], ['corCabelo', 'Cor do cabelo'], ['barba', 'Barba'], ['olhos', 'Olhos'], ['boca', 'Boca'],
  ['roupa', 'Roupa'], ['corRoupa', 'Cor da roupa'], ['chapeu', 'Chapéu'], ['acessorio', 'Acessório'], ['fundo', 'Fundo'],
  ['comemora', 'Comemoração'], ['frase', 'Frase de vitória'],
];

// Partes que valem para os bichinhos (o resto é só para pessoa)
export const PARTES_BICHO = ['tipo', 'olhos', 'corRoupa', 'chapeu', 'acessorio', 'fundo'];
const SO_BICHO = ['plumagem', 'pelagem', 'orelhas', 'corAlien', 'modeloAlien', 'corRobo', 'modeloRobo'];
// nome da "cor" de cada personagem no editor
export function rotuloCor(tipo) { return { alien: 'Cor do macacão', robo: 'Cor das luzes' }[tipo] || 'Lencinho'; }
// partes que aparecem em cada personagem
export function partesDe(look) { return [...partesDoCorpo(look), 'comemora', 'frase']; }
function partesDoCorpo(look) {
  const t = normalizar(look).tipo || 'pessoa';
  if (t === 'pessoa') return PARTES.filter(([k]) => !SO_BICHO.includes(k) && k !== 'comemora' && k !== 'frase').map(([k]) => k);
  if (t === 'passaro') return ['tipo', 'plumagem', ...PARTES_BICHO.slice(1)];
  if (t === 'gato') return ['tipo', 'pelagem', ...PARTES_BICHO.slice(1)];
  if (t === 'maltes') return ['tipo', 'orelhas', ...PARTES_BICHO.slice(1)];
  // alien e robô têm olhos próprios (vêm do modelo)
  if (t === 'alien') return ['tipo', 'corAlien', 'modeloAlien', 'corRoupa', 'chapeu', 'acessorio', 'fundo'];
  if (t === 'robo') return ['tipo', 'corRobo', 'modeloRobo', 'corRoupa', 'chapeu', 'acessorio', 'fundo'];
  return PARTES_BICHO;
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
    tipo: 'pessoa', barba: 'nada', comemora: 'pulinho', frase: 'ganhei', plumagem: 'sanhaco', pelagem: 'laranja', orelhas: 'medias', corAlien: 'verde', modeloAlien: 'antenas', corRobo: 'prata', modeloRobo: 'quadrado', 
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
  if (!opts.semFundo) s.push(padraoFundo(L.fundo));

  const bicho = ehBicho(L);
  if (bicho) s.push(desenharBicho(L, roupa));
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
  if (!['alien', 'robo'].includes(L.tipo)) s.push(olhos);
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
  if (bicho) s.push(focinho(L));
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
    sininho: `<path d="M30 71 Q50 81 70 71" fill="none" stroke="#e8455b" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="80" r="4.6" fill="#ffc83d" stroke="#c99a12" stroke-width="1"/><path d="M47 81 H53" stroke="#8a6a00" stroke-width="1.2"/><circle cx="50" cy="83" r="1" fill="#8a6a00"/>`,
    flor: `<g transform="translate(69 28)">${[0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-5" rx="3.6" ry="5" transform="rotate(${a})" fill="#ff8fbf"/>`).join('')}<circle r="3.2" fill="#ffd23f"/></g>`,
    gravata: `<g transform="translate(50 76)"><path d="M0 0 L-11 -6 L-11 6Z M0 0 L11 -6 L11 6Z" fill="${roupa}" stroke="rgba(0,0,0,.25)" stroke-width="1"/><rect x="-3" y="-3.5" width="6" height="7" rx="2" fill="${roupa}" stroke="rgba(0,0,0,.3)" stroke-width="1"/></g>`,
    bochechas: [35, 65].map(x => `<path transform="translate(${x} 56) scale(.42)" d="M0 7 C-12 -1 -7 -10 0 -4 C7 -10 12 -1 0 7Z" fill="#ff4f8b"/>`).join(''),
    cachecol: `<path d="M28 70 Q50 82 72 70 L72 77 Q50 89 28 77Z" fill="${roupa}"/><path d="M60 78 L64 98 L72 96 L67 76Z" fill="${roupa}"/><g stroke="#fff" stroke-width="2" opacity=".7"><path d="M36 74 L36 81"/><path d="M50 77 L50 84"/><path d="M64 74 L64 81"/><path d="M62 88 L69 87"/></g>`,
    perolas: `<g fill="#fffaf2" stroke="#d9cbb7" stroke-width=".6">${Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.12 + 0.76 * i / 10); return `<circle cx="${(50 - 21 * Math.cos(a)).toFixed(1)}" cy="${(69 + 9 * Math.sin(a)).toFixed(1)}" r="2.3"/>`; }).join('')}</g>`,
    osso: `<g transform="translate(50 62) rotate(-8)"><rect x="-11" y="-2.2" width="22" height="4.4" rx="2" fill="#fbf4e4" stroke="#d9cbb7" stroke-width=".8"/>${[-11, 11].map(x => `<circle cx="${x}" cy="-2.6" r="3" fill="#fbf4e4" stroke="#d9cbb7" stroke-width=".8"/><circle cx="${x}" cy="2.6" r="3" fill="#fbf4e4" stroke="#d9cbb7" stroke-width=".8"/>`).join('')}</g>`,
    tapaolho: `<path d="M27 38 L73 54" stroke="#26263a" stroke-width="1.8"/><ellipse cx="59" cy="48.5" rx="7" ry="6.2" fill="#26263a"/><path d="M57 46 L61 46" stroke="#fff" stroke-width="1" opacity=".5"/>`,
    medalha: `<path d="M40 68 L50 84 L60 68" fill="none" stroke="#36b6ff" stroke-width="4"/><circle cx="50" cy="86" r="6" fill="#ffc83d" stroke="#c99a12" stroke-width="1.4"/><path d="M50 82.5 l1.2 2.5 2.7.3-2 1.8.6 2.7-2.5-1.4-2.5 1.4.6-2.7-2-1.8 2.7-.3z" fill="#fff6c4"/>`,
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
const BASE = { tipo: 'pessoa', barba: 'nada', plumagem: 'sanhaco', pelagem: 'laranja', orelhas: 'medias', corAlien: 'verde', modeloAlien: 'antenas', corRobo: 'prata', modeloRobo: 'quadrado',  pele: 'p2', cabelo: 'curto', corCabelo: 'castanho', olhos: 'normal', boca: 'sorriso', roupa: 'camiseta', corRoupa: 'azul', chapeu: 'nada', acessorio: 'nada', fundo: 'lilas' };

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
const lenco = cor => cor === 'none' ? '' : `<path d="M33 73 L67 73 L50 91 Z" fill="${cor}"/><path d="M33 73 L67 73" stroke="rgba(0,0,0,.18)" stroke-width="2"/>`;
const AVES = {
  sanhaco: { cabeca: '#a9bfd0', corpo: '#9db4c6', asa: '#4f8fb8', barriga: '#c9d7e2' },
  maritaca: { cabeca: '#5bbd4a', corpo: '#4caf50', asa: '#2e8b3e', barriga: '#93d66e', anel: '#f3efe0' },
  sabia: { cabeca: '#8b7860', corpo: '#8b7860', asa: '#6e5c47', barriga: '#e08a3c', anel: '#f2c14e' },
};

const NO_PESCOCO = ['sininho', 'gravata', 'cachecol', 'perolas', 'medalha'];
const GATOS = {
  laranja: { base: '#f4a259', claro: '#fde3c4' },
  cinza: { base: '#a3a8b6', claro: '#e6e8ee' },
  preto: { base: '#2f2b3a', claro: '#4a4558', escuro: true },
  branco: { base: '#fbfaf7', claro: '#ffffff', borda: '#e4ddd2' },
  frajola: { base: '#2f2b3a', claro: '#fbfaf7', escuro: true, frajola: true },
  siames: { base: '#f3e6d2', claro: '#fbf3e6', orelha: '#5a4033', mascara: '#6f513f' },
  rajado: { base: '#c9a27a', claro: '#f1e2cf', listras: '#7d5b3d' },
  tricolor: { base: '#fbfaf7', claro: '#ffffff', borda: '#e4ddd2', manchas: true },
  rosa: { base: '#ffb3d1', claro: '#ffe3ef' },
  lilas: { base: '#c4b0ff', claro: '#ece5ff' },
  galaxia: { base: '#26305e', claro: '#3d4a8a', escuro: true, estrelas: true },
  dourado: { base: '#e8b923', claro: '#fff1b3', brilho: true },
};

function desenharGato(L, roupa) {
  const g = GATOS[L.pelagem] || GATOS.laranja;
  const ln = NO_PESCOCO.includes(L.acessorio) ? '' : lenco(roupa);
  const borda = g.borda ? ` stroke="${g.borda}" stroke-width="1.2"` : '';
  const orelhaE = g.manchas ? '#f0a050' : (g.orelha || g.base), orelhaD = g.manchas ? '#3a3340' : (g.orelha || g.base);
  return `<path d="M74 99 Q97 88 89 64" fill="none" stroke="${g.base}" stroke-width="7" stroke-linecap="round"/>
    <path d="M20 100 Q22 74 50 72 Q78 74 80 100Z" fill="${g.base}"${borda}/>
    <ellipse cx="50" cy="97" rx="13" ry="16" fill="${g.claro}"/>
    ${ln}
    <path d="M28 41 L26 11 L47 27Z" fill="${orelhaE}"${borda}/><path d="M72 41 L74 11 L53 27Z" fill="${orelhaD}"${borda}/>
    <path d="M31 34 L30 18 L42 27Z M69 34 L70 18 L58 27Z" fill="#ff9ac8"/>
    <ellipse cx="50" cy="47" rx="24" ry="22" fill="${g.base}"${borda}/>
    ${g.manchas ? `<path d="M29 33 Q39 26 46 33 Q41 45 29 43Z" fill="#f0a050"/><path d="M57 28 Q69 26 73 37 Q65 42 57 36Z" fill="#3a3340"/>` : ''}
    ${g.frajola ? `<path d="M50 33 Q44 45 37 55 Q50 72 63 55 Q56 45 50 33Z" fill="${g.claro}"/>` : ''}
    ${g.mascara ? `<ellipse cx="50" cy="55" rx="14" ry="11.5" fill="${g.mascara}" opacity=".85"/>` : ''}
    ${g.listras ? `<g stroke="${g.listras}" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M44 27 L45 34"/><path d="M50 26 L50 34"/><path d="M56 27 L55 34"/><path d="M27 47 L33 48.5"/><path d="M27 53 L33 52.5"/><path d="M73 47 L67 48.5"/><path d="M73 53 L67 52.5"/></g>` : ''}
    ${!g.frajola && !g.mascara ? `<ellipse cx="50" cy="57" rx="10.5" ry="7.5" fill="${g.claro}"/>` : ''}
    ${g.estrelas ? `<g fill="#fff">${[[36, 34, 1], [62, 30, 1.3], [44, 64, .8], [30, 88, 1.1], [66, 90, .9], [57, 80, .7], [70, 45, .8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g><path d="M38 80 l1 2.4 2.5.3-1.9 1.6.6 2.5-2.2-1.3-2.2 1.3.6-2.5-1.9-1.6 2.5-.3z" fill="#ffd23f"/>` : ''}
    ${g.brilho ? `<g fill="#fff" opacity=".85"><path d="M34 30 l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/><path d="M68 84 l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/></g>` : ''}
    ${g.escuro ? `<circle cx="41" cy="48" r="6" fill="#ffe27a"/><circle cx="59" cy="48" r="6" fill="#ffe27a"/>` : ''}`;
}

// orelhas da Maltesinha: presas um pouco acima do meio da cabeça; o tamanho muda o comprimento
const COMPR_ORELHA = { curtas: 30, medias: 46, compridas: 56, super: 68, gigantes: 84 };
function orelhasMaltes(tam, c, sombra) {
  const y0 = 28, L = COMPR_ORELHA[tam] || 46, yb = y0 + L, larg = 6 + L * 0.1;
  const lado = (x, d) => `<path d="M${x} ${y0} Q${x - d * (larg + 6)} ${y0 + 5} ${x - d * larg} ${y0 + L * 0.5} Q${x - d * larg} ${yb - 4} ${x - d * 1} ${yb} Q${x + d * 8} ${yb - 9} ${x + d * 5} ${y0 + L * 0.5} Q${x + d * 4} ${y0 + 9} ${x} ${y0}Z" fill="${c}" stroke="${sombra}" stroke-width="1.4"/>
    <path d="M${x - d * (larg - 4)} ${y0 + L * 0.35} Q${x - d * (larg - 2)} ${y0 + L * 0.6} ${x - d * (larg - 5)} ${y0 + L * 0.85}" fill="none" stroke="${sombra}" stroke-width="1.2" stroke-linecap="round"/>`;
  return lado(31, 1) + lado(69, -1);
}

function desenharMaltes(L, roupa) {
  const c = '#fbf8f2', sombra = '#e6dccd';
  const ln = NO_PESCOCO.includes(L.acessorio) ? '' : lenco(roupa);
  return `<path d="M15 100 Q17 71 50 69 Q83 71 85 100Z" fill="${c}" stroke="${sombra}" stroke-width="1.2"/>
    <g fill="${c}">${[[22, 84], [30, 76], [70, 76], [78, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/>`).join('')}</g>
    ${ln}
    <g fill="${c}" stroke="${sombra}" stroke-width="1.2">${[[36, 27], [50, 22], [64, 27]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`).join('')}</g>
    <circle cx="50" cy="47" r="23" fill="${c}"/>
    <g fill="${c}">${[[36, 27], [50, 23], [64, 27]].map(([x, y]) => `<circle cx="${x}" cy="${y + 2}" r="8"/>`).join('')}</g>
    ${orelhasMaltes(L.orelhas, c, sombra)}
    ${L.chapeu === 'nada' ? `<path d="M46 25 Q48 11 50 9 Q52 11 54 25Z" fill="${c}" stroke="${sombra}" stroke-width="1"/><g transform="translate(50 19)"><path d="M0 0 L-8 -5 L-8 5Z M0 0 L8 -5 L8 5Z" fill="#ff7eb6"/><circle r="2.4" fill="#ff5fa2"/></g>` : ''}`;
}

// ---------- alien ----------
const ALIEN_CLARO = { verde: '#c3f5a8', azul: '#bfe4ff', roxo: '#dccbff', rosa: '#ffd0e8', laranja: '#ffd6a8', prata: '#eef1f6', neon: '#b6ffc8', galaxia: '#4b4fa0', dourado: '#fff1b3' };
function desenharAlien(L, roupa) {
  const c = (CATALOGO.corAlien.find(x => x.id === L.corAlien) || CATALOGO.corAlien[0]).cor, claro = ALIEN_CLARO[L.corAlien] || '#c3f5a8';
  const m = L.modeloAlien;
  const olhoA = (x, rot) => `<ellipse cx="${x}" cy="48" rx="7.5" ry="5" transform="rotate(${rot} ${x} 48)" fill="#151026"/><circle cx="${x - 2}" cy="46.3" r="1.6" fill="#fff"/>`;
  let cabeca = `<path d="M50 22 C73 22 77 40 73 54 C69 66 58 71 50 71 C42 71 31 66 27 54 C23 40 27 22 50 22Z" fill="${c}"/>`;
  let atras = '', olhos = olhoA(40, 20) + olhoA(60, -20), extra = '';
  if (m === 'antenas') atras = `<g stroke="${c}" stroke-width="2.6" stroke-linecap="round"><path d="M41 25 L33 9"/><path d="M59 25 L67 9"/></g><circle cx="33" cy="8" r="4" fill="${claro}"/><circle cx="67" cy="8" r="4" fill="${claro}"/>`;
  if (m === 'tresolhos') extra = `<ellipse cx="50" cy="35" rx="5" ry="4.2" fill="#151026"/><circle cx="48.6" cy="33.8" r="1.3" fill="#fff"/>`;
  if (m === 'orelhudo') atras = `<path d="M31 42 L5 30 L30 56Z M69 42 L95 30 L70 56Z" fill="${c}"/><path d="M28 44 L13 36 L28 51Z M72 44 L87 36 L72 51Z" fill="${claro}"/>`;
  if (m === 'cabecudo') {
    cabeca = `<path d="M50 12 C82 12 84 42 74 56 C68 66 58 71 50 71 C42 71 32 66 26 56 C16 42 18 12 50 12Z" fill="${c}"/>`;
    extra = `<g fill="none" stroke="${claro}" stroke-width="1.6" stroke-linecap="round" opacity=".9"><path d="M36 22 Q40 18 44 22 Q48 26 52 21"/><path d="M56 19 Q60 15 64 20"/><path d="M30 32 Q34 28 38 32"/><path d="M60 29 Q65 25 70 30"/></g>`;
  }
  if (m === 'tentaculos') atras = `<g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"><path d="M38 26 Q30 14 36 8 Q42 4 40 12"/><path d="M50 23 Q50 10 56 6"/><path d="M62 26 Q72 16 66 9 Q60 5 63 13"/></g><g fill="${claro}"><circle cx="40" cy="12" r="2"/><circle cx="56" cy="6" r="2"/><circle cx="63" cy="13" r="2"/></g>`;
  if (m === 'ciclope') olhos = `<circle cx="50" cy="45" r="11" fill="#fff"/><circle cx="51" cy="46" r="6" fill="#151026"/><circle cx="48.6" cy="43.6" r="2" fill="#fff"/>`;
  const estrelas = L.corAlien === 'galaxia' ? `<g fill="#fff">${[[36, 30, .9], [64, 28, 1.1], [32, 58, .8], [70, 56, .9], [56, 64, .7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>` : '';
  const brilho = L.corAlien === 'neon' ? ` style="filter: drop-shadow(0 0 3px #4dff7a)"` : '';
  return `<path d="M20 100 Q22 76 50 74 Q78 76 80 100Z" fill="${roupa}"/>
    <path d="M33 76 Q50 84 67 76" fill="none" stroke="#e8edf6" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="50" cy="90" r="5" fill="#e8edf6"/><circle cx="50" cy="90" r="2.6" fill="${claro}"/>
    <rect x="44" y="62" width="12" height="14" rx="4" fill="${c}"/>
    <g${brilho}>${atras}${cabeca}</g>${estrelas}${extra}${olhos}`;
}

// ---------- robô ----------
const escurecer = (hex, f = 0.72) => '#' + [1, 3, 5].map(i => Math.round(parseInt(hex.slice(i, i + 2), 16) * f).toString(16).padStart(2, '0')).join('');
function desenharRobo(L, roupa) {
  const c = (CATALOGO.corRobo.find(x => x.id === L.corRobo) || CATALOGO.corRobo[0]).cor, sombra = escurecer(c);
  const luz = roupa, tela = '#1d2433', m = L.modeloRobo;
  const olhoLuz = (x, y = 47, r = 5) => `<circle cx="${x}" cy="${y}" r="${r + 1.6}" fill="${tela}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${luz}"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.3}" fill="#fff"/>`;
  const grade = (y = 58) => `<rect x="41" y="${y}" width="18" height="6" rx="2" fill="${tela}"/><g stroke="${sombra}" stroke-width="1.2">${[45, 48.5, 52, 55.5].map(x => `<path d="M${x} ${y + 1} V${y + 5}"/>`).join('')}</g>`;
  const antena = (y = 25) => `<path d="M50 ${y} V12" stroke="${sombra}" stroke-width="2.4"/><circle cx="50" cy="10" r="4" fill="${luz}"/><circle cx="48.8" cy="8.8" r="1.2" fill="#fff"/>`;
  let cabeca = '';
  if (m === 'redondo') cabeca = antena(24) + `<circle cx="50" cy="46" r="23" fill="${c}" stroke="${sombra}" stroke-width="1.5"/><path d="M33 34 Q40 27 49 26" stroke="#fff" stroke-width="2.4" fill="none" opacity=".5" stroke-linecap="round"/>` + olhoLuz(41) + olhoLuz(59) + `<path d="M43 58 Q50 63 57 58" stroke="${tela}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  else if (m === 'tv') cabeca = `<path d="M44 26 L34 10 M56 26 L66 10" stroke="${sombra}" stroke-width="2.2" stroke-linecap="round"/><circle cx="34" cy="10" r="2.6" fill="${luz}"/><circle cx="66" cy="10" r="2.6" fill="${luz}"/>
      <rect x="25" y="25" width="50" height="42" rx="7" fill="${c}" stroke="${sombra}" stroke-width="1.5"/><rect x="30" y="30" width="40" height="31" rx="6" fill="${tela}"/>
      <g fill="none" stroke="${luz}" stroke-width="2.6" stroke-linecap="round"><path d="M36 46 L41 41 L46 46"/><path d="M54 46 L59 41 L64 46"/><path d="M43 52 Q50 58 57 52"/></g>
      <circle cx="68" cy="64" r="1.6" fill="${luz}"/><circle cx="63" cy="64" r="1.6" fill="${sombra}"/>`;
  else if (m === 'antigo') cabeca = antena(26) + `<rect x="21" y="38" width="7" height="16" rx="2" fill="${sombra}"/><rect x="72" y="38" width="7" height="16" rx="2" fill="${sombra}"/>
      <rect x="27" y="26" width="46" height="40" rx="3" fill="${c}" stroke="${sombra}" stroke-width="1.5"/>
      <g fill="${sombra}">${[[31, 30], [69, 30], [31, 62], [69, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6"/>`).join('')}</g>
      <circle cx="41" cy="45" r="7" fill="#f6f1e2" stroke="${sombra}" stroke-width="1.5"/><circle cx="59" cy="45" r="7" fill="#f6f1e2" stroke="${sombra}" stroke-width="1.5"/>
      <path d="M41 45 L44 41 M59 45 L56 42" stroke="${tela}" stroke-width="1.6" stroke-linecap="round"/><circle cx="41" cy="45" r="1.4" fill="${luz}"/><circle cx="59" cy="45" r="1.4" fill="${luz}"/>` + grade(56);
  else if (m === 'visor') cabeca = `<rect x="27" y="24" width="46" height="43" rx="16" fill="${c}" stroke="${sombra}" stroke-width="1.5"/><rect x="30" y="40" width="40" height="12" rx="6" fill="${tela}"/>
      <rect x="34" y="44" width="32" height="4" rx="2" fill="${luz}" opacity=".95"/><rect x="34" y="44" width="10" height="4" rx="2" fill="#fff" opacity=".7"/>
      <path d="M44 59 H56" stroke="${sombra}" stroke-width="2.4" stroke-linecap="round"/><path d="M27 32 L20 28 M73 32 L80 28" stroke="${sombra}" stroke-width="2.4" stroke-linecap="round"/>`;
  else if (m === 'urso') cabeca = `<circle cx="31" cy="27" r="8" fill="${c}" stroke="${sombra}" stroke-width="1.5"/><circle cx="69" cy="27" r="8" fill="${c}" stroke="${sombra}" stroke-width="1.5"/>
      <circle cx="31" cy="27" r="4" fill="${luz}"/><circle cx="69" cy="27" r="4" fill="${luz}"/>
      <circle cx="50" cy="47" r="23" fill="${c}" stroke="${sombra}" stroke-width="1.5"/><ellipse cx="50" cy="57" rx="10" ry="7.5" fill="${escurecer(c, 0.86)}"/>` + olhoLuz(41, 45, 4.4) + olhoLuz(59, 45, 4.4) + `<ellipse cx="50" cy="54" rx="3.4" ry="2.4" fill="${tela}"/><path d="M46 59 Q50 62 54 59" stroke="${tela}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  else cabeca = antena(25) + `<rect x="27" y="25" width="46" height="42" rx="8" fill="${c}" stroke="${sombra}" stroke-width="1.5"/><rect x="31" y="29" width="14" height="4" rx="2" fill="#fff" opacity=".45"/>` + olhoLuz(41) + olhoLuz(59) + grade(57);
  return `<rect x="22" y="74" width="56" height="32" rx="8" fill="${c}" stroke="${sombra}" stroke-width="1.5"/>
    <rect x="37" y="80" width="26" height="13" rx="3" fill="${tela}"/>
    <circle cx="43" cy="86.5" r="2.4" fill="${luz}"/><circle cx="50" cy="86.5" r="2.4" fill="#ffd23f"/><circle cx="57" cy="86.5" r="2.4" fill="#2fd47a"/>
    <rect x="44" y="64" width="12" height="12" fill="${sombra}"/><path d="M44 68 H56 M44 72 H56" stroke="${c}" stroke-width="1.2"/>
    ${cabeca}`;
}

function desenharBicho(L, roupa) {
  const tipo = L.tipo === 'passaro' ? L.plumagem : L.tipo;
  if (tipo === 'alien') return desenharAlien(L, roupa);
  if (tipo === 'robo') return desenharRobo(L, roupa);
  if (tipo === 'gato') return desenharGato(L, roupa);
  if (tipo === 'maltes') return desenharMaltes(L, roupa);
  if (NO_PESCOCO.includes(L.acessorio)) roupa = 'none';
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

function focinho(L) {
  const tipo = L.tipo === 'passaro' ? L.plumagem : L.tipo;
  if (tipo === 'gato') {
    const g = GATOS[L.pelagem] || GATOS.laranja, linha = g.escuro && !g.frajola ? '#ece6f7' : ESC;
    return `<path d="M47.3 52.6 L52.7 52.6 L50 55.8Z" fill="#ff8fb1"/>
      <path d="M45.5 57.6 Q48 60.2 50 56.6 Q52 60.2 54.5 57.6" fill="none" stroke="${linha}" stroke-width="1.5" stroke-linecap="round"/>
      <g stroke="${linha}" stroke-width="1" stroke-linecap="round" opacity=".7"><path d="M39 55 L23 51.5"/><path d="M39 57.5 L23 59"/><path d="M61 55 L77 51.5"/><path d="M61 57.5 L77 59"/></g>`;
  }
  if (tipo === 'robo') return '';
  if (tipo === 'alien') return `<path d="M44.5 59 Q50 63.5 55.5 59" fill="none" stroke="${L.corAlien === 'galaxia' ? '#e9e4f5' : '#151026'}" stroke-width="2" stroke-linecap="round"/>`;
  if (tipo === 'maltes') return `<ellipse cx="50" cy="57" rx="10.5" ry="8" fill="#fffefb"/><ellipse cx="50" cy="53.4" rx="4" ry="3" fill="#1e1a26"/>
    <path d="M45.8 58.6 Q48 61.4 50 58.6 Q52 61.4 54.2 58.6" fill="none" stroke="${ESC}" stroke-width="1.5" stroke-linecap="round"/><path d="M48.5 60.4 Q50 65 51.5 60.4Z" fill="#ff7e9e"/>`;
  if (tipo === 'caramelo') return `<ellipse cx="50" cy="58" rx="11.5" ry="8.5" fill="#f6d7a7"/><ellipse cx="50" cy="53.5" rx="4.4" ry="3.2" fill="${ESC}"/>
    <path d="M45.5 59 Q48 62 50 59 Q52 62 54.5 59" fill="none" stroke="${ESC}" stroke-width="1.6" stroke-linecap="round"/><path d="M48.3 61 Q50 66.5 51.7 61Z" fill="#ff6f8e"/>`;
  if (tipo === 'morcego') return `<path d="M47.5 53 Q50 55.5 52.5 53" fill="none" stroke="${ESC}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M43 58 Q50 63.5 57 58" fill="none" stroke="${ESC}" stroke-width="2" stroke-linecap="round"/><path d="M45.6 59.6 L47.2 63.4 L48.6 60.6Z M51.4 60.6 L52.8 63.4 L54.4 59.6Z" fill="#fff"/>`;
  if (tipo === 'maritaca') return `<path d="M43.5 53 Q50 49.5 56.5 53 Q56 61.5 50 65 Q48.5 59 43.5 53Z" fill="#efe2c4" stroke="#b9a77f" stroke-width="1"/>`;
  if (tipo === 'sabia') return `<path d="M45 54 L55 54 L50 63.5Z" fill="#e8b730"/><path d="M45 54 L55 54" stroke="#b8860b" stroke-width="1"/>`;
  return `<path d="M45 54 L55 54 L50 62.5Z" fill="#5d6670"/>`;
}

// ---------- fundos com desenho ----------
const pata = (x, y, esc, rot, cor) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${esc})" fill="${cor}"><ellipse cx="0" cy="3" rx="4" ry="3.4"/><circle cx="-4.2" cy="-2.4" r="1.7"/><circle cx="-1.4" cy="-4.8" r="1.7"/><circle cx="1.4" cy="-4.8" r="1.7"/><circle cx="4.2" cy="-2.4" r="1.7"/></g>`;
const coracao = (x, y, e, cor) => `<path transform="translate(${x} ${y}) scale(${e})" d="M0 7 C-12 -1 -7 -10 0 -4 C7 -10 12 -1 0 7Z" fill="${cor}"/>`;
function padraoFundo(id) {
  switch (id) {
    case 'patinhas': return [[18, 22, .9, -20], [80, 18, .8, 25], [12, 58, .8, 10], [88, 55, .9, -15], [30, 8, .6, 30], [70, 6, .6, -30]].map(([x, y, e, r]) => pata(x, y, e, r, '#ffb3d1')).join('');
    case 'bolinhas': return `<g fill="#fff" opacity=".85">${[[12, 15], [30, 6], [50, 12], [70, 6], [88, 16], [8, 40], [92, 40], [20, 30], [80, 30], [6, 65], [94, 65]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g>`;
    case 'nuvens': return `<g fill="#fff">${[[20, 22], [78, 14], [86, 52], [10, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/><circle cx="${x + 7}" cy="${y - 3}" r="7"/><circle cx="${x + 14}" cy="${y}" r="5.5"/><rect x="${x}" y="${y}" width="14" height="5.5"/>`).join('')}</g>`;
    case 'listras': return `<g stroke="#ffd36b" stroke-width="7">${[-40, -20, 0, 20, 40, 60, 80, 100, 120].map(x => `<path d="M${x} 0 L${x + 60} 100"/>`).join('')}</g>`;
    case 'coracoes': return [[16, 20, .9], [82, 16, .8], [10, 52, .7], [90, 50, .9], [36, 6, .55], [64, 6, .6]].map(([x, y, e]) => coracao(x, y, e, '#ff8fb1')).join('');
    case 'pordosol': return `<rect width="100" height="100" fill="#ffb27a"/><rect y="0" width="100" height="34" fill="#ff8fa3"/><rect y="34" width="100" height="18" fill="#ffa07a"/><circle cx="50" cy="66" r="26" fill="#ffd56b" opacity=".85"/>`;
    case 'estrelado': return `<g fill="#fff">${[[12, 18, 1.2], [26, 8, .8], [44, 14, 1], [62, 6, 1.3], [80, 14, .9], [90, 30, 1.1], [8, 40, .9], [92, 52, .8], [16, 62, 1], [86, 70, 1.2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g><path d="M74 26 a7 7 0 1 0 6 -9 a5.5 5.5 0 1 1 -6 9z" fill="#ffe27a"/>`;
    case 'arcoiris': return `<g fill="none" stroke-width="6">${['#ff5fa2', '#ff9f43', '#ffd23f', '#2fd47a', '#36b6ff', '#8f6bff'].map((c, i) => `<circle cx="50" cy="70" r="${54 - i * 6}" stroke="${c}"/>`).join('')}</g>`;
    case 'confete': return [[12, 20, '#ff5fa2', 20], [26, 8, '#36b6ff', -30], [44, 14, '#ffd23f', 45], [64, 8, '#2fd47a', 10], [82, 18, '#8f6bff', -20], [90, 40, '#ff9f43', 60], [8, 44, '#2fd47a', -50], [14, 66, '#ffd23f', 30], [88, 64, '#ff5fa2', -10]].map(([x, y, c, r]) => `<rect x="${x}" y="${y}" width="6" height="3" rx="1" fill="${c}" transform="rotate(${r} ${x + 3} ${y + 1.5})"/>`).join('');
    default: return '';
  }
}

// texto da frase de vitória
export function textoFrase(id) { return (CATALOGO.frase.find(f => f.id === id) || CATALOGO.frase[0]).nome; }
// bonequinho comemorando (animação + balãozinho de fala)
export function comemoracaoHTML(look = {}, tam = 150, comBalao = true) {
  const c = CATALOGO.comemora.some(x => x.id === look.comemora) ? look.comemora : 'pulinho';
  return `<div class="comemora c-${c}">${avatarSVG(look, tam)}${comBalao ? `<span class="balao-fala">${textoFrase(look.frase)}</span>` : ''}</div>`;
}
