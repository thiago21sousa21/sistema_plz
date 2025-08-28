import laudoService from '../services/laudo.service.js';

class LaudoController {
  async generateLaudo(req, res, next) {
    try {
      // req.body contém os campos de texto (codigoFiscal, etc.)
      // req.files contém um array com as fotos enviadas
      const laudoData = req.body;
      const fotos = req.files;

      console.log('Fotos recebidas pela API:', fotos);
      const fileBuffer = await laudoService.generateLaudo(laudoData, fotos);
      
      const fileName = `laudo_${laudoData.numeroAuto}_${new Date().getFullYear()}.docx`;

      // Define os cabeçalhos para forçar o download do arquivo .docx
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

      res.send(fileBuffer);

    } catch (error) {
      next(error);
    }
  }
}

export default new LaudoController();