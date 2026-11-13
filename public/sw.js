// Service worker: deixa o jogo abrir sem internet (treino sozinho) e carregar mais rápido.
// Código do jogo: tenta a rede primeiro (sempre a versão nova) e usa a cópia guardada se cair.
// Dicionário, imagens e fontes: usa a cópia guardada e atualiza por trás.
const CACHE = 'forma-palavras-v1';
const BASICO = ['./', 'index.html', 'style.css', 'manifest.json', 'palavras.txt', 'palavroes.txt',
  'js/main.js', 'js/net.js', 'js/dict.js', 'js/board.js', 'js/avatar.js', 'js/recap.js',
  'js/efeitos.js', 'js/audio.js', 'js/config.js', 'icone-192.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASICO)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const guardar = async (req, res) => {
  if (res && (res.ok || res.type === 'opaque')) (await caches.open(CACHE)).put(req, res.clone());
  return res;
};

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonte = url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonte) return; // Firebase e o resto: direto pela rede
  const lento = fonte || /\.(txt|png|jpg)$/.test(url.pathname);
  if (lento) {
    e.respondWith(caches.match(req, { ignoreSearch: !fonte }).then(c => {
      const rede = fetch(req).then(r => guardar(req, r)).catch(() => c || Response.error());
      return c || rede;
    }));
  } else {
    e.respondWith(fetch(req).then(r => guardar(req, r))
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then(c => c || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()))));
  }
});
