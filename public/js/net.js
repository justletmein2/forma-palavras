// Conexão: Firebase Realtime Database (de verdade) ou um "banco local" de teste
// que simula várias pessoas usando abas do mesmo navegador (abra com ?local=1).
// Estrutura no banco:
//   cacapalavras/rooms/{CODIGO}/meta            estado da sala e da partida
//   cacapalavras/rooms/{CODIGO}/players/{uid}   cada jogador escreve só o seu
//   cacapalavras/profiles/{uid}                 perfil: gamertag, boneco, XP
//   cacapalavras/tags/{gamertag}                reserva do gamertag -> uid
import { firebaseConfig } from './config.js';

const V = '11.0.2';
const LOCAL = new URLSearchParams(location.search).has('local');
let B = null;          // backend
let uid = null, offset = 0;
let authInfo = { google: false, email: null, foto: null };

export function onlineDisponivel() { return LOCAL || !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.databaseURL); }
export const modoLocal = () => LOCAL;

// ---------- backend Firebase ----------
async function backendFirebase() {
  const [{ initializeApp }, A, D] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-database.js`),
  ]);
  const app = initializeApp(firebaseConfig, 'cacapalavras');
  const auth = A.getAuth(app);
  const db = D.getDatabase(app);
  await auth.authStateReady();
  if (!auth.currentUser) await A.signInAnonymously(auth);
  const lerAuth = () => {
    const u = auth.currentUser;
    const g = u.providerData.find(p => p.providerId === 'google.com');
    authInfo = { google: !!g, email: g?.email || null, foto: g?.photoURL || null };
    return u.uid;
  };
  D.onValue(D.ref(db, '.info/serverTimeOffset'), s => { offset = s.val() || 0; });
  const ref = p => D.ref(db, 'cacapalavras/' + p);
  return {
    uid: lerAuth(),
    get: async p => (await D.get(ref(p))).val(),
    set: (p, v) => D.set(ref(p), v),
    update: (p, v) => D.update(ref(p), v),
    remove: p => D.remove(ref(p)),
    on: (p, cb) => D.onValue(ref(p), s => cb(s.val())),
    aoSair: (p, v) => D.onDisconnect(ref(p)).update(v),
    async loginGoogle() {
      const prov = new A.GoogleAuthProvider();
      try {
        await A.linkWithPopup(auth.currentUser, prov); // guarda o progresso de quem já jogava
      } catch (e) {
        if (e.code !== 'auth/credential-already-in-use') throw e;
        // Essa conta Google já tem perfil: entra nela
        const cred = A.GoogleAuthProvider.credentialFromError(e);
        await A.signInWithCredential(auth, cred);
      }
      return lerAuth();
    },
    async sairGoogle() { await A.signOut(auth); await A.signInAnonymously(auth); return lerAuth(); },
  };
}

// ---------- backend local (teste) ----------
function backendLocal() {
  // Cada "pedaço" (meta da sala, cada jogador, cada perfil) fica numa chave própria do
  // localStorage, assim abas diferentes não apagam o que a outra escreveu.
  const PREF = 'cpdb:';
  const partes = p => p.split('/').filter(Boolean);
  const shard = ks => ks.slice(0, ks[0] === 'rooms' ? (ks[2] === 'players' ? 4 : 3) : 2).join('/');
  const ler = () => {
    const t = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k.startsWith(PREF)) continue;
      let v; try { v = JSON.parse(localStorage.getItem(k)); } catch { continue; }
      colocar(t, k.slice(PREF.length), v);
    }
    return t;
  };
  const pegar = (o, p) => partes(p).reduce((a, k) => (a == null ? null : a[k] ?? null), o);
  const limpar = o => {
    if (o && typeof o === 'object') { for (const k of Object.keys(o)) { o[k] = limpar(o[k]); if (o[k] == null) delete o[k]; } return Object.keys(o).length ? o : null; }
    return o;
  };
  function colocar(t, p, v) {
    const ks = partes(p); let o = t;
    for (const k of ks.slice(0, -1)) { if (typeof o[k] !== 'object' || o[k] == null) o[k] = {}; o = o[k]; }
    o[ks[ks.length - 1]] = v;
  }
  const ouvintes = [];
  const avisar = () => { const t = ler(); ouvintes.forEach(([p, cb]) => cb(structuredClone(pegar(t, p)))); };
  // escreve uma lista de [caminho completo, valor]
  const gravar = pares => {
    const porShard = new Map();
    for (const [p, v] of pares) {
      const ks = partes(p), sh = shard(ks);
      if (ks.length < sh.split('/').length) { // escreveu acima do pedaço: espalha
        if (v && typeof v === 'object') { for (const [k, x] of Object.entries(v)) gravar([[p + '/' + k, x]]); }
        else for (let i = localStorage.length - 1; i >= 0; i--) { const k = localStorage.key(i); if (k.startsWith(PREF + p + '/')) localStorage.removeItem(k); }
        continue;
      }
      if (!porShard.has(sh)) porShard.set(sh, []);
      porShard.get(sh).push([ks.slice(sh.split('/').length).join('/'), v]);
    }
    for (const [sh, ops] of porShard) {
      let atual; try { atual = JSON.parse(localStorage.getItem(PREF + sh)); } catch { atual = null; }
      const box = { v: atual };
      for (const [rel, v] of ops) { if (!rel) box.v = structuredClone(v); else { if (typeof box.v !== 'object' || box.v == null) box.v = {}; colocar(box.v, rel, structuredClone(v)); } }
      const fim = limpar(box.v);
      if (fim == null) localStorage.removeItem(PREF + sh); else localStorage.setItem(PREF + sh, JSON.stringify(fim));
    }
    avisar();
  };
  window.addEventListener('storage', e => { if (e.key && e.key.startsWith(PREF)) avisar(); });
  let id = sessionStorage.getItem('cp_local_uid');
  if (!id) { id = 'u' + Math.random().toString(36).slice(2, 9); sessionStorage.setItem('cp_local_uid', id); }
  const saidas = [];
  window.addEventListener('pagehide', () => saidas.forEach(([p, v]) => gravar(Object.entries(v).map(([k, x]) => [p + '/' + k, x]))));
  return {
    uid: id,
    get: async p => structuredClone(pegar(ler(), p)),
    set: async (p, v) => gravar([[p, v]]),
    update: async (p, v) => gravar(Object.entries(v).map(([k, x]) => [p + '/' + k, x])),
    remove: async p => gravar([[p, null]]),
    on: (p, cb) => { const o = [p, cb]; ouvintes.push(o); setTimeout(() => cb(structuredClone(pegar(ler(), p)))); return () => ouvintes.splice(ouvintes.indexOf(o), 1); },
    aoSair: (p, v) => saidas.push([p, v]),
    async loginGoogle() { throw new Error('Login com Google não funciona no modo de teste'); },
    async sairGoogle() { return id; },
  };
}

let conectando = null;
export function conectar() {
  if (!conectando) conectando = (async () => {
    B = LOCAL ? backendLocal() : await backendFirebase();
    uid = B.uid;
    return uid;
  })().catch(e => { conectando = null; throw e; });
  return conectando;
}

export const conectado = () => !!B;
export const agora = () => Date.now() + offset;
export const meuId = () => uid;
export const contaGoogle = () => authInfo;

// ---------- perfil ----------
export async function lerPerfil() { return (await B.get('profiles/' + uid)) || null; }
export function salvarPerfil(dados) { return B.update('profiles/' + uid, dados); }

const tagChave = t => t.toLowerCase();
export async function reservarTag(tag, antiga) {
  const k = tagChave(tag);
  const dono = await B.get('tags/' + k);
  if (dono && dono !== uid) return false;
  await B.set('tags/' + k, uid);
  if (antiga && tagChave(antiga) !== k) {
    const d = await B.get('tags/' + tagChave(antiga));
    if (d === uid) await B.remove('tags/' + tagChave(antiga)).catch(() => {});
  }
  return true;
}

export async function loginGoogle() { uid = await B.loginGoogle(); return uid; }
export async function sairGoogle() { uid = await B.sairGoogle(); return uid; }

// ---------- salas ----------
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const sala = c => 'rooms/' + c;

export async function criarSala() {
  for (let t = 0; t < 8; t++) {
    let code = '';
    for (let i = 0; i < 4; i++) code += CHARS[Math.floor(Math.random() * CHARS.length)];
    if (await B.get(sala(code) + '/meta')) continue;
    await B.set(sala(code) + '/meta', { host: uid, status: 'lobby', round: 0, family: false, created: agora() });
    return code;
  }
  throw new Error('Não consegui criar a sala, tente de novo');
}

export async function salaExiste(code) { return !!(await B.get(sala(code) + '/meta')); }

// Entra na sala e avisa toda mudança: cb({meta, players})
export async function entrar(code, perfil, cb) {
  const eu = `${sala(code)}/players/${uid}`;
  const meta = (await B.get(sala(code) + '/meta')) || {};
  const atual = await B.get(eu);
  const base = { ...perfil, online: true };
  if (!atual) base.joined = agora();
  if (!atual || atual.round !== meta.round) Object.assign(base, { round: meta.round || 0, score: 0, count: 0, words: null });
  await B.update(eu, base);
  B.aoSair(eu, { online: false });
  const estado = { meta: null, players: {} };
  const offs = [
    B.on(sala(code) + '/meta', v => { estado.meta = v; cb(estado); }),
    B.on(sala(code) + '/players', v => { estado.players = v || {}; cb(estado); }),
  ];
  return () => { offs.forEach(f => f && f()); B.update(eu, { online: false }); };
}

export const atualizarMeta = (code, dados) => B.update(sala(code) + '/meta', dados);
export const atualizarEu = (code, dados) => B.update(`${sala(code)}/players/${uid}`, dados);
export const marcarPalavra = (code, plain, pts, score, count) =>
  B.update(`${sala(code)}/players/${uid}`, { [`words/${plain}`]: pts, score, count });
