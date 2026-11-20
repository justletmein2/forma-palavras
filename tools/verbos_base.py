import os, unicodedata, sys
B='/tmp/lex/MorphoBr'
def sa(w): return ''.join(c for c in unicodedata.normalize('NFD', w) if unicodedata.category(c)!='Mn')
def formas(pasta, filtro=None):
    s=set()
    for f in os.listdir(f'{B}/{pasta}'):
        for l in open(f'{B}/{pasta}/{f}', encoding='utf-8'):
            p=l.rstrip('\n').split('\t')
            if len(p)<2: continue
            if filtro and not filtro(p[1]): continue
            s.add(sa(p[0].lower()))
    return s
verbos=formas('verbs')
outros=formas('nouns')|formas('adjectives')|formas('adverbs')
pal=[l.strip() for l in open('/home/claude/fp/public/palavras.txt', encoding='utf-8') if l.strip()]
chaves=[]; vistos=set()
for w in pal:
    k=sa(w.lower())
    if k in vistos: continue
    vistos.add(k); chaves.append(k)
so_verbo=[k for k in chaves if len(k)>=3 and k in verbos and k not in outros]
print('palavras', len(chaves), 'so verbo', len(so_verbo), file=sys.stderr)
import pickle; pickle.dump((so_verbo, chaves, verbos, outros), open('/tmp/lex/d.pkl','wb'))
