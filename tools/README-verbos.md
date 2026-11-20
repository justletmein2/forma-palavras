# Como a lista de verbos (public/verbos.txt) foi feita

Fonte: léxico MorphoBr (https://github.com/LR-POR/MorphoBr), licença Apache 2.0.

Entra na lista (palavras do public/palavras.txt, sem acento):
- formas que no léxico só aparecem como verbo (não como substantivo, adjetivo ou advérbio);
- infinitivos cujo gerúndio é comum no dicionário (falar, poder, olhar...);
- gerúndios (correndo, fazendo...);
- uma lista curta de formas muito comuns cujo substantivo igual é raro (tinha, fez, deu, foi...).

Fica de fora (continua valendo): palavras que também são substantivo/adjetivo comuns
(casa, jogo, canto, feito, cansado), preposições/pronomes que coincidem com verbos
(entre, desde, dele, pois, esta) e alguns nomes próprios.

`verbos_base.py` é o primeiro passo (verbo-only); as regras extras e as listas manuais
estão descritas acima. Ajustes finos: edite public/verbos.txt direto (uma palavra por linha).
