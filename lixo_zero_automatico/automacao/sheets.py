from client import client

folder_id = "1C8Q50fgNJdDMwHtfwDgjO2kimE_RappP"
planilha_descartes = "controle_evento_descarte_lixo_zero"
planilha_strans = "Informações - STRANS"
planilha_reicidentes = "Lixo Zero - 2025"

descartes = client.open(title=planilha_descartes, folder_id=folder_id).get_worksheet(0).get_all_records()

infratores = client.open(title=planilha_strans, folder_id=folder_id).get_worksheet(7).get_all_records()

reincidentes = client.open(planilha_reicidentes).get_worksheet(5).col_values(8)

