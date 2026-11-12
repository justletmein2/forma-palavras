// Música e efeitos feitos na hora com Web Audio (sem arquivos, sem direitos autorais).

let ctx = null, master = null, musicBus = null, sfxBus = null;
let musicOn = true, sfxOn = true;
let timer = null, nextTime = 0, step = 0, tempo = 112;

try {
  musicOn = localStorage.getItem('cp_music') !== '0';
  sfxOn = localStorage.getItem('cp_sfx') !== '0';
} catch { /* sem armazenamento */ }

export function unlockAudio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.gain.value = musicOn ? 0.32 : 0; musicBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = sfxOn ? 0.6 : 0; sfxBus.connect(master);
  }
  if (ctx.state === 'suspended') ctx.resume();
}

export function isMusicOn() { return musicOn; }
export function isSfxOn() { return sfxOn; }
export function setMusic(on) {
  musicOn = on;
  try { localStorage.setItem('cp_music', on ? '1' : '0'); } catch {}
  if (musicBus) musicBus.gain.setTargetAtTime(on ? 0.32 : 0, ctx.currentTime, 0.1);
}
export function setSfx(on) {
  sfxOn = on;
  try { localStorage.setItem('cp_sfx', on ? '1' : '0'); } catch {}
  if (sfxBus) sfxBus.gain.setTargetAtTime(on ? 0.6 : 0, ctx.currentTime, 0.05);
}

const hz = m => 440 * Math.pow(2, (m - 69) / 12);

function note(bus, midi, t, dur, { type = 'triangle', vol = 0.3, attack = 0.01, cutoff = 0, glide = 0 } = {}) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(hz(midi), t);
  if (glide) o.frequency.exponentialRampToValueAtTime(hz(midi + glide), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  let last = o;
  if (cutoff) {
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cutoff;
    o.connect(f); last = f;
  }
  last.connect(g); g.connect(bus);
  o.start(t); o.stop(t + dur + 0.05);
}

let noiseBuf = null;
function hat(t, vol = 0.05) {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = 7000;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  s.connect(f); f.connect(g); g.connect(musicBus); s.start(t);
}

// Progressão alegre: C  Am  F  G (8 passos de colcheia por acorde)
const CHORDS = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
const BASS = [36, 33, 29, 31];
// Melodia em pentatônica, 32 colcheias; -1 = pausa
const MELODY = [
  72, -1, 76, 79, 76, -1, 74, 72,
  72, -1, 69, 72, 74, -1, 72, -1,
  69, -1, 72, 74, 77, -1, 76, 74,
  74, -1, 71, 74, 79, 77, 76, 74,
  72, 74, 76, -1, 79, -1, 81, 79,
  76, -1, 72, -1, 74, 76, 72, -1,
  77, -1, 76, 74, 72, -1, 69, -1,
  71, -1, 74, -1, 79, -1, -1, -1,
];

function schedule() {
  const spb = 60 / tempo / 2; // colcheia
  while (nextTime < ctx.currentTime + 0.15) {
    const t = nextTime, s = step % 64, bar = Math.floor(s / 8) % 4;
    const ch = CHORDS[bar];
    if (s % 8 === 0) note(musicBus, BASS[bar], t, spb * 3.5, { type: 'triangle', vol: 0.45 });
    if (s % 8 === 4) note(musicBus, BASS[bar] + 7, t, spb * 1.8, { type: 'triangle', vol: 0.3 });
    if (s % 4 === 2) ch.forEach(m => note(musicBus, m, t, spb * 1.2, { type: 'sine', vol: 0.08 }));
    const m = MELODY[s];
    if (m > 0) note(musicBus, m, t, spb * 1.6, { type: 'square', vol: 0.05, cutoff: 2200 });
    if (s % 2 === 1) hat(t, 0.03);
    if (s % 8 === 0 || s % 8 === 6) hat(t, 0.05);
    nextTime += spb; step++;
  }
}

export function startMusic(bpm = 112) {
  unlockAudio(); if (!ctx) return;
  tempo = bpm;
  if (timer) return;
  nextTime = ctx.currentTime + 0.05; step = 0;
  timer = setInterval(schedule, 40);
}
export function setTempo(bpm) { tempo = bpm; }
export function stopMusic() { clearInterval(timer); timer = null; }

function ruido(t, dur, freq, vol, tipo = 'bandpass') {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noiseBuf; s.loop = true; f.type = tipo; f.frequency.value = freq;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f); f.connect(g); g.connect(sfxBus); s.start(t); s.stop(t + dur + 0.02);
}

// ---------- efeitos ----------
export function sfx(kind, n = 0) {
  if (!ctx || !sfxOn) return;
  const t = ctx.currentTime;
  switch (kind) {
    case 'tile': note(sfxBus, 72 + Math.min(n, 14) * 2, t, 0.09, { type: 'sine', vol: 0.25 }); break;
    case 'good': [72, 76, 79, 84].slice(0, 2 + Math.min(n, 2)).forEach((m, i) =>
      note(sfxBus, m, t + i * 0.07, 0.18, { type: 'triangle', vol: 0.3 })); break;
    case 'big': [72, 76, 79, 84, 88].forEach((m, i) =>
      note(sfxBus, m, t + i * 0.06, 0.22, { type: 'square', vol: 0.12, cutoff: 3500 })); break;
    case 'repeat': note(sfxBus, 67, t, 0.12, { type: 'sine', vol: 0.25 }); note(sfxBus, 64, t + 0.1, 0.16, { type: 'sine', vol: 0.25 }); break;
    case 'bad': note(sfxBus, 48, t, 0.22, { type: 'sawtooth', vol: 0.12, cutoff: 900, glide: -5 }); break;
    case 'tick': note(sfxBus, 84, t, 0.05, { type: 'square', vol: 0.06, cutoff: 3000 }); break;
    case 'count': note(sfxBus, n ? 79 : 72, t, n ? 0.4 : 0.15, { type: 'triangle', vol: 0.35 }); break;
    case 'end': [79, 76, 72, 79, 84].forEach((m, i) =>
      note(sfxBus, m, t + i * 0.12, 0.3, { type: 'triangle', vol: 0.3 })); break;
    case 'reveal': note(sfxBus, 67 + Math.min(n, 10) * 2, t, 0.12, { type: 'triangle', vol: 0.28 });
      note(sfxBus, 74 + Math.min(n, 10) * 2, t + 0.06, 0.16, { type: 'sine', vol: 0.2 }); break;
    case 'brilho': [84, 88, 91, 96, 91, 96].forEach((m, i) =>
      note(sfxBus, m, t + i * 0.05, 0.14, { type: 'sine', vol: 0.16 })); break;
    case 'whoosh': note(sfxBus, 55, t, 0.35, { type: 'sawtooth', vol: 0.06, cutoff: 1400, glide: 19 }); break;
    case 'rufar': for (let i = 0; i < 26; i++) note(sfxBus, 40 + (i % 2), t + i * 0.09, 0.08, { type: 'square', vol: 0.05 + i * 0.004, cutoff: 600 }); break;
    case 'fanfarra': {
      const seq = [[67, 0, .14], [67, .15, .14], [67, .3, .14], [72, .45, .5], [76, .95, .2], [74, 1.15, .2], [76, 1.35, .2], [79, 1.55, .9]];
      seq.forEach(([m, d, l]) => { note(sfxBus, m, t + d, l, { type: 'square', vol: 0.12, cutoff: 3200 }); note(sfxBus, m - 12, t + d, l, { type: 'triangle', vol: 0.2 }); });
      [60, 64, 67, 72].forEach(m => note(sfxBus, m, t + 1.55, 1.2, { type: 'sine', vol: 0.1 }));
      break;
    }
    case 'gelo': ruido(t, 0.07, 2600 + n * 250, 0.4, 'highpass'); note(sfxBus, 96 - n, t, 0.06, { type: 'sine', vol: 0.12 }); break;
    case 'quebra': ruido(t, 0.35, 4500, 0.45, 'highpass');
      for (let i = 0; i < 9; i++) note(sfxBus, 86 + Math.random() * 12, t + i * 0.03, 0.25, { type: 'triangle', vol: 0.1 }); break;
    case 'gosma': note(sfxBus, 38, t, 0.4, { type: 'sine', vol: 0.4, glide: 14 }); ruido(t, 0.3, 500, 0.25, 'lowpass'); break;
    case 'nhac': note(sfxBus, 45, t, 0.07, { type: 'square', vol: 0.18, cutoff: 600 }); ruido(t, 0.07, 1400, 0.35, 'bandpass');
      note(sfxBus, 43, t + 0.12, 0.06, { type: 'square', vol: 0.15, cutoff: 600 }); break;
    case 'latido': [0, 0.2].forEach(d => note(sfxBus, 64, t + d, 0.13, { type: 'sawtooth', vol: 0.16, cutoff: 1600, glide: -6 })); break;
    case 'morcegos': for (let i = 0; i < 22; i++) ruido(t + i * 0.045, 0.03, 2200 + Math.random() * 1200, 0.18, 'bandpass');
      [0.25, 0.7, 1.1].forEach(d => note(sfxBus, 100, t + d, 0.09, { type: 'sine', vol: 0.07, glide: 5 })); break;
    case 'poder': [72, 68, 65, 60].forEach((m, i) => note(sfxBus, m, t + i * 0.11, 0.2, { type: 'square', vol: 0.1, cutoff: 2000 }));
      note(sfxBus, 48, t + 0.44, 0.4, { type: 'sawtooth', vol: 0.1, cutoff: 900 }); break;
    case 'join':note(sfxBus, 76, t, 0.1, { type: 'sine', vol: 0.2 }); note(sfxBus, 83, t + 0.08, 0.14, { type: 'sine', vol: 0.2 }); break;
  }
}
