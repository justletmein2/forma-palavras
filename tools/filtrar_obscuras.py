"""Tira do dicionário as palavras que quase ninguém conhece (ex.: "estesiotomia").

Uso: filtrar_obscuras.py palavras.txt palavroes.txt icf conjugacoes  (reescreve palavras.txt)

Fica no jogo:
  - palavra com uso razoável no corpus de frequência (fserb/pt-br, arquivo icf);
  - conjugação de verbo conhecido (comeríamos, se "comer" é conhecido);
  - plural, feminino e diminutivo de palavra que ficou (borboletas, gatinha...);
  - todos os palavrões da lista do jogo.
"""
import sys

arq, arq_pal, arq_icf, arq_conj = sys.argv[1:5]
LIMITE = 16.5        # icf: quanto menor, mais comum (casa≈7, abacate≈12.6, esdrúxulo≈15.2, estesiotomia≈22.3)
LIMITE_VERBO = 16.0  # infinitivo conhecido libera as conjugações

freq = {}
for linha in open(arq_icf, encoding='utf8'):
    w, _, f = linha.strip().partition(',')
    try: freq[w] = float(f)
    except ValueError: pass

palavras = [l.strip() for l in open(arq, encoding='utf8') if l.strip()]
palavroes = {l.strip() for l in open(arq_pal, encoding='utf8') if l.strip()}
conj = {l.strip() for l in open(arq_conj, encoding='utf8') if l.strip()}

def sem_acento(w):
    import unicodedata
    return ''.join(c for c in unicodedata.normalize('NFD', w) if unicodedata.category(c) != 'Mn')

conhecida = lambda w: freq.get(w, 99) < LIMITE

# terminações de verbos regulares, tiradas de abafar / comer / partir
def sufixos(inf):
    raiz = inf[:-2]
    return {f[len(raiz):] for f in conj if f.startswith(raiz) and len(f) - len(raiz) <= 7}
SUF = {'ar': sufixos('abafar'), 'er': sufixos('comer'), 'ir': sufixos('partir')}

def verbo_conhecido(w):
    if w not in conj: return False
    for fim, sufs in SUF.items():
        for s in sufs:
            if s and w.endswith(s):
                inf = w[: len(w) - len(s)] + fim
                if freq.get(inf, 99) < LIMITE_VERBO: return True
    return False

def bases(w):
    """formas 'de origem' prováveis: singular, masculino, sem diminutivo"""
    out = set()
    regras = [('ões', 'ão'), ('ães', 'ão'), ('ãos', 'ão'), ('éis', 'el'), ('óis', 'ol'), ('is', 'l'), ('res', 'r'), ('zes', 'z'),
              ('ses', 's'), ('ns', 'm'), ('s', '')]
    for a, b in regras:
        if w.endswith(a): out.add(w[: len(w) - len(a)] + b)
    for x in list(out) + [w]:
        if x.endswith('a'): out.add(x[:-1] + 'o')
        if x.endswith('ona'): out.add(x[:-3] + 'ão')
        for a, b in [('zinho', ''), ('zinha', ''), ('inho', 'o'), ('inha', 'a'), ('inho', ''), ('inha', ''), ('ão', 'o'), ('ão', 'a')]:
            if x.endswith(a) and len(x) - len(a) >= 2: out.add(x[: len(x) - len(a)] + b)
    return out - {w}

ficam = []
for w in palavras:
    k = sem_acento(w)
    if conhecida(w) or k in palavroes or verbo_conhecido(w):
        ficam.append(w); continue
    bs = bases(w)
    if any(conhecida(b) for b in bs) or any(b in conj and verbo_conhecido(b) for b in bs):
        ficam.append(w)

open(arq, 'w', encoding='utf8').write('\n'.join(ficam))
print(f'{len(palavras)} -> {len(ficam)} palavras')
