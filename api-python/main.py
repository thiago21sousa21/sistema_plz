from fastapi import FastAPI, HTTPException, status

from src.presentation.camera_controller import camera_router
from src.presentation.fiscal_controller import fiscal_router
from src.presentation.autuado_controller import autuado_router
from src.presentation.veiculo_controller import veiculo_router
from src.presentation.endereco_controller import endereco_router
from src.presentation.evento_controller import evento_router
from src.presentation.infracao_controller import infracao_router

app = FastAPI()


app.include_router(camera_router, prefix='/cameras')
app.include_router(fiscal_router, prefix="/fiscais")
app.include_router(autuado_router, prefix="/autuados")
app.include_router(veiculo_router, prefix="/veiculos")
app.include_router(endereco_router, prefix="/enderecos")
app.include_router(evento_router, prefix="/eventos")
app.include_router(infracao_router, prefix="/infracoes")
