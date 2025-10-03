import pandas as pd
import gspread
from oauth2client.service_account import ServiceAccountCredentials

filename = "projeto-auto-video-f6c6dc5a04c2.json"

scopes = [ "https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

creds = ServiceAccountCredentials.from_json_keyfile_name(filename=filename, scopes=scopes)


client = gspread.authorize(creds)

