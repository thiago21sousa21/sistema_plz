import autuadoRepository from '../repositories/autuado.repository.js';
import fiscalRepository from '../repositories/fiscal.repository.js';
import enderecoRepository from '../repositories/endereco.repository.js';
import veiculoRepository from '../repositories/veiculo.repository.js';
import infracaoRepository from '../repositories/infracao.repository.js';
import pool from '../database/database.connection.js';

class AutuadoService {
  async getAllAutuados() {
    return await autuadoRepository.findAll();
  }

  async getAutuadoById(id) {
    const autuado = await autuadoRepository.findById(id);
    if (!autuado) {
      const error = new Error('Autuado não encontrado.');
      error.statusCode = 404;
      throw error;
    }
    return autuado;
  }

  async createAutuado(autuadoData) {
    // Verifica se o CPF/CNPJ já está cadastrado
    const existingAutuado = await autuadoRepository.findByCpfCnpj(autuadoData.cpf_cnpj);
    if (existingAutuado) {
      const error = new Error(`O CPF/CNPJ ${autuadoData.cpf_cnpj} já está cadastrado.`);
      error.statusCode = 409; // Conflict
      throw error;
    }

    // Verifica se o fiscal existe, se um ID for fornecido
    if (autuadoData.fiscal_id) {
      const fiscal = await fiscalRepository.findById(autuadoData.fiscal_id);
      if (!fiscal) {
        const error = new Error(`O fiscal com ID ${autuadoData.fiscal_id} não existe.`);
        error.statusCode = 400;
        throw error;
      }
    }
    
    return await autuadoRepository.create(autuadoData);
  }

  async updateAutuado(id, autuadoData) {
    await this.getAutuadoById(id); // Garante que o autuado a ser atualizado existe
    
    // Lógica de verificação para o update
    const existingAutuado = await autuadoRepository.findByCpfCnpj(autuadoData.cpf_cnpj);
    if (existingAutuado && existingAutuado.id !== parseInt(id, 10)) {
        const error = new Error(`O CPF/CNPJ ${autuadoData.cpf_cnpj} já pertence a outro cadastro.`);
        error.statusCode = 409;
        throw error;
    }

    if (autuadoData.fiscal_id) {
        const fiscal = await fiscalRepository.findById(autuadoData.fiscal_id);
        if (!fiscal) {
            const error = new Error(`O fiscal com ID ${autuadoData.fiscal_id} não existe.`);
            error.statusCode = 400;
            throw error;
        }
    }

    return await autuadoRepository.update(id, autuadoData);
  }

  async deleteAutuado(id) {
    // 1. Garante que o autuado que queremos deletar realmente existe
    await this.getAutuadoById(id);

    // 2. Pega uma conexão única do pool que será usada para TODA a operação
    const connection = await pool.getConnection();
    
    try {
      // 3. Inicia a transação. A partir daqui, nada é permanente até o 'commit'.
      await connection.beginTransaction();

      // 4. Deleta os registros "filhos", passando a MESMA conexão para todos
      // A ordem aqui não importa muito, desde que seja antes de deletar o autuado.
      await infracaoRepository.deleteByAutuadoId(id, connection);
      await enderecoRepository.deleteByAutuadoId(id, connection);
      await veiculoRepository.deleteByAutuadoId(id, connection);

      // 5. Finalmente, deleta o "pai" (autuado), também na mesma conexão
      await autuadoRepository.delete(id, connection);

      // 6. Se todos os 'delete' acima funcionaram sem erro, efetiva as mudanças no banco.
      await connection.commit();

    } catch (error) {
      // 7. Se QUALQUER um dos passos acima falhar, desfaz todas as operações anteriores.
      await connection.rollback();
      
      // Propaga o erro para que o controller possa enviá-lo como resposta da API
      throw error;
    } finally {
      // 8. Aconteça o que acontecer (sucesso ou erro), libera a conexão de volta para o pool.
      connection.release();
    }
  }

  async getAutuadoByCpfCnpj(cpfCnpj) {
    const autuado = await autuadoRepository.findByCpfCnpj(cpfCnpj);
    // Não é um erro se não encontrar, apenas retorna nulo ou o objeto encontrado
    return autuado;
  }

  async searchAutuado(query) {
    return await autuadoRepository.search(query);
  }

}

export default new AutuadoService();