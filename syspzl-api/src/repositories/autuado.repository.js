import pool from '../database/database.connection.js';

class AutuadoRepository {
  async findAll() {
    const query = `
      SELECT 
        a.id, a.cpf_cnpj, a.autor, a.data,
        f.nome as fiscal_nome 
      FROM autuado a
      LEFT JOIN fiscal f ON a.fiscal_id = f.id
      ORDER BY a.data DESC;
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM `autuado` WHERE id = ?', [id]);
    return rows[0];
  }

  async findByCpfCnpj(cpfCnpj) {
    const [rows] = await pool.query('SELECT * FROM `autuado` WHERE cpf_cnpj = ?', [cpfCnpj]);
    return rows[0];
  }

  async create(autuadoData) {
    const { fiscal_id, cpf_cnpj, autor } = autuadoData;
    // O campo 'data' tem um DEFAULT CURRENT_TIMESTAMP, então não precisamos enviá-lo.
    const [result] = await pool.query(
      'INSERT INTO `autuado` (fiscal_id, cpf_cnpj, autor) VALUES (?, ?, ?)',
      [fiscal_id, cpf_cnpj, autor]
    );
    return { id: result.insertId, ...autuadoData };
  }

  async update(id, autuadoData) {
    const { fiscal_id, cpf_cnpj, autor } = autuadoData;
    const [result] = await pool.query(
      'UPDATE `autuado` SET fiscal_id = ?, cpf_cnpj = ?, autor = ? WHERE id = ?',
      [fiscal_id, cpf_cnpj, autor, id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM `autuado` WHERE id = ?', [id]);
    return result;
  }
}

export default new AutuadoRepository();