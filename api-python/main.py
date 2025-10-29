from fastapi import FastAPI, HTTPException, status

from src.presentation.camera_controller import camera_router
from src.presentation.fiscal_controller import fiscal_router

app = FastAPI()


app.include_router(camera_router, prefix='/cameras')
app.include_router(fiscal_router, prefix="/fiscais")