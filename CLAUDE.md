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
