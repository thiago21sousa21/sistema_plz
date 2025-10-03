import os
import subprocess
from datetime import datetime

# Caminho da pasta dos vídeos
PASTA = r"C:\Users\Public\HikCentralClient\Record"

def listar_videos(data: str, camera: int):
    """
    Lista vídeos da pasta conforme a data (YYYY/MM/DD) e id da câmera.
    """
    # Converte a data para o formato usado no arquivo: YYYYMMDD
    data_formatada = data.replace("/", "")
    
    # Ajusta o número da câmera para sempre ter 2 dígitos (01, 02, 33 etc.)
    camera_str = f"{camera:02d}"
    
    videos = []
    for arquivo in os.listdir(PASTA):
        if arquivo.endswith(".mp4") and f"_{camera_str} " in arquivo and data_formatada in arquivo:
            videos.append(os.path.join(PASTA, arquivo))
    
    # Ordena pela data/hora do nome do arquivo (fica do mais antigo pro mais recente)
    videos.sort()
    return videos


def escolher_video(videos):
    """
    Itera pelos vídeos, abrindo cada um e perguntando ao usuário se é o correto.
    """
    if not videos:
        print("Nenhum vídeo encontrado para essa câmera e data.")
        return

    for caminho in videos:
        print("\nCaminho completo:", caminho)
        # Abre o vídeo no player padrão
        subprocess.Popen(f'explorer "{caminho}"')
        
        resposta = input("Esse é o vídeo que você deseja? (s/n): ").strip().lower()
        if resposta == "s":
            print("✅ Você escolheu o vídeo!")
            return
    
    print("⚠️ Os vídeos acabaram e nenhum foi escolhido.")


if __name__ == "__main__":
    data = input("Digite a data (YYYY/MM/DD): ").strip()
    camera = int(input("Digite o número da câmera (ex: 1, 12, 33): ").strip())
    
    videos = listar_videos(data, camera)
    escolher_video(videos)
