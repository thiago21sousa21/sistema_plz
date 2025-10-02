from fastapi import FastAPI, HTTPException, status
from models.camera import Camera
from daos.cameraDao import CameraDAO

app = FastAPI()

camera_dao = CameraDAO()

@app.post("/cameras/", response_model=Camera, status_code=status.HTTP_201_CREATED)
def insert_camera(camera: Camera):
    try:
        created_camera = camera_dao.insert_camera(camera)
        return created_camera
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ocorreu um erro ao inserir a câmera: {e}"
        )
    
@app.get("/cameras/", response_model=list[Camera])
def get_cameras():
    try:
        cameras = camera_dao.get_all_cameras()
        return cameras
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ocorreu um erro ao recuperar as câmeras: {e}"
        )