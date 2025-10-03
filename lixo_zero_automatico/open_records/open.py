import os
import time

# Pasta onde estão os vídeos
pasta = r"C:\Users\Public\HikCentralClient\Record"

# Filtros de busca
camera = input("Número da câmera: ").strip()
data = input("Data invertida (AAAAMMDD): ").strip()

filtros = [camera, data]
encontrados = []

# Busca os arquivos que batem e terminam em .mp4
for raiz, dirs, arquivos in os.walk(pasta):
    for arquivo in arquivos:
        if arquivo.lower().endswith(".mp4") and all(f in arquivo for f in filtros):
            caminho = os.path.join(raiz, arquivo)
            encontrados.append(caminho)

# Ordena do mais antigo para o mais recente (pela data de modificação)
encontrados.sort(key=lambda x: os.path.getmtime(x))

if not encontrados:
    print("Nenhum arquivo encontrado.")
else:
    print(f"\n{len(encontrados)} arquivo(s) encontrado(s). Vamos abrir um por vez...\n")

    for caminho in encontrados:
        print(f"Abrindo: {os.path.basename(caminho)}")
        os.startfile(caminho)  # abre no player padrão do Windows

        # espera um pouco pro player abrir
        time.sleep(2)

        resp = input("É esse o vídeo? (s/n) ").strip().lower()
        if resp == "s":
            print("Beleza, vídeo encontrado ✅")
            break
        else:
            print("Fechando, passando para o próximo...\n")
