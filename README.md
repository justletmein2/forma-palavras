# Forma Palavras

Jogo de formar palavras multiplayer pelo celular: todo mundo vê o mesmo quadro 6x6 e tem 3 minutos
pra achar o máximo de palavras. No fim, uma recapitulação palavra por palavra e o ranking
revelado do último pro primeiro.

Projeto **separado** do Aura Battle: outro repositório e outro projeto Firebase.

## O que tem em cada pasta

| Pasta / arquivo | O que é |
| --- | --- |
| `public/` | O site inteiro (é isso que vai pro ar) |
| `public/js/main.js` | Telas e fluxo do jogo |
| `public/js/board.js` | O quadro e o toque do dedo |
| `public/js/dict.js` | Dicionário, acentos, geração do quadro, pontuação |
| `public/js/recap.js` | Recapitulação e ranking final |
| `public/js/avatar.js` | O bonequinho e a lista de cosméticos (e o nível de cada um) |
| `public/js/trofeus.js` | Lista de troféus (bronze, prata, ouro e platina) e quando cada um é ganho |
| `public/js/efeitos.js` | Poderes do modo Atrapalhar |
| `public/js/audio.js` | Música e efeitos (gerados na hora, sem arquivos de áudio) |
| `public/js/net.js` | Conexão com o Firebase (salas, perfis, login Google) |
| `public/js/config.js` | **Onde colar a configuração do Firebase** |
| `public/palavras.txt` | ~200 mil palavras com acento (da mais comum pra mais rara) |
| `public/palavroes.txt` | Lista usada pelo "modo família" |
| `database.rules.json` | Quem pode ler/escrever o quê no banco |
| `tools/build_dict.py` | Script que gerou o dicionário |
| `public/manifest.json`, `public/sw.js` | Fazem o site virar "app" (ícone, tela cheia, treino sem internet) |
| `public/og.jpg` | Imagem que aparece quando o link é mandado no WhatsApp |

## Regras do jogo

- Arrastar o dedo liga letras vizinhas (inclusive diagonal). Não pode repetir letra nem pular.
- Dedo na tela = uma palavra. Soltou, o jogo confere (3 letras ou mais e no dicionário).
- As letras não têm acento; se a palavra só existe com acento, o jogo mostra com acento.
- Pontos por tamanho: 3→1, 4→2, 5→3, 6→5, 7→7, 8→10, depois +3 por letra.
- Palavra exclusiva (só uma pessoa achou) vale o dobro, com 2+ jogadores.
- XP = pontos da partida + 10 por jogar + 25 por vencer. Cada nível libera cosméticos.

## Testar sem Firebase

Abra o site com `?local=1` (ex.: `index.html?local=1&tempo=30`): cada aba do mesmo
navegador vira um jogador diferente. `tempo=` muda a duração da partida (só pra teste).

## Dicionário

Fontes: [pythonprobr/palavras](https://github.com/pythonprobr/palavras) (MPL-2.0),
[fserb/pt-br](https://github.com/fserb/pt-br) (MIT: léxico, conjugações e frequência) e o
corretor VERO/LibreOffice pt-BR (pacote npm `dictionary-pt`) para aceitar plurais e flexões.
Palavrões foram acrescentados à mão em `tools/build_dict.py` (ofensas a grupos ficaram de fora).

Para gerar de novo, nesta ordem:
1. `tools/build_dict.py` — junta as fontes;
2. `tools/filtrar_obscuras.py palavras.txt palavroes.txt icf conjugacoes` — tira palavras raras/técnicas
   (pela frequência do fserb/pt-br), mas mantém palavrões e as flexões de palavras comuns;
3. `tools/completar_flexoes.py palavras.txt hunspell_base` — devolve plurais e femininos que o
   corretor confirma.

Ao mudar arquivos do site, aumente a versão em `public/sw.js` (`forma-palavras-v1` → `v2`) se
quiser forçar todo mundo a baixar o dicionário novo.
