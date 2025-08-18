import infracaoService from '../services/infracao.service.js';

class InfracaoController {
  async getAllInfracoes(req, res, next) {
    try {
      const infracoes = await infracaoService.getAllInfracoesDetailed(req.query);
      res.status(200).json(infracoes);
    } catch (error) {
      next(error);
    }
  }

  async createInfracao(req, res, next) {
    try {
      const novaInfracao = await infracaoService.createInfracao(req.body);
      res.status(201).json({ message: 'Infração gerada com sucesso!', data: novaInfracao });
    } catch (error) {
      next(error);
    }
  }

  async generateInfracaoReport(req, res, next) {
    try {
      const { id } = req.params;
      const workbook = await infracaoService.generateReportForInfracao(id);

      // Define os cabeçalhos da resposta para forçar o download
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="auto_infracao_${id}.xlsx"`
      );

      // Envia o arquivo para o cliente
      await workbook.xlsx.write(res);
      res.end();

    } catch (error) {
      next(error);
    }
  }
}

export default new InfracaoController();