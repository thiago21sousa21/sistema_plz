from src.database.test.consultas.consultas_auxiliares import ConsultasAuxiliares

consultas = ConsultasAuxiliares()

consultas.ver_bancos()

consultas.ver_colunas_tabela('lixozerodb_teste', 'fiscal')
consultas.ver_colunas_tabela('lixozerodb_teste', 'autuado')
consultas.ver_colunas_tabela('lixozerodb_teste', 'camera')
consultas.ver_colunas_tabela('lixozerodb_teste', 'endereco')
consultas.ver_colunas_tabela('lixozerodb_teste', 'evento')
consultas.ver_colunas_tabela('lixozerodb_teste', 'infracao')
consultas.ver_colunas_tabela('lixozerodb_teste', 'veiculo')

consultas.ver_chaves_estrangeiras("lixozerodb_teste")
