import infracaoRepository from '../repositories/infracao.repository.js';
import eventoService from './evento.service.js'; // Usaremos para atualizar o status do evento
import ExcelJS from 'exceljs';
import path from 'path';

class InfracaoService {
  async getAllInfracoesDetailed(filters) {
    return await infracaoRepository.findAllDetailed(filters);
  }

  async getSingleInfracaoDetailed(id) {
    const results = await infracaoRepository.findAllDetailed({ id: id });
    
    // O repositório sempre retorna um array. Se não encontrou nada, o array está vazio.
    if (results.length === 0) {
      const error = new Error('Infração não encontrada.');
      error.statusCode = 404;
      throw error;
    }
    // Retornamos apenas o primeiro (e único) resultado
    return results[0];
  }

  async createInfracao(infracaoData) {
    // 1. Cria a infração
    const novaInfracao = await infracaoRepository.create(infracaoData);

    // 2. Após criar, atualiza o status do evento para 'feito'
    if (novaInfracao) {
      await eventoService.updateEventoStatus(infracaoData.evento_id, { feito: true });
    }
    
    return novaInfracao;
  }

  async generateReportForInfracao(id) {
    // 1. Busca os dados usando o novo método de serviço
    const infracaoData = await this.getSingleInfracaoDetailed(id);
    
    // 2. Carrega o modelo da planilha
    const workbook = new ExcelJS.Workbook();
    const templatePath = path.join(process.cwd(), 'templates', 'modelo-auto-de-infracao.xlsx');
    await workbook.xlsx.readFile(templatePath);

    // 3. Preenche as células
    const worksheet = workbook.getWorksheet(1);
    worksheet.getCell('B6').value = infracaoData.autuado_nome;
    worksheet.getCell('B11').value = infracaoData.cpf_cnpj;
    worksheet.getCell('D15').value = `${infracaoData.logradouro} ${infracaoData.cidade}`
    worksheet.getCell('AL15').value = infracaoData.cep;
    worksheet.getCell('N17').value = infracaoData.bairro;
    // worksheet.getCell('').value
    // worksheet.getCell('H5').value = new Date(infracaoData.momento);
    // worksheet.getCell('H6').value = infracaoData.placa;
    // worksheet.getCell('H7').value = infracaoData.evento_local;
    // ... continue para todas as células necessárias

    return workbook;
  }
}

export default new InfracaoService();