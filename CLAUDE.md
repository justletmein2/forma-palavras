# Instruções para o Claude neste repositório

- Fale em português com o Lucas. Ele não é programador: explique em termos simples
  e diga o que ele precisa fazer, se houver algo.
- Este jogo (Forma Palavras) é separado do Aura Battle (`duels-game`): outro repositório
  e outro projeto Firebase (`caca-palavras-6cd16`). Não misture os dois.
- `main` é o que está no ar: todo push em `main` publica o site no GitHub Pages.

## Testar

- Sem Firebase: abra `public/index.html?local=1&tempo=30` servido localmente
  (`cd public && python3 -m http.server`). Cada aba vira um jogador.
- `database.rules.json` vale pro projeto Firebase inteiro e também tem o caminho `penatabua`
  (do jogo Pé na Tábua, `justletmein2/pe-na-tabua`). Não apague essa parte; mantenha os dois
  repositórios com o mesmo arquivo.
- Mudou `database.rules.json`? Peça pro Lucas colar no Console do Firebase
  (Realtime Database → Regras), ou publique com o Firebase CLI se houver acesso.
- Dicionário: `tools/build_dict.py` (veja o cabeçalho para as fontes).

## Modo "sem verbos"

- Opção da sala (`meta.semVerbos`), ligada pelo anfitrião. A lista fica em `public/verbos.txt`
  (baixada só quando o modo está ligado) e é usada em `lookup`/`resolver` (dict.js).
- Como a lista foi feita e como ajustar: `tools/README-verbos.md`.

## Sala fixa (CALU)

- `SALAS_FIXAS` em net.js (hoje só `CALU`, do Lucas e da Carol). Digitar o código cria a sala se não
  existir; o sorteio de código nunca cai nela. Ao entrar, se a última partida já acabou, a sala volta
  pra tela de espera. Depois da 1ª vez, o aparelho mostra o atalho "💜 Entrar na sala CALU" no início.
- Na lista de jogadores da sala fixa só aparece quem está online (ela acumula gente antiga).

## Boneco compartilhado (portal e outros jogos usam daqui)

- `public/js/avatar.js`: o desenho do boneco. Os olhos e a boca ficam em grupos `.av-olhos` / `.av-boca`
  (pra piscar e falar). Mudanças aqui aparecem no portal, no Pé na Tábua, na Torre Bamba e no Palhetada.
- `public/js/boneco-vivo.js`: faz o boneco piscar sozinho e mexer a boca (`darVida(el).falar(ms)`).
- `public/js/boneco-editor.js`: a tela única de "Personalizar boneco" usada pelo portal e pelos jogos
  (menos a Cripta). Quem chama passa o perfil e a função de salvar. O Forma Palavras continua com o
  editor próprio (que também escolhe comemoração e frase); o perfil é o mesmo.
- Não renomeie esses arquivos nem tire exportações sem atualizar os outros repositórios.

## Música da partida (arquivo gravado)

- `public/musica/partida.m4a` (~2,4 MB, 3min13): feita na Suno pelo Lucas e montada a partir de 3 faixas
  da conta dele ("Forma Palavras - Partida (chill)", "(produzida)" e "(perseguição)", mesmo andamento,
  161 BPM). Calma até ~1:06, transição pro remix produzido, transição pra perseguição em ~1:59.
  A aceleração (1,08× faltando 45 s e 1,15× faltando 10 s, sem mudar o tom) já está GRAVADA no arquivo,
  pensada pra partida de 180 s: o segundo X do arquivo = X segundos depois do "JÁ!".
- audio.js: `prepararFaixa()` cria o `<audio>` no primeiro toque (exigência do iPhone) e passa pelo Web Audio
  (`musicBus`, então o botão de música vale). `sincronizarPartida(seg)` é chamado a cada tique da partida:
  começa a tocar no ponto certo e corrige se escorregar. Arquivo ainda não baixou → toca o sintetizador.
- O service worker NÃO guarda .m4a/.mp3 (o navegador pede o áudio em pedaços; o servidor precisa aceitar
  "Range" pra pular pro meio — o GitHub Pages aceita, o `python3 -m http.server` não: teste com
  `python3 -m RangeHTTPServer`).
- Pra trocar a música: gere o arquivo com o mesmo formato (acelerações já gravadas) e substitua.
