import cameraService from '../services/camera.service.js';

class CameraController {
  async getAllCameras(req, res, next) {
    try {
      const cameras = await cameraService.getAllCameras();
      res.status(200).json(cameras);
    } catch (error) {
      next(error); // Envia o erro para o handler centralizado.
    }
  }

  async createCamera(req, res, next) {
    try {
      console.log('Dados recebidos para criação de câmera:', req.body);
      const novaCamera = await cameraService.createCamera(req.body);
      res.status(201).json({ message: 'Câmera criada com sucesso!', data: novaCamera });
    } catch (error) {
      next(error);
    }
  }

    async getCameraById(req, res, next) {
    try {
      const { id } = req.params;
      const camera = await cameraService.getCameraById(id);
      res.status(200).json(camera);
    } catch (error) {
      next(error);
    }
  }

  async updateCamera(req, res, next) {
    try {
      const { id } = req.params;
      const cameraData = req.body;
      const cameraAtualizada = await cameraService.updateCamera(id, cameraData);
      res.status(200).json({ message: 'Câmera atualizada com sucesso!', data: cameraAtualizada });
    } catch (error) {
      next(error);
    }
  }

  async deleteCamera(req, res, next) {
    try {
      const { id } = req.params;
      await cameraService.deleteCamera(id);
      // O status 204 (No Content) é ideal para respostas de delete bem-sucedidas
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new CameraController();