import { loadDict, dictReady, lookup, pontos, gerarGrade, resolver, exibir, raridade, semAcento } from './dict.js';
import { criarTabuleiro } from './board.js';
import { avatarSVG, CATALOGO, PARTES, PARTES_BICHO, ehBicho, CONQUISTAS, lookPadrao, liberado, nivelDe, faixaNivel, itensNovos } from './avatar.js';
import { montarRecap, passoEm } from './recap.js';
import * as som from './audio.js';
import * as net from './net.js';

const $ = id => document.getElementById(id);
const DURACAO = Number(new URLSearchParams(location.search).get('tempo')) || 180;
const GRACA_RECAP = 2500; // espera as últimas palavras chegarem antes de recapitular

// ---------- estado da partida ----------
const S = {
  modo: null,            // 'solo' | 'online'
  code: null, meta: null, players: {}, sairSala: null,
  round: -1, grid: '', startAt: 0, dur: DURACAO, family: false,
  achadas: new Map(),    // plain -> pontos base
  score: 0, fase: 'inicio', // inicio | sala | contagem | jogando | espera | recap | fim
  ultimaContagem: null,
  recap: null, recapIni: 0, ctlSolo: {}, passoAtual: -1, ganhos: null,
};
const agora = () => (S.modo === 'online' ? net.agora() : Date.now());

// ---------- utilidades de tela ----------
function mostrar(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.toggle('ativa', t.id === id));
  window.scrollTo(0, 0);
}
let toastT;
function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2400);
}
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function erroInicio(msg) { $('erroInicio').textContent = msg || ''; }

async function garantirDicionario() {
  if (dictReady()) return;
  $('carregando').hidden = false;
  try { await loadDict(); } finally { $('carregando').hidden = true; }
}

function confete(qtd = 120) {
  const el = $('confete'), cores = ['#ff5fa2', '#ffd23f', '#2fd47a', '#36b6ff', '#8f6bff', '#ff9f43'];
  for (let i = 0; i < qtd; i++) {
    const c = document.createElement('i');
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = cores[i % cores.length];
    c.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    c.style.setProperty('--r', (Math.random() * 900 - 450) + 'deg');
    c.style.animationDuration = (2.2 + Math.random() * 2.2) + 's';
    c.style.animationDelay = (Math.random() * 0.8) + 's';
    el.appendChild(c);
    setTimeout(() => c.remove(), 5500);
  }
}

// ---------- som ----------
function atualizarBotoesSom() {
  $('btnMusica').classList.toggle('off', !som.isMusicOn());
  $('btnEfeitos').classList.toggle('off', !som.isSfxOn());
}
$('btnMusica').onclick = () => { som.unlockAudio(); som.setMusic(!som.isMusicOn()); som.startMusic(); atualizarBotoesSom(); };
$('btnEfeitos').onclick = () => { som.unlockAudio(); som.setSfx(!som.isSfxOn()); atualizarBotoesSom(); };
atualizarBotoesSom();
document.addEventListener('pointerdown', () => { som.unlockAudio(); som.startMusic(); }, { once: true });

// =====================================================================
// PERFIL (gamertag + boneco + XP)
// =====================================================================
const PK = 'cp_perfil2';
// no modo de teste local cada aba é uma pessoa diferente
const PS = net.modoLocal() ? sessionStorage : localStorage;
let P = { tag: '', look: lookPadrao(), xp: 0, games: 0, wins: 0, ach: {}, pagas: [] };
try { P = { ...P, ...JSON.parse(PS.getItem(PK) || '{}') }; } catch {}
const nivel = () => nivelDe(P.xp || 0);
function guardarLocal() { try { PS.setItem(PK, JSON.stringify(P)); } catch {} }
async function guardar() {
  guardarLocal();
  if (net.conectado()) await net.salvarPerfil({ tag: P.tag, look: P.look, xp: P.xp, games: P.games, wins: P.wins, ach: P.ach, pagas: P.pagas.slice(-30) }).catch(() => {});
}
const TAG_OK = /^[\p{L}\p{N}_]{3,14}$/u;

async function sincronizarPerfil() {
  if (!net.onlineDisponivel()) { desenharInicio(); return; }
  try {
    await net.conectar();
    const remoto = await net.lerPerfil();
    if (remoto && remoto.tag) {
      // fica com o que tiver mais progresso
      const local = P;
      P = { ...local, ...remoto, ach: { ...(local.ach || {}), ...(remoto.ach || {}) }, pagas: remoto.pagas || [] };
      if ((local.xp || 0) > (remoto.xp || 0) && !local.tag) P.xp = local.xp;
      guardarLocal();
    } else if (P.tag) {
      // perfil só neste aparelho: sobe pro servidor
      if (!(await net.reservarTag(P.tag))) { P.tag = ''; guardarLocal(); toast('Seu gamertag já tem dono, escolha outro 🙂'); }
      else await guardar();
    }
  } catch (e) {
    console.warn(e);
    $('contaLinha').textContent = '⚠️ Sem conexão com o servidor agora.';
  }
  desenharInicio();
}

// ---------- tema claro/escuro ----------
function aplicarTema(t) {
  document.documentElement.dataset.tema = t;
  $('btnTema').textContent = t === 'escuro' ? '☀️' : '🌙';
  $('btnTema').setAttribute('aria-label', t === 'escuro' ? 'Tema claro' : 'Tema escuro');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'escuro' ? '#1b1636' : '#6c5ce7');
}
let tema = 'claro';
try { tema = localStorage.getItem('cp_tema') || 'claro'; } catch {}
aplicarTema(tema);
$('btnTema').onclick = () => {
  tema = tema === 'escuro' ? 'claro' : 'escuro';
  try { localStorage.setItem('cp_tema', tema); } catch {}
  aplicarTema(tema); som.sfx('tile', 4);
};

function desenharInicio() {
  const temTag = !!P.tag;
  $('perfilResumo').hidden = !temTag;
  $('criarTag').hidden = temTag;
  if (temTag) {
    $('btnEditar').innerHTML = avatarSVG(P.look, 84);
    $('tagResumo').textContent = P.tag;
    const f = faixaNivel(P.xp || 0);
    $('nivelResumo').textContent = 'Nv ' + f.n;
    $('xpBarra').style.width = Math.round(f.frac * 100) + '%';
  }
  const conta = $('contaLinha');
  if (!net.onlineDisponivel()) conta.textContent = 'Seu progresso fica salvo neste aparelho.';
  else if (net.modoLocal()) conta.textContent = '🧪 Modo de teste local';
  else if (net.conectado()) {
    const g = net.contaGoogle();
    conta.innerHTML = g.google
      ? `✅ Progresso salvo na conta Google <b>${esc(g.email || '')}</b> <button id="btnSairGoogle" class="mini">Sair</button>`
      : `<button id="btnGoogle" class="botao-google"><b style="color:#4285f4">G</b> Entrar com Google</button><span>pra não perder seu boneco se trocar de celular</span>`;
    const bg = $('btnGoogle'), bs = $('btnSairGoogle');
    if (bg) bg.onclick = entrarGoogle;
    if (bs) bs.onclick = async () => { await net.sairGoogle(); P = { tag: '', look: lookPadrao(), xp: 0, games: 0, wins: 0, ach: {}, pagas: [] }; guardarLocal(); desenharInicio(); };
  }
}

async function entrarGoogle() {
  try {
    await net.loginGoogle();
    const remoto = await net.lerPerfil();
    if (remoto && remoto.tag) { P = { ...P, ...remoto }; guardarLocal(); toast('Bem-vindo de volta, ' + P.tag + '!'); }
    else { if (P.tag) await net.reservarTag(P.tag); await guardar(); toast('Pronto! Seu progresso fica salvo na conta Google'); }
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') toast('Não deu pra entrar: ' + (e.message || e));
  }
  desenharInicio();
}

async function definirTag(tag, antiga) {
  tag = (tag || '').trim();
  if (!TAG_OK.test(tag)) return 'Use de 3 a 14 letras, números ou _ (sem espaço)';
  if (net.onlineDisponivel()) {
    try { await net.conectar(); } catch { return 'Sem conexão para conferir o gamertag'; }
    if (!(await net.reservarTag(tag, antiga))) return 'Esse gamertag já tem dono 😬 Tenta outro';
  }
  P.tag = tag;
  return null;
}

$('btnSalvarTag').onclick = async () => {
  const b = $('btnSalvarTag'); b.disabled = true;
  const erro = await definirTag($('nome').value);
  b.disabled = false;
  if (erro) { erroInicio(erro); return; }
  erroInicio(); await guardar(); desenharInicio();
  som.sfx('good', 2);
  abrirEditor(); // já leva pra montar o boneco
};

// ---------- editor do boneco ----------
let rascunho = null, abaAtual = 'tipo';
function abrirEditor() {
  rascunho = { ...P.look };
  $('tagEdit').value = P.tag;
  const f = faixaNivel(P.xp || 0);
  $('nivelEditor').textContent = 'Nv ' + f.n;
  $('xpBarraEd').style.width = Math.round(f.frac * 100) + '%';
  $('xpTexto').textContent = `${P.xp || 0} XP · faltam ${f.fim - (P.xp || 0)} pro nível ${f.n + 1}`;
  $('erroPerfil').textContent = '';
  desenharEditor();
  mostrar('telaPerfil');
}
function desenharEditor() {
  $('previaGrande').innerHTML = avatarSVG(rascunho, 110);
  // bichinho não tem pele, cabelo, barba, boca nem roupa: mostra só o que vale pra ele
  const partes = ehBicho(rascunho) ? PARTES.filter(([k]) => PARTES_BICHO.includes(k)).map(([k, n]) => [k, k === 'corRoupa' ? 'Lencinho' : n]) : PARTES;
  if (!partes.some(([k]) => k === abaAtual)) abaAtual = 'tipo';
  $('abasPartes').innerHTML = partes.map(([k, nome]) => `<button class="aba ${k === abaAtual ? 'on' : ''}" data-k="${k}">${nome}</button>`).join('');
  const n = nivel();
  $('itensParte').innerHTML = CATALOGO[abaAtual].map(it => {
    const ok = liberado(it, n, P.ach);
    const req = it.ach ? '🏅 Conquista' : `Nível ${it.lvl}`;
    return `<button class="item ${rascunho[abaAtual] === it.id ? 'on' : ''} ${ok ? '' : 'preso'}" data-id="${it.id}">
      ${ok ? '' : '<span class="cadeado">🔒</span>'}
      ${avatarSVG({ ...rascunho, [abaAtual]: it.id }, 64)}
      <span>${esc(it.nome)}</span>${ok ? '' : `<span class="req">${req}</span>`}
    </button>`;
  }).join('');
}
$('abasPartes').onclick = e => {
  const b = e.target.closest('.aba'); if (!b) return;
  abaAtual = b.dataset.k; desenharEditor(); som.sfx('tile', 2);
  b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
};
$('itensParte').onclick = e => {
  const b = e.target.closest('.item'); if (!b) return;
  const it = CATALOGO[abaAtual].find(x => x.id === b.dataset.id);
  if (!liberado(it, nivel(), P.ach)) {
    som.sfx('bad');
    toast(it.ach ? `🔒 ${it.nome}: ${CONQUISTAS[it.ach]}` : `🔒 ${it.nome}: chegue ao nível ${it.lvl}`);
    return;
  }
  rascunho[abaAtual] = it.id; som.sfx('tile', 5); desenharEditor();
};
$('btnEditar').onclick = abrirEditor;
$('btnEditar2').onclick = abrirEditor;
$('btnVoltarPerfil').onclick = () => { mostrar('telaInicio'); };
$('btnSalvarPerfil').onclick = async () => {
  const b = $('btnSalvarPerfil'); b.disabled = true;
  const nova = $('tagEdit').value.trim();
  if (nova !== P.tag) {
    const erro = await definirTag(nova, P.tag);
    if (erro) { $('erroPerfil').textContent = erro; b.disabled = false; return; }
  }
  P.look = { ...rascunho };
  await guardar();
  b.disabled = false;
  som.sfx('good', 3);
  desenharInicio();
  mostrar('telaInicio');
};

// ---------- recompensas ----------
function darRecompensas(chave, pontosFinais, venceu, nJog, minhasPalavras, minhasExclusivas) {
  if (P.pagas.includes(chave)) return null;
  const antes = { nivel: nivel(), ach: { ...P.ach } };
  const ganho = pontosFinais + 10 + (venceu && nJog > 1 ? 25 : 0);
  P.xp = (P.xp || 0) + ganho;
  P.games = (P.games || 0) + 1;
  if (venceu && nJog > 1) { P.wins = (P.wins || 0) + 1; P.ach.vitoria = true; }
  if (minhasPalavras.some(w => w.length >= 8)) P.ach.longa = true;
  if (nJog > 1 && minhasExclusivas >= 10) P.ach.exclusivas = true;
  if (P.games >= 30) P.ach.maratona = true;
  P.pagas = [...P.pagas, chave].slice(-30);
  guardar();
  const depois = { nivel: nivel(), ach: P.ach };
  return { ganho, subiu: depois.nivel > antes.nivel, nivel: depois.nivel, novos: itensNovos(antes, depois) };
}

// =====================================================================
// INÍCIO / SALAS
// =====================================================================
$('codigo').oninput = () => { $('codigo').value = $('codigo').value.toUpperCase().replace(/[^A-Z]/g, ''); };
const params = new URLSearchParams(location.search);
if (params.get('sala')) $('codigo').value = params.get('sala').toUpperCase().slice(0, 4);
if (!net.onlineDisponivel()) { $('blocoOnline').hidden = true; $('avisoOffline').hidden = false; }

function precisaTag() {
  if (P.tag) { erroInicio(); return false; }
  erroInicio('Crie seu gamertag primeiro 😉'); $('nome').focus(); return true;
}
const meuPublico = () => ({ name: P.tag, look: P.look, lvl: nivel() });

$('btnSolo').onclick = async () => {
  if (precisaTag()) return;
  S.modo = 'solo'; S.family = false; S.players = {};
  await garantirDicionario();
  novaRodadaSolo();
};
$('btnCriar').onclick = async () => {
  if (precisaTag()) return;
  const b = $('btnCriar'); b.disabled = true;
  try { await net.conectar(); await entrarNaSala(await net.criarSala()); }
  catch (e) { erroInicio('Não deu pra criar a sala: ' + (e.message || e)); }
  b.disabled = false;
};
$('btnEntrar').onclick = async () => {
  if (precisaTag()) return;
  const code = $('codigo').value.trim().toUpperCase();
  if (code.length !== 4) { erroInicio('O código tem 4 letras'); return; }
  const b = $('btnEntrar'); b.disabled = true;
  try {
    await net.conectar();
    if (!(await net.salaExiste(code))) erroInicio('Não achei essa sala 🤔');
    else await entrarNaSala(code);
  } catch (e) { erroInicio('Não deu pra entrar: ' + (e.message || e)); }
  b.disabled = false;
};

async function entrarNaSala(code) {
  S.modo = 'online'; S.code = code; S.round = -1; S.fase = 'sala';
  const q = new URLSearchParams(location.search); q.set('sala', code);
  history.replaceState(null, '', '?' + q);
  $('codigoSala').textContent = code;
  mostrar('telaSala');
  S.sairSala = await net.entrar(code, meuPublico(), aoMudarSala);
  som.sfx('join');
  loadDict().catch(() => {});
}

function voltarAoInicio() {
  if (S.sairSala) S.sairSala();
  Object.assign(S, { sairSala: null, modo: null, code: null, meta: null, players: {}, fase: 'inicio', round: -1, recap: null });
  tab.travar(true); som.setTempo(112);
  const q = new URLSearchParams(location.search); q.delete('sala');
  history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
  desenharInicio();
  mostrar('telaInicio');
}
$('btnSairSala').onclick = voltarAoInicio;
$('btnSairFim').onclick = voltarAoInicio;
let sairArmado = 0;
$('btnSairJogo').onclick = () => {
  // confirmação dentro da página (sem janelinha do navegador)
  if (Date.now() - sairArmado < 2500) { voltarAoInicio(); return; }
  sairArmado = Date.now(); toast('Toque em "Sair" de novo pra sair da partida');
};

const souHost = () => S.modo !== 'online' || (S.meta && S.meta.host === net.meuId());
const jogadoresDaRodada = () => Object.entries(S.players).filter(([, p]) => p.round === S.round).map(([id, p]) => ({ id, ...p }));

let assumindo = false;
function verificarHost() {
  // Se quem criou a sala saiu, o jogador online mais antigo vira o anfitrião.
  const m = S.meta; if (!m || assumindo) return;
  const host = S.players[m.host];
  if (host && host.online) return;
  const online = Object.entries(S.players).filter(([, p]) => p.online).sort((a, b) => (a[1].joined || 0) - (b[1].joined || 0));
  if (online.length && online[0][0] === net.meuId()) {
    assumindo = true;
    net.atualizarMeta(S.code, { host: net.meuId() }).catch(() => {}).finally(() => { assumindo = false; });
  }
}

let qtdAntes = 0;
function aoMudarSala(estado) {
  S.meta = estado.meta; S.players = estado.players;
  if (!S.meta) return;
  verificarHost();
  const m = S.meta;
  if (m.status === 'playing' && m.round !== S.round) {
    if (net.agora() < m.startAt + m.dur * 1000 - 5000) { iniciarRodada(m); return; }
    S.round = m.round; // chegou com a partida no fim: espera a próxima
  }
  if (m.status === 'lobby' && S.fase !== 'sala') { S.fase = 'sala'; mostrar('telaSala'); }
  if (S.fase === 'sala') desenharSala();
  if (S.fase === 'jogando' || S.fase === 'contagem') desenharPlacarVivo();
  if (S.fase === 'fim') desenharFim();
}

function desenharSala() {
  const lista = Object.entries(S.players).sort((a, b) => (a[1].joined || 0) - (b[1].joined || 0));
  $('listaJog').innerHTML = lista.map(([id, p]) => `
    <li class="${p.online ? '' : 'fora'}">
      ${avatarSVG(p.look, 44)}<span class="nome-jog">${esc(p.name)}</span><small class="nv">Nv ${p.lvl || 1}</small>
      ${id === S.meta.host ? '<span class="tag">👑 anfitrião</span>' : id === net.meuId() ? '<span class="tag">você</span>' : ''}
    </li>`).join('');
  const on = lista.filter(([, p]) => p.online).length;
  $('qtdJog').textContent = `(${on})`;
  if (on > qtdAntes && qtdAntes) som.sfx('join');
  qtdAntes = on;
  const host = souHost();
  $('chkFamilia').checked = !!S.meta.family;
  $('chkFamilia').disabled = !host;
  $('btnComecar').hidden = !host;
  $('esperando').hidden = host;
  $('opcoesHost').hidden = !host && !S.meta.family;
}
$('chkFamilia').onchange = () => { if (souHost()) net.atualizarMeta(S.code, { family: $('chkFamilia').checked }); };

$('btnCompartilhar').onclick = async () => {
  const url = location.origin + location.pathname + '?sala=' + S.code;
  const texto = `Bora jogar Forma Palavras! Sala ${S.code}`;
  try {
    if (!navigator.share) throw new Error('sem share');
    await navigator.share({ title: 'Forma Palavras', text: texto, url });
  } catch (e) {
    if (e && e.name === 'AbortError') return; // a pessoa cancelou
    try { await navigator.clipboard.writeText(url); toast('Link copiado! Manda pra galera 📲'); }
    catch { toast('Mande este link: ' + url); }
  }
};

async function comecarOnline() {
  if (!souHost()) return;
  await garantirDicionario();
  await net.atualizarMeta(S.code, {
    status: 'playing', grid: gerarGrade(Date.now()), round: (S.meta.round || 0) + 1,
    startAt: net.agora() + 4200, dur: DURACAO, family: !!S.meta.family, recap: null,
  });
}
$('btnComecar').onclick = comecarOnline;
$('btnDeNovo').onclick = () => (S.modo === 'online' ? comecarOnline() : novaRodadaSolo());

// =====================================================================
// PARTIDA
// =====================================================================
const tab = criarTabuleiro($('tabuleiro'), {
  onChange: txt => { if (txt) { limparBolha(); $('bolha').textContent = txt; } },
  onTile: n => som.sfx('tile', n),
  onSubmit: enviarPalavra,
});

let bolhaT;
function limparBolha() { clearTimeout(bolhaT); const b = $('bolha'); b.className = 'bolha'; b.textContent = ''; }
function bolha(texto, tipo) {
  const b = $('bolha'); clearTimeout(bolhaT);
  b.className = 'bolha'; void b.offsetWidth; b.className = 'bolha ' + tipo; b.textContent = texto;
  bolhaT = setTimeout(limparBolha, 900);
}

function novaRodadaSolo() {
  S.ctlSolo = {};
  iniciarRodada({ grid: gerarGrade(Date.now()), round: (S.round > 0 ? S.round : 0) + 1, startAt: Date.now() + 3600, dur: DURACAO, family: S.family });
}

async function iniciarRodada(m) {
  Object.assign(S, {
    round: m.round, grid: m.grid, startAt: m.startAt, dur: m.dur || DURACAO, family: !!m.family,
    achadas: new Map(), score: 0, fase: 'contagem', ultimaContagem: null, recap: null, passoAtual: -1, ganhos: null,
  });
  if (S.modo === 'online') net.atualizarEu(S.code, { ...meuPublico(), round: S.round, score: 0, count: 0, words: null, online: true }).catch(() => {});
  $('meusPontos').textContent = '0';
  $('achadas').innerHTML = ''; $('qtdAchadas').textContent = '0';
  limparBolha();
  tab.setGrid(S.grid); tab.travar(true); tab.embaralharVisual();
  $('contagem').hidden = false; $('contagem').textContent = '3';
  mostrar('telaJogo');
  desenharPlacarVivo();
  som.setTempo(112);
  pedirTelaAcesa();
  if (!dictReady()) await garantirDicionario();
}

// Dedo saiu da tela: confere a palavra
function enviarPalavra(letras, caminho) {
  if (S.fase !== 'jogando') return;
  if (letras.length < 3) { if (letras.length === 2) { bolha(letras, 'erro'); som.sfx('bad'); } return; }
  const plain = semAcento(letras.toLowerCase());
  const r = lookup(plain, S.family);
  if (!r) { bolha(letras, 'erro'); tab.piscar(caminho, 'erro'); som.sfx('bad'); return; }
  if (r.blocked) { bolha('🙈 ' + letras, 'erro'); tab.piscar(caminho, 'erro'); som.sfx('bad'); toast('No modo família essa não vale!'); return; }
  if (S.achadas.has(r.plain)) { bolha(r.word.toUpperCase() + ' já foi!', 'rep'); tab.piscar(caminho, 'rep'); som.sfx('repeat'); return; }
  const pts = pontos(r.plain.length);
  S.achadas.set(r.plain, pts); S.score += pts;
  bolha(`${r.word.toUpperCase()} +${pts}`, 'ok');
  tab.piscar(caminho, 'ok');
  som.sfx(r.plain.length >= 6 ? 'big' : 'good', r.plain.length - 3);
  if (navigator.vibrate) navigator.vibrate(r.plain.length >= 6 ? [20, 40, 30] : 15);
  $('meusPontos').textContent = S.score;
  $('qtdAchadas').textContent = S.achadas.size;
  const chip = document.createElement('span');
  chip.className = 'palavra'; chip.innerHTML = `${esc(r.word)}<sup>+${pts}</sup>`;
  $('achadas').prepend(chip);
  if (S.modo === 'online') net.marcarPalavra(S.code, r.plain, pts, S.score, S.achadas.size).catch(() => toast('Conexão fraca… tentando de novo'));
  desenharPlacarVivo();
}

function desenharPlacarVivo() {
  const el = $('placarVivo');
  if (S.modo !== 'online') { el.innerHTML = ''; return; }
  const js = jogadoresDaRodada().map(p => p.id === net.meuId() ? { ...p, count: S.achadas.size } : p)
    .sort((a, b) => (b.count || 0) - (a.count || 0));
  // Durante a partida só mostra QUANTAS palavras cada um achou: os pontos (com exclusivas em dobro) ficam pro final.
  el.innerHTML = js.map(p => `<span class="chip-jog ${p.id === net.meuId() ? 'eu' : ''}">
    ${avatarSVG(p.look, 28)}${esc(p.name)} <b>${p.count || 0}</b></span>`).join('');
}

// ---------- relógio ----------
function tique() {
  const t = agora();
  if (S.fase === 'contagem') {
    const falta = Math.ceil((S.startAt - t) / 1000);
    if (falta > 0) {
      if (falta !== S.ultimaContagem) {
        S.ultimaContagem = falta;
        const c = $('contagem'); c.textContent = Math.min(falta, 3); c.classList.remove('vai'); void c.offsetWidth; c.classList.add('vai');
        if (falta <= 3) som.sfx('count', 0);
      }
      return;
    }
    if (!dictReady()) return;
    S.fase = 'jogando';
    const c = $('contagem'); c.textContent = 'JÁ!'; som.sfx('count', 1);
    setTimeout(() => { c.hidden = true; }, 500);
    tab.travar(false);
  }
  if (S.fase === 'jogando') {
    const resta = Math.max(0, S.startAt + S.dur * 1000 - t);
    const seg = Math.ceil(resta / 1000);
    $('barraTempo').style.transform = `scaleX(${resta / (S.dur * 1000)})`;
    $('txtTempo').textContent = `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}`;
    const acabando = seg <= 10;
    $('barraTempo').parentElement.classList.toggle('acabando', acabando);
    if (seg <= 30) som.setTempo(seg <= 10 ? 140 : 126);
    if (acabando && seg !== S.ultimaContagem && seg > 0) { S.ultimaContagem = seg; som.sfx('tick'); }
    if (resta <= 0) acabouTempo();
  }
  if (S.fase === 'espera' && t >= S.recapIni) comecarRecap();
  if (S.fase === 'recap') rodarRecap(t);
}
// setInterval (e não requestAnimationFrame) pra continuar andando mesmo com a aba em segundo plano
setInterval(tique, 50);

function acabouTempo() {
  S.fase = 'espera';
  tab.travar(true);
  som.sfx('end'); som.setTempo(100);
  liberarTela();
  $('contagem').hidden = false; $('contagem').textContent = '⏰';
  S.recapIni = S.startAt + S.dur * 1000 + (S.modo === 'online' ? GRACA_RECAP : 1200);
  if (S.modo === 'online' && souHost()) net.atualizarMeta(S.code, { status: 'ended' }).catch(() => {});
}

// =====================================================================
// RECAPITULAÇÃO
// =====================================================================
function dadosDaRodada() {
  if (S.modo !== 'online') return [{ id: 'eu', name: P.tag, look: P.look, palavras: [...S.achadas.keys()] }];
  const js = jogadoresDaRodada().map(p => ({ id: p.id, name: p.name, look: p.look, palavras: Object.keys(p.words || {}) }));
  const eu = js.find(p => p.id === net.meuId());
  if (eu) eu.palavras = [...new Set([...eu.palavras, ...S.achadas.keys()])];
  else js.push({ id: net.meuId(), name: P.tag, look: P.look, palavras: [...S.achadas.keys()] });
  return js.sort((a, b) => a.id.localeCompare(b.id));
}

function comecarRecap() {
  const js = dadosDaRodada();
  S.recapJog = Object.fromEntries(js.map(j => [j.id, j]));
  S.recap = montarRecap(js);
  S.passoAtual = -1;
  S.fase = 'recap';
  // XP e desbloqueios
  const eu = S.modo === 'online' ? net.meuId() : 'eu';
  const chave = `${S.code || 'solo'}:${S.round}:${S.startAt}`;
  S.ganhos = darRecompensas(chave, S.recap.final[eu] || 0, S.recap.vencedores.includes(eu), js.length, S.recapJog[eu].palavras, S.recap.nExcl[eu] || 0);
  mostrar('telaRecap');
}

const ctlRecap = () => (S.modo === 'online' ? (S.meta && S.meta.recap) || {} : S.ctlSolo);
function tempoRecap(t) {
  const c = ctlRecap();
  return (c.pausa || t) - S.recapIni - (c.desloc || 0);
}

function rodarRecap(t) {
  const ms = tempoRecap(t);
  const c = ctlRecap();
  const host = souHost();
  $('btnPausa').textContent = c.pausa ? '▶ Continuar' : '⏸ Pausar';
  $('recapCtl').hidden = !host;
  $('btnPular').hidden = ms >= S.recap.inicioRanking;
  $('recapAviso').textContent = c.pausa && !host ? '⏸ Pausado pelo anfitrião' : '';
  if (ms >= S.recap.total) { irProFim(); return; }
  const i = passoEm(S.recap, ms);
  if (i !== S.passoAtual) { S.passoAtual = i; desenharPasso(S.recap.passos[i]); }
}

function cartaoJogador(id, tam = 56) {
  const j = S.recapJog[id] || {};
  return `<div>${avatarSVG(j.look, tam)}<span>${esc(j.name)}</span></div>`;
}

function desenharPasso(p) {
  const palco = $('recapPalco');
  $('recapSecao').textContent = p.t === 'titulo' ? '' : (p.secao || '');
  $('recapProg').textContent = p.t === 'palavra' ? `${p.n} de ${p.de}` : '';
  let html = '';
  if (p.t === 'titulo') {
    html = `<div class="rc titulo"><h2>${esc(p.h)}</h2>${p.p ? `<p>${esc(p.p)}</p>` : ''}</div>`;
    som.sfx(p.som || 'whoosh');
  } else if (p.t === 'palavra') {
    const nomes = p.quem.map(id => cartaoJogador(id, p.quem.length > 3 ? 44 : 56)).join('');
    html = `<div class="rc ${p.excl ? 'exclusiva' : ''}">
      ${p.excl ? '<span class="selo">⭐ EXCLUSIVA · VALE DOBRADO</span>' : ''}
      <div class="palavra-grande">${esc(exibir(p.w).toUpperCase())}</div>
      <span class="valor">+${p.pts}${p.excl ? ` <small>(${p.base}×2)</small>` : ''}</span>
      <div class="quem">${nomes}</div></div>`;
    som.sfx(p.excl ? 'brilho' : 'reveal', p.w.length - 3);
  } else if (p.t === 'rank') {
    html = `<div class="rc">
      <div class="lugar">${p.pos}º lugar</div>
      <div class="boneco-pula">${avatarSVG(S.recapJog[p.id].look, 120)}</div>
      <div class="nome-grande">${esc(S.recapJog[p.id].name)}</div>
      <div class="placar-grande">${p.score} pontos</div></div>`;
    som.sfx('count', p.pos === 2 ? 1 : 0);
  } else if (p.t === 'suspense') {
    html = `<div class="rc titulo suspense"><div class="tambor">🥁</div><h2>E quem venceu foi…</h2></div>`;
    som.sfx('rufar');
  } else if (p.t === 'campeao') {
    const nomes = p.ids.map(id => S.recapJog[id].name);
    const titulo = !p.varios ? 'Sua pontuação' : p.ids.length > 1 ? '🤝 EMPATE NO TOPO!' : '🏆 CAMPEÃO DA RODADA! 🏆';
    html = `<div class="rc campeao">
      <div class="lugar">${titulo}</div>
      <div class="quem">${p.ids.map(id => `<div class="boneco-pula">${avatarSVG(S.recapJog[id].look, p.ids.length > 1 ? 100 : 150)}</div>`).join('')}</div>
      <div class="nome-grande">${nomes.map(esc).join(' & ')}</div>
      <div class="placar-grande">${p.score} pontos</div></div>`;
    som.sfx('fanfarra'); confete(p.varios ? 160 : 90);
    if (navigator.vibrate) navigator.vibrate([60, 80, 60, 80, 200]);
  }
  palco.innerHTML = html;
}

$('btnPausa').onclick = () => {
  const t = agora(), c = { ...ctlRecap() };
  if (c.pausa) { c.desloc = (c.desloc || 0) + (t - c.pausa); c.pausa = null; } else c.pausa = t;
  if (S.modo === 'online') net.atualizarMeta(S.code, { recap: c }); else S.ctlSolo = c;
};
$('btnPular').onclick = () => {
  // pula direto pro ranking (e tira a pausa)
  const t = agora();
  const c = { pausa: null, desloc: (t - S.recapIni) - S.recap.inicioRanking };
  if (S.modo === 'online') net.atualizarMeta(S.code, { recap: c }); else S.ctlSolo = c;
};

function irProFim() {
  S.fase = 'fim';
  som.setTempo(112);
  desenharFim();
  mostrar('telaFim');
}

// =====================================================================
// RESULTADO FINAL
// =====================================================================
function desenharFim() {
  if (!S.recap) return;
  const R = S.recap, eu = S.modo === 'online' ? net.meuId() : 'eu';
  const js = Object.values(S.recapJog).map(j => ({ ...j, score: R.final[j.id] || 0 }))
    .sort((a, b) => b.score - a.score || b.palavras.length - a.palavras.length);
  const varios = js.length > 1;

  $('podio').innerHTML = js.slice(0, 3).map((p, i) => `
    <div class="degrau p${i + 1}">
      ${avatarSVG(p.look, 60)}
      <span class="nome">${['🥇', '🥈', '🥉'][i]} ${esc(p.name)}</span>
      <div class="bloco">${p.score}</div>
    </div>`).join('');

  const g = S.ganhos;
  if (g) {
    const f = faixaNivel(P.xp || 0);
    $('ganhos').hidden = false;
    $('ganhos').innerHTML = `<div class="xp-ganho">+${g.ganho} XP</div>
      <div class="nivel-linha"><span class="nivel">Nv ${f.n}</span><div class="xp"><div style="width:${Math.round(f.frac * 100)}%"></div></div></div>
      ${g.subiu ? `<div class="desbloqueio">🎉 Subiu pro nível ${g.nivel}!</div>` : ''}
      ${g.novos.length ? `<div>Desbloqueou: <b>${g.novos.map(esc).join(', ')}</b></div><button class="mini" id="btnVerBoneco">👕 Usar no meu boneco</button>` : ''}`;
    const bv = $('btnVerBoneco'); if (bv) bv.onclick = abrirEditor;
  } else $('ganhos').hidden = true;

  $('ranking').innerHTML = (varios ? '<p class="legenda">⭐ amarelo = exclusiva (só essa pessoa achou, vale o dobro)</p>' : '') + js.map((p, i) => {
    const ws = p.palavras.slice().sort((a, b) => b.length - a.length || a.localeCompare(b));
    return `<details ${p.id === eu ? 'open' : ''}>
      <summary><b>${i + 1}º</b>${avatarSVG(p.look, 34)}${esc(p.name)}
        <small>${ws.length} palavras</small><span class="pts">${p.score} pts</span></summary>
      <div class="achadas">${ws.map(w => {
        const ex = varios && R.quem.get(w).length === 1;
        return `<span class="palavra ${ex ? 'exclusiva' : ''}">${esc(exibir(w))}<sup>+${pontos(w.length) * (ex ? 2 : 1)}</sup></span>`;
      }).join('') || '<small>nenhuma 😅</small>'}</div>
    </details>`;
  }).join('');

  if (dictReady() && S.grid) {
    const todas = [...resolver(S.grid, S.family)].filter(w => !R.quem.has(w));
    todas.sort((a, b) => (raridade(a) < 60000 ? 0 : 1) - (raridade(b) < 60000 ? 0 : 1) || b.length - a.length || raridade(a) - raridade(b));
    $('escondidas').innerHTML = todas.slice(0, 18).map(w => `<span class="palavra">${esc(exibir(w))}<sup>+${pontos(w.length)}</sup></span>`).join('')
      || '<small>Vocês acharam tudo! 🤯</small>';
  }
  const podeRepetir = souHost();
  $('btnDeNovo').hidden = !podeRepetir;
  $('esperandoNovo').hidden = podeRepetir;
}

// ---------- tela acesa durante a partida ----------
let wake = null;
async function pedirTelaAcesa() { try { wake = await navigator.wakeLock?.request('screen'); } catch {} }
function liberarTela() { try { wake?.release(); } catch {} wake = null; }
document.addEventListener('visibilitychange', () => { if (!document.hidden && S.fase === 'jogando') pedirTelaAcesa(); });

// ---------- partida ----------
desenharInicio();
sincronizarPerfil();
loadDict().catch(() => {});
