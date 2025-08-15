import cameraRepository from '../repositories/camera.repository.js';

class CameraService {
  async getAllCameras() {
    return await cameraRepository.findAll();
  }

  async createCamera(cameraData) {
    // A validação de campos agora será feita pelo Joi no middleware,
    // então podemos remover a verificação daqui se quisermos.
    return await cameraRepository.create(cameraData);
  }

    async getCameraById(id) {
    const camera = await cameraRepository.findById(id);
    if (!camera) {
      const error = new Error('Câmera não encontrada.');
      error.statusCode = 404; // Not Found
      throw error;
    }
    return camera;
  }

  async updateCamera(id, cameraData) {
    // Primeiro, verifica se a câmera existe
    await this.getCameraById(id);
    await cameraRepository.update(id, cameraData);
    return { id, ...cameraData };
  }

  async deleteCamera(id) {
    // Primeiro, verifica se a câmera existe
    await this.getCameraById(id);
    return await cameraRepository.delete(id);
  }
}

export default new CameraService();