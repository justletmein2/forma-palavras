"""Gera public/palavras.txt e public/palavroes.txt a partir das listas fonte.
Fontes: pythonprobr/palavras (MPL-2.0), fserb/pt-br (MIT: léxico, conjugações, frequência),
VERO/LibreOffice pt-BR via npm dictionary-pt (LGPL/MPL) para validar flexões."""
import re, sys, unicodedata
# uso: build_dict.py palavras.txt icf lexico conjugacoes hunspell_base out_dir
src_words, src_freq, src_lex, src_conj, hs_base, out_dir = sys.argv[1:7]
from spylls.hunspell import Dictionary
hs = Dictionary.from_files(hs_base)

def plain(w):
    return ''.join(c for c in unicodedata.normalize('NFD', w) if unicodedata.category(c) != 'Mn')

PALAVROES = """porra porras caralho caralhos caralhada merda merdas merdinha bosta bostas bostinha
puta putas puto putos putaria putinha foder fode fodem fodeu fodi fodo fodendo fodido fodida fodidos
foda fodas fodão cu cus cuzão cuzinho buceta bucetas boceta bocetas xoxota xoxotas xereca xavasca
pica picas piroca pirocas piru pinto rola caceta cacete cacetada punheta punhetas punheteiro siririca
arrombado arrombada arrombados escroto escrota babaca babacas otário otária otários corno cornos chifrudo
desgraça desgraçado desgraçada vagabundo vagabunda safado safada tesão tesuda tesudo bunda bundas bundão
cagar cagou cagado cagada caguei peido peidar peidou mijo mijar mijou broxa brocha chupa chupar trouxa
filhodaputa pqp""".split()

freq = {}
for line in open(src_freq, encoding='utf8'):
    w, _, f = line.strip().partition(',')
    try: freq[w] = float(f)
    except ValueError: pass

valid = set()
for w in open(src_words, encoding='utf8'):
    w = w.strip()
    if re.fullmatch(r"[a-záàâãéêíóôõúüç]+", w): valid.add(w)
for f in (src_lex, src_conj):
    for w in open(f, encoding='utf8'):
        w = w.strip()
        if re.fullmatch(r"[a-záàâãéêíóôõúüç]+", w): valid.add(w)
# Formas flexionadas (plurais, femininos, verbos) que aparecem no uso real e o corretor aceita
for w in freq:
    if w not in valid and re.fullmatch(r"[a-záàâãéêíóôõúüç]{3,16}", w) and hs.lookup(w):
        valid.add(w)
valid.update(p for p in PALAVROES if p not in ('pqp', 'filhodaputa'))

best = {}  # chave sem acento -> forma exibida
for w in valid:
    k = plain(w)
    if not (3 <= len(k) <= 13) or not re.fullmatch(r"[a-z]+", k): continue
    cur = best.get(k)
    if cur is None: best[k] = w; continue
    # Se a forma sem acento existe, ela vence; senão, a acentuada mais comum.
    if freq.get(w, 99) < freq.get(cur, 99): best[k] = w

# A forma sem acento só vence se for de uso parecido com a acentuada mais comum
# (esta/está, pais/país). Se for raríssima (avo/avó, cafe/café), mostramos o acento.
for k, w in list(best.items()):
    if k in valid and w != k and freq.get(k, 99) - freq.get(w, 99) < 2.0:
        best[k] = k

ordered = sorted(best.values(), key=lambda w: (freq.get(w, 99), w))
open(f"{out_dir}/palavras.txt", 'w', encoding='utf8').write('\n'.join(ordered))
pal = sorted({plain(p) for p in PALAVROES if 3 <= len(plain(p))})
open(f"{out_dir}/palavroes.txt", 'w', encoding='utf8').write('\n'.join(pal))
print(len(ordered), 'palavras;', len(pal), 'palavrões')
