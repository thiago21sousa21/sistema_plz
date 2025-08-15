import pool from '../database/database.connection.js';

class FiscalRepository {
  /**
   * Busca todos os fiscais no banco de dados.
   */
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM `fiscal`');
    return rows;
  }

  /**
   * Busca um único fiscal pelo seu ID.
   */
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM `fiscal` WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Cria um novo fiscal no banco de dados.
   */
  async create(fiscalData) {
    const { id, nome, matricula, codigo } = fiscalData;
    await pool.query(
      'INSERT INTO `fiscal` (id, nome, matricula, codigo) VALUES (?, ?, ?, ?)',
      [id, nome, matricula, codigo]
    );
    return { id, ...fiscalData };
  }

  /**
   * Atualiza os dados de um fiscal existente.
   */
  async update(id, fiscalData) {
    const { nome, matricula, codigo } = fiscalData;
    const [result] = await pool.query(
      'UPDATE `fiscal` SET nome = ?, matricula = ?, codigo = ? WHERE id = ?',
      [nome, matricula, codigo, id]
    );
    return result;
  }

  /**
   * Deleta um fiscal do banco de dados.
   */
  async delete(id) {
    const [result] = await pool.query('DELETE FROM `fiscal` WHERE id = ?', [id]);
    return result;
  }
}

export default new FiscalRepository();