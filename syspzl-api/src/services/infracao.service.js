import infracaoRepository from '../repositories/infracao.repository.js';
import eventoService from './evento.service.js'; // Usaremos para atualizar o status do evento

class InfracaoService {
  async getAllInfracoesDetailed(filters) {
    return await infracaoRepository.findAllDetailed(filters);
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
}

export default new InfracaoService();