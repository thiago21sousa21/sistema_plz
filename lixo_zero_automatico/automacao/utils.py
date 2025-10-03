import os
import datetime

def find_one_descarte(dados, placa):
    for i  in range(len(dados)-1, -1, -1):
        dado = dados[i]
        if dado["PLACA"] == placa:
            return dado
        
def find_one_infrator(dados, cpf):
    for i  in range(len(dados)-1, -1, -1):
        dado = dados[i]
        if dado["CPF / CNPJ"] == cpf:
            return dado

def isReincidente(reincidentes, autuado):
    for r in reincidentes:
        if autuado == r:
            return True
    return False
        
def input_number_loop(mensagem="Por favor, digite um número: "):
    while True:
        entrada = input(mensagem)
        try:
            numero = float(entrada)
            return numero
        except ValueError:
            print("Entrada inválida. Por favor, digite apenas números.")

clear_console = lambda :os.system("cls" if os.name == "nt" else "clear")

def exibir_menu(opcoes, mensagens_anteriores):
    clear_console() 
    if mensagens_anteriores:
        print(">> ÚLTIMAS AÇÕES:")
        for msg in mensagens_anteriores:
            print(f"   {msg}")
        print("-" * 40)
        
    print("\n" + "="*40)
    print("  MENU DE SELEÇÃO DE IRREGULARIDADES")
    print("="*40)

    for item in opcoes:
        if item['id'] != 0:
            print(f"  {item['id']:>2} - {item['texto']}")

    item_outros = [item for item in opcoes if item['id'] == 0][0]
    print("-" * 40)
    print(f"  {item_outros['id']:>2} - {item_outros['texto']} (Entrada customizada)")
    print("-" * 40)
    print("  Digite 'S' para SAIR e finalizar a seleção.")
    print("-" * 40)

def processar_selecao(entrada, opcoes, selecionadas):
    novas_selecoes = []
    mensagens = [] 
    ids_selecionados_atuais = {d['id'] for d in selecionadas}
    mapa_opcoes = {item['id']: item for item in opcoes}
    ids_validos = set(mapa_opcoes.keys())

    tentativas = [id_str.strip() for id_str in entrada.split(',') if id_str.strip()]

    for tentativa in tentativas:
        try:
            id_selecionado = int(tentativa)

            if id_selecionado in ids_validos:
                
                if id_selecionado not in ids_selecionados_atuais:
                    dicionario_original = mapa_opcoes[id_selecionado]

                    if id_selecionado == 0:
                        descricao = input("OPÇÃO 'OUTROS' ESCOLHIDA. Por favor, descreva a irregularidade: ")
                        dicionario_customizado = dicionario_original.copy()
                        dicionario_customizado['texto'] = f"{descricao}".upper()
                        novas_selecoes.append(dicionario_customizado)
                        
                        mensagens.append(f"OPÇÃO 0: '{descricao}' adicionada.")
                        ids_selecionados_atuais.add(0) 
                    
                    else:
                        novas_selecoes.append(dicionario_original)
                        mensagens.append(f"Opção {id_selecionado}: '{dicionario_original['texto'][:30]}...' adicionada.")
                        ids_selecionados_atuais.add(id_selecionado)

                else:
                    mensagens.append(f"AVISO: Opção {id_selecionado} já estava selecionada (ignorado).")
            else:
                mensagens.append(f"ERRO: ID '{id_selecionado}' não é válido.")

        except ValueError:
            mensagens.append(f"ERRO: Entrada '{tentativa}' não é um número válido.")
    return novas_selecoes, mensagens

def menu_selecao_irregularidades_modular(opcoes_disponiveis):
    opcoes_selecionadas = []
    mensagens_anteriores = [] 
    
    while True:
        exibir_menu(opcoes_disponiveis, mensagens_anteriores)
        
        entrada = input("Digite o(s) número(s) (separados por vírgula): ").strip()

        if entrada.upper() == 'S':
            break
    
        novos_itens, mensagens_atuais = processar_selecao(entrada, opcoes_disponiveis, opcoes_selecionadas)
        
        opcoes_selecionadas.extend(novos_itens)
        mensagens_anteriores = mensagens_atuais 
        
    return opcoes_selecionadas

def selecionar_fiscal(lista_fiscais):
    clear_console()
    mapa_fiscais = {fiscal['id']: fiscal for fiscal in lista_fiscais}
    
    ids_validos = list(mapa_fiscais.keys())

    while True:
        print("\n" + "="*30)
        print("  SELEÇÃO DO FISCAL")
        print("="*30)
        print("Opções:")
        for fiscal in lista_fiscais:
            print(f"  {fiscal['id']:>2} - Código: {fiscal['codigo']}")
        
        print("-" * 30)

        entrada = input("Digite o ID do fiscal desejado: ").strip()

        try:
            id_selecionado = int(entrada)
            
            if id_selecionado in ids_validos:
                fiscal_escolhido = mapa_fiscais[id_selecionado]
                print(f"\nFiscal '{fiscal_escolhido['codigo']}' selecionado com sucesso!")
                return fiscal_escolhido
            else:
                print(f"Opção inválida. O ID '{id_selecionado}' não corresponde a um fiscal listado.")
        
        except ValueError:

            print(f"Entrada inválida. Por favor, digite apenas o número (ID) do fiscal.")


def selecionar_legislacao(lista_legislacao):
    clear_console()
    mapa_legislacao = {i + 1: item for i, item in enumerate(lista_legislacao)}
    
    opcoes_validas = list(mapa_legislacao.keys())

    while True:
        print("\n" + "="*50)
        print("  SELEÇÃO DA REFERÊNCIA LEGAL")
        print("="*50)
        
        print("Opções disponíveis:")
        for num_opcao, item in mapa_legislacao.items():
            print(f"  {num_opcao:>2} - {item['referencia']}")
        
        print("-" * 50)

        entrada = input("Digite o número da opção desejada: ").strip()

        try:
            opcao_selecionada = int(entrada)
            
            if opcao_selecionada in opcoes_validas:
                dicionario_escolhido = mapa_legislacao[opcao_selecionada]
                print(f"\nReferência '{dicionario_escolhido['referencia']}' selecionada com sucesso!")
                return dicionario_escolhido
            else:
                print(f"Opção inválida. O número '{opcao_selecionada}' não está na lista.")
        
        except ValueError:
            print("Entrada inválida. Por favor, digite apenas o número correspondente à opção.")


def formatar_numero_com_ano():
    while True:
        try:
            entrada = input("Digite um número do auto: ").strip()
            numero = int(entrada)
            ano_atual = datetime.datetime.now().year
            numero_formatado = str(numero).zfill(3)
            string_final = f"{numero_formatado}/{ano_atual}"
            
            return string_final
        
        except ValueError:
            print("Entrada inválida. Por favor, digite APENAS um número inteiro.")

