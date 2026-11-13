"""Acrescenta plurais e femininos que faltam (pães, sapecas, arteira...), conferidos no corretor pt-BR.

Uso: completar_flexoes.py palavras.txt hunspell_base   (reescreve palavras.txt; novas palavras vão pro fim)
"""
import sys, unicodedata
from spylls.hunspell import Dictionary

arq, hs_base = sys.argv[1:3]
hs = Dictionary.from_files(hs_base)
sem = lambda w: ''.join(c for c in unicodedata.normalize('NFD', w) if unicodedata.category(c) != 'Mn')

palavras = [l.strip() for l in open(arq, encoding='utf8') if l.strip()]
chaves = {sem(w) for w in palavras}

def candidatos(w):
    c = []
    if w.endswith('ão'): c += [w[:-2] + 'ões', w[:-2] + 'ães', w[:-2] + 'ãos', w[:-2] + 'ona']
    elif w.endswith('al') or w.endswith('ol') or w.endswith('ul'): c.append(w[:-1] + 'is')
    elif w.endswith('el'): c.append(w[:-2] + 'éis')
    elif w[-1] in 'rz': c.append(w + 'es')
    elif w.endswith('m'): c.append(w[:-1] + 'ns')
    elif w[-1] in 'aeiouéêóôá': c.append(w + 's')
    if w.endswith('o'): c += [w[:-1] + 'a', w[:-1] + 'as']
    if w.endswith('or'): c += [w + 'a', w + 'as']
    return c

novas = []
for w in palavras:
    if len(w) > 11: continue
    for c in candidatos(w):
        k = sem(c)
        if k in chaves or not (3 <= len(k) <= 13): continue
        if hs.lookup(c):
            chaves.add(k); novas.append(c)

open(arq, 'w', encoding='utf8').write('\n'.join(palavras + novas))
print(f'+{len(novas)} flexões ({len(palavras) + len(novas)} no total)')
