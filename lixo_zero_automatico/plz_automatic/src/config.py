import os

# Diretório base do projeto
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Diretório de dados
DATA_DIR = os.path.join(BASE_DIR, "data")

# Caminhos dos arquivos de dados
PLZDATA_FILE = os.path.join(DATA_DIR, "plzdata.xlsx")
DIARIOVIDEO_FILE = os.path.join(DATA_DIR, "diariovideo.xlsx")
AUTO_TEMPLATE_FILE = os.path.join(DATA_DIR, "auto.xlsx")
AUTO_OUTPUT_FILE = os.path.join(DATA_DIR, "auto_preenchido.xlsx")

# Diretório de configuraçõe
CONFIG_DIR = os.path.join(BASE_DIR, "config")

# Caminhos dos arquivos de configuração
CREDENTIASL_FILE = os.path.join(CONFIG_DIR, "credentials.json")
TOKEN_FILE = os.path.join(CONFIG_DIR, "token.json")

