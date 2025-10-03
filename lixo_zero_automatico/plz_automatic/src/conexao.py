import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from dotenv import load_dotenv
from config import CREDENTIASL_FILE, TOKEN_FILE

load_dotenv()

# Escopo necessário para ler os dados do Google Sheets
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# ID da planilha do Google Sheets e intervalo de dados

spreadsheet_id = os.getenv("SPREADSHEET_ID")
range_name = os.getenv("RANGE_NAME")

def obter_dados_google():
    """Obtém os dados da planilha do Google Sheets."""
    creds = None
    
    # Carrega as credenciais do usuário
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    
    # Se não houver credenciais válidas, solicita autenticação
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIASL_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Salva as credenciais para futuras execuções
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        # Conexão com a API do Google Sheets
        service = build("sheets", "v4", credentials=creds)
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=spreadsheet_id, range=range_name).execute()
        values = result.get("values", [])
        
        return values
    except HttpError as err:
        print(f"Erro ao acessar Google Sheets: {err}")
        return []

if __name__ == "__main__":
    obter_dados_google()