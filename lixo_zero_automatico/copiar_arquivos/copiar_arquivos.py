import os
import shutil
import re

def copiar_arquivos():

    caminho_base = input("Digite o caminho do arquivo base: ")
    quantidade = int(input("Digite a quantidade de arquivos a pesquisar: "))
    caminho_destino = input("Digite o caminho destino: ")


    padrao = re.search(r"(\d{3})", caminho_base)
    
    if not padrao:
        print("Não foi encontrado um número de três digitos no caminho do arquivo base")
        return
    
    numero_inicial = int(padrao.group(1))
    print(numero_inicial)
    diretorio = os.path.dirname(caminho_base)
    print(diretorio)
    nome_base = os.path.basename(caminho_base)
    print(nome_base)

    for i in range(quantidade+1):
        novo_numero = f'{numero_inicial + i:03d}'
        novo_caminho = re.sub(r"\d{3}", novo_numero, caminho_base)

        if os.path.exists(novo_caminho):
            shutil.copy(novo_caminho, caminho_destino)
            print(f'copiado: {novo_caminho} -> {caminho_destino}')
        else:
            print(f'Arquivo não encontrado: {novo_caminho}')


if __name__ == '__main__':   
    copiar_arquivos()