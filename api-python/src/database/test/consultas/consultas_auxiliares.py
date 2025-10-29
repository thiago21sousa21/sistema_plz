import os
from dotenv import load_dotenv
from connection.connection import DatabaseConnection
from rich import print
from rich.table import Table

# Carrega variáveis de ambiente (se o .env estiver na pasta raiz)
# load_dotenv() 

(lambda: os.system("clear"))()

class ConsultasAuxiliares:


    def _imprimir_tabela_rich(self, result, title):
        """
        Método auxiliar privado para pegar um resultado (lista de dicts)
        e imprimi-lo como uma tabela bonita do 'rich'.
        """
        if not result:
            print(f"[bold red]Nenhum resultado encontrado para '{title}'.[/bold red]")
            return

        try:
            # 1. Cria a tabela com o título
            table = Table(title=title, title_style="bold magenta", padding=(0, 1))

            # 2. Pega os nomes das colunas do primeiro item (dicionário)
            colunas = result[0].keys()
            for coluna in colunas:
                # Adiciona as colunas na tabela (com estilo)
                table.add_column(coluna.upper(), style="cyan", no_wrap=True)

            # 3. Adiciona as linhas
            for linha in result:
                # Converte todos os valores da linha para string
                table.add_row(*[str(item) for item in linha.values()])
            
            # 4. Imprime a tabela
            print(table)

        except Exception as e:
            print(f"[bold red]Erro ao gerar tabela rich: {e}[/bold red]")
            print("Dados brutos:", result) # Imprime os dados brutos se falhar

    def ver_bancos(self):
        """Visualiza todos os bancos de dados do usuário."""
        print("[bold blue]Buscando bancos de dados...[/bold blue]")
        with DatabaseConnection() as conn:
            try:
                conn.execute_query('''
                    SELECT
                        SCHEMA_NAME,
                        DEFAULT_CHARACTER_SET_NAME,
                        DEFAULT_COLLATION_NAME
                    FROM INFORMATION_SCHEMA.SCHEMATA
                    WHERE SCHEMA_NAME NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys');
                ''')
                result = conn.cursor.fetchall()
                
                # --- USA O MÉTODO AUXILIAR ---
                self._imprimir_tabela_rich(result, "Bancos de Dados no Servidor")

            except Exception as e:
                print(f"[bold red]Erro em ver_bancos: {e}[/bold red]")

    def ver_colunas_tabela(self, banco_de_dados, nome_tabela):
        """Visualiza detalhes das colunas de uma tabela específica."""
        print(f"[bold blue]Buscando colunas para: {banco_de_dados}.{nome_tabela}...[/bold blue]")
        
        query = """
            SELECT
                COLUMN_NAME,
                ORDINAL_POSITION AS 'Ordem',
                COLUMN_TYPE AS 'Tipo',
                IS_NULLABLE AS 'Nulável',
                COLUMN_DEFAULT AS 'Padrão',
                EXTRA
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = %s
              AND TABLE_NAME = %s
            ORDER BY ORDINAL_POSITION;
        """
        # Parâmetros precisam ser uma tupla
        params = (banco_de_dados, nome_tabela)

        with DatabaseConnection() as conn:
            try:
                conn.execute_query(query, params)
                result = conn.cursor.fetchall()
                
                # --- USA O MÉTODO AUXILIAR ---
                self._imprimir_tabela_rich(result, f"Colunas: {banco_de_dados}.{nome_tabela}")

            except Exception as e:
                print(f"[bold red]Erro em ver_colunas_tabela: {e}[/bold red]")

    def ver_chaves_estrangeiras(self, banco_de_dados):
        """Visualiza todas as chaves estrangeiras (FKs) de um banco."""
        print(f"[bold blue]Buscando Chaves Estrangeiras em: {banco_de_dados}...[/bold blue]")
