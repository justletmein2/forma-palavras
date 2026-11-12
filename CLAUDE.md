# Instruções para o Claude neste repositório

- Fale em português com o Lucas. Ele não é programador: explique em termos simples
  e diga o que ele precisa fazer, se houver algo.
- Este jogo (Forma Palavras) é separado do Aura Battle (`duels-game`): outro repositório
  e outro projeto Firebase (`caca-palavras-6cd16`). Não misture os dois.
- `main` é o que está no ar: todo push em `main` publica o site no GitHub Pages.

## Testar

- Sem Firebase: abra `public/index.html?local=1&tempo=30` servido localmente
  (`cd public && python3 -m http.server`). Cada aba vira um jogador.
- Mudou `database.rules.json`? Peça pro Lucas colar no Console do Firebase
  (Realtime Database → Regras), ou publique com o Firebase CLI se houver acesso.
- Dicionário: `tools/build_dict.py` (veja o cabeçalho para as fontes).
