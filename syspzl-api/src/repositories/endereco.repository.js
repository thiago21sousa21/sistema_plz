import pool from '../database/database.connection.js';

class EnderecoRepository {
  // Busca um endereço pelo ID do AUTUADO, que é o mais comum
  async findByAutuadoId(autuadoId) {
    const [rows] = await pool.query('SELECT * FROM `endereco` WHERE autuado_id = ?', [autuadoId]);
    return rows[0];
  }

  async create(enderecoData) {
    const { autuado_id, estado, cidade, cep, bairro, logradouro, numero, complemento } = enderecoData;
    const [result] = await pool.query(
      `INSERT INTO endereco (autuado_id, estado, cidade, cep, bairro, logradouro, numero, complemento) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [autuado_id, estado, cidade, cep, bairro, logradouro, numero, complemento]
    );
    return { id: result.insertId, ...enderecoData };
  }

  async update(id, enderecoData) {
    const { estado, cidade, cep, bairro, logradouro, numero, complemento } = enderecoData;
    const [result] = await pool.query(
      `UPDATE endereco SET estado = ?, cidade = ?, cep = ?, bairro = ?, 
       logradouro = ?, numero = ?, complemento = ? WHERE id = ?`,
      [estado, cidade, cep, bairro, logradouro, numero, complemento, id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM `endereco` WHERE id = ?', [id]);
    return result;
  }

  async deleteByAutuadoId(autuadoId, connection = pool) {
    const [result] = await connection.query('DELETE FROM `endereco` WHERE autuado_id = ?', [autuadoId]);
    return result;
  }
}

export default new EnderecoRepository();