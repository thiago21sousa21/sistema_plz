from sheets import infratores, descartes, reincidentes
from utils import find_one_descarte, find_one_infrator, isReincidente
import os
import xlwings as xw  # Importação do xlwings
from utils import menu_selecao_irregularidades_modular, selecionar_fiscal, selecionar_legislacao, formatar_numero_com_ano
from listas import LISTA_IRREGULARIDADES, LISTA_FISCAIS_VIDEO, LEGISLACAO_LIXO_URBANO

def generate_model_path():
    """
    Solicita o caminho da pasta onde está o modelo e verifica se o arquivo existe.
    """
    pasta = input("Digite o caminho onde está a planilha: ").strip()
    name_sheet = "modelo-auto-de-infracao.xlsx"
    complete_path = os.path.join(pasta, name_sheet)
    if not os.path.isfile(complete_path):
        print("Arquivo não encontrado!")
        return None
    return complete_path

def inserting():
    """
    Função principal para buscar dados, preencher o modelo de Auto de Infração
    e salvar o novo arquivo usando xlwings.
    """
    autuado = input("Digite o CPF ou CNPJ a ser buscado: ").strip()
    infracao = input("Digite a placa a ser buscada: ").strip()
    model_path = generate_model_path()
    numero_auto = formatar_numero_com_ano()

    if not model_path:
        return
    
    # 1. Busca de Dados
    inf = find_one_infrator(infratores, autuado)
    des = find_one_descarte(descartes, infracao)

    if not inf or not des:
        print("Dados não encontrados.")
        raise Exception("Dados não encontrados")
        # Pode ser interessante retornar aqui ou continuar com campos vazios
    
    # 2. Seleção de Dados Auxiliares
    fiscal = selecionar_fiscal(LISTA_FISCAIS_VIDEO)
    irregularidades = menu_selecao_irregularidades_modular(LISTA_IRREGULARIDADES)
    legislacao = selecionar_legislacao(LEGISLACAO_LIXO_URBANO)

    # 3. Manipulação da Planilha com xlwings
    novo_nome = "auto_de_infracao_preenchido.xlsx"
    
    # Cria o caminho para o novo arquivo no mesmo diretório do modelo
    nova_path = os.path.join(os.path.dirname(model_path), novo_nome)

    try:
        # Copia o arquivo modelo para o novo local
        # Isso garante que o modelo original não seja alterado
        xw.Book(model_path).save(nova_path) 
        
        # Abre o novo arquivo para edição
        wb = xw.Book(nova_path)
        ws = wb.sheets.active  # Usa a planilha ativa (ou wb.sheets['Nome_da_aba'])
    except Exception as e:
        print(f"Erro ao abrir ou copiar o arquivo: {e}")
        return

    # --- Inserção dos dados nas Células ---

    # Dados Gerais
    ws.range("F3").value = numero_auto
    ws.range("B48").value = legislacao["referencia"]
    ws.range("Q46").value = legislacao["texto"]
    ws.range("B8").value = "N/A"

    # Reincidência
    if isReincidente(reincidentes, autuado):
        ws.range("S21").value = "SIM"
        ws.range("Y53").value = "X"
        ws.range("B64").value = ""  # Limpa o "primeira autuação"
    else:
        ws.range("B64").value = "X"
        ws.range("S21").value = "NÃO"
        ws.range("Y53").value = ""  # Limpa o "reincidente"

    # Dados do Fiscal
    ws.range("B3").value = fiscal["codigo"]
    ws.range("B78").value = fiscal["matricula"]
    ws.range("E129").value = fiscal["matricula"]
    ws.range("T78").value = fiscal["nome"]

    # Irregularidades
    print(irregularidades)
    for i in irregularidades:
        ws.range(i["celula"]).value = "X"
        if i["id"] == 0:
            ws.range("F40").value = i["texto"].upper() # Outras especificações

    # Dados do Infrator/Autuado
    ws.range('B6').value = inf.get('PROPRIETÁRIO', '')
    ws.range('B11').value = inf.get('CPF / CNPJ', '')
    # ws.range('AH11').value = inf.get('CNPJ', '') # O campo B11 já deve cobrir
    
    ws.range('D15').value = inf.get('ENDEREÇO', '').upper()
    ws.range('AL15').value = inf.get('CEP', '')
    # ws.range('N17').value = inf.get('BAIRRO', '') - Não usado na sua versão original
    # ws.range('E17').value = inf.get('NUMERO', '') - Não usado na sua versão original

    # Dados da Infração (Local/Data)
    ws.range('B21').value = 'FLAGRANTE'
    ws.range('AE21').value = des.get('DATA DESCARTE', '')
    ws.range('AP21').value = des.get('HORA DESCARTE', '')[:5]
    ws.range('D24').value = des.get('LOCAL', '')
    ws.range('E26').value = "S/N" # Número do local
    ws.range('N26').value = des.get('BAIRRO', '')
    # ws.range('AL26').value = inf.get('CAMERA ZONA', '') - Não usado na sua versão original

    # Descrição da Infração
    ws.range('F42').value = (
        f"FLAGRANTE REALIAZDO POR VIDEOMONITORAMENTO, VEÍCULO "
        f"{inf.get('MARCA/MODELO', '')} COR {inf.get('COR', '')} DE PLACA "
        f"{inf.get('PLACA', '')[:3]}-{inf.get('PLACA', '')[3:]}"
    )

    # Salvar e Fechar
    # O xlwings salva automaticamente as alterações no objeto 'wb' quando ele é salvo
    wb.save()
    wb.close()
    
    print(f"\n✅ Auto de infração preenchido e salvo em: {nova_path}")

