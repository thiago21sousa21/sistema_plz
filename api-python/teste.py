# Importamos o módulo 'sys' para ter acesso às variáveis do sistema
import sys

# Usamos o 'pprint' para imprimir a lista de forma mais legível
# (é melhor que o print() normal para listas longas)
import pprint

print("O Python procurará módulos nos seguintes diretórios, NESTA ORDEM:")
print("==============================================================")

pprint.pprint(sys.path)