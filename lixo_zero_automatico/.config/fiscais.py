import os

# Lista de fiscais (pode ser importada de outro arquivo)
fiscais = [
    {"nome": "João Henrique", "matricula": "1", "sigla": "JH"},
    {"nome": "Arthur", "matricula": "2", "sigla": "AT"},
    {"nome": "Breno", "matricula": "3", "sigla": "BR"},
    {"nome": "Andreia", "matricula": "4", "sigla": "AN"},
]

def criar_pastas_para_fiscais(lista_fiscais):
    """
    Cria uma pasta chamada 'criacao_laudo' no disco C, se não existir.
    Em seguida, cria uma subpasta para cada fiscal com o nome da matrícula.
    """
    caminho_base = r"C:\FISCAIS\criacao_laudo"

    # Cria a pasta principal se não existir
    if not os.path.exists(caminho_base):
        os.makedirs(caminho_base)
        print(f"Pasta criada: {caminho_base}")
    else:
        print(f"Pasta já existe: {caminho_base}")

    # Cria uma pasta para cada fiscal
    for fiscal in lista_fiscais:
        pasta_fiscal = os.path.join(caminho_base, fiscal["matricula"])
        if not os.path.exists(pasta_fiscal):
            os.makedirs(pasta_fiscal)
            print(f"Pasta criada para {fiscal['nome']}: {pasta_fiscal}")
        else:
            print(f"Pasta já existe para {fiscal['nome']}: {pasta_fiscal}")

if __name__ == "__main__":
    criar_pastas_para_fiscais(fiscais)
