import pandas as pd
import conexao
from config import DATA_DIR
import os

def preencher_plzdata(dados):
    """Preenche a planilha plzdata.xlsx com os dados do Google Sheets, convertendo para caixa alta."""
    df = pd.DataFrame(dados, columns=[
        "ORDEM", "FISCAL", "DATA", "PLACA", "MARCA/MODELO", "COR",
        "MUNICÍPIO", "PROPRIETÁRIO", "CPF / CNPJ", "CEP", "ENDEREÇO"
    ])
    df = df.applymap(lambda x: str(x).upper() if isinstance(x, str) else x)  # Converte para caixa alta
    df.to_excel(os.path.join(DATA_DIR, "plzdata.xlsx"), index=False)

if __name__ == "__main__":
    dados = conexao.obter_dados_google()
    preencher_plzdata(dados)


