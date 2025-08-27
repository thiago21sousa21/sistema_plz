import infracaoRepository from '../repositories/infracao.repository.js';
import eventoService from './evento.service.js'; // Usaremos para atualizar o status do evento
import ExcelJS from 'exceljs';
import path from 'path';

/**
 * Formata um CEP (apenas números) para o padrão XXXXX-XXX.
 */
function formatCep(cep = '') {
  const cleaned = (cep || '').replace(/\D/g, ''); // Remove tudo que não for dígito
  if (cleaned.length !== 8) return cep; // Retorna o original se não tiver 8 dígitos
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Formata um CPF (apenas números) para o padrão XXX.XXX.XXX-XX.
 */
function formatCpf(cpf = '') {
  const cleaned = (cpf || '').replace(/\D/g, '');
  if (cleaned.length !== 11) return cpf;
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatPlaca(placa = '') {
  //vou fazer um padrão que apenas coloca um hífen depois dos 3 primeiros caracteres
  const cleaned = (placa || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  if (cleaned.length !== 7) return placa; // Retorna o original se não tiver 7 caracteres
  return cleaned.replace(/(\w{3})(\w{4})/, '$1-$2');
}

/**
 * Formata um CNPJ (apenas números) para o padrão XX.XXX.XXX/XXXX-XX.
 */
function formatCnpj(cnpj = '') {
  const cleaned = (cnpj || '').replace(/\D/g, '');
  if (cleaned.length !== 14) return cnpj;
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

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
    const infracaoData = await this.getSingleInfracaoDetailed(id);
    //console.log('#####PARA DEPURAÇÃO: ',infracaoData);
    
    const workbook = new ExcelJS.Workbook();
    const templatePath = path.join(process.cwd(), 'templates', 'modelo-auto-de-infracao.xlsx');
    await workbook.xlsx.readFile(templatePath);

    const worksheet = workbook.getWorksheet(1);

    // --- APLICAÇÃO DAS REGRAS DE PREENCHIMENTO E FORMATAÇÃO ---

    worksheet.getCell('B6').value = infracaoData.autuado_nome;

    // Regra: se for cpf/cnpj, formata e coloca na célula correta
    const cpfCnpjLimpo = (infracaoData.cpf_cnpj || '').replace(/\D/g, '');
    if (cpfCnpjLimpo.length === 11) {
      worksheet.getCell('B11').value = formatCpf(cpfCnpjLimpo);
    } else if (cpfCnpjLimpo.length === 14) {
      worksheet.getCell('AH11').value = formatCnpj(cpfCnpjLimpo);
    }

    const enderecoCompleto = `${infracaoData.logradouro || ''}, ${infracaoData.cidade || ''} - ${infracaoData.estado || ''}`;
    worksheet.getCell('D15').value = enderecoCompleto;

    // Regra: o cep deve ser formatado como XXXXX-XXX
    worksheet.getCell('AL15').value = formatCep(infracaoData.cep);

    worksheet.getCell('N17').value = infracaoData.bairro;
    worksheet.getCell('E17').value = infracaoData.numero;
    
    if (infracaoData.proveniencia) {
        worksheet.getCell('B21').value = infracaoData.proveniencia.toUpperCase();
    }
    
    const dataHora = new Date(infracaoData.momento);
    worksheet.getCell('AE21').value = dataHora.toLocaleDateString('pt-BR');
    worksheet.getCell('AP21').value = dataHora.toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit'
    });

    const localInfracao = infracaoData.camera_local || infracaoData.evento_local || 'Local não informado';
    worksheet.getCell('D24').value = localInfracao;
    worksheet.getCell('E26').value = "S/N"
    worksheet.getCell('N26').value = infracaoData.camera_bairro;
    worksheet.getCell('AL26').value = infracaoData.camera_zona;

    const textoFlagrante = `FLAGRANTE REALIZADO POR VIDEOMONITORAMENTO, VEÍCULO ${infracaoData.veiculo_marca_modelo || 'NÃO IDENTIFICADO'} DE PLACA ${formatPlaca(infracaoData.placa) || 'NÃO IDENTIFICADA'}`;
    worksheet.getCell('F42').value = textoFlagrante;
    
    return workbook;
  }
}

export default new InfracaoService();