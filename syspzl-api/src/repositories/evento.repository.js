import pool from '../database/database.connection.js';

class EventoRepository {
  async findAll() {
    // Usamos JOIN para buscar nomes em vez de apenas IDs
    const query = `
      SELECT 
        e.*, 
        f.nome AS fiscal_nome,
        c.local AS camera_local
      FROM evento e
      LEFT JOIN fiscal f ON e.fiscal_id = f.id
      LEFT JOIN camera c ON e.camera_id = c.id
      ORDER BY e.momento DESC;
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM `evento` WHERE id = ?', [id]);
    return rows[0];
  }

  async create(eventoData) {
    const { momento, proveniencia, placa, descricao, local, e_infracao, consultado, feito, tipo_veiculo, fiscal_id, camera_id } = eventoData;
    const [result] = await pool.query(
      `INSERT INTO evento (momento, proveniencia, placa, descricao, local, e_infracao, consultado, feito, tipo_veiculo, fiscal_id, camera_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [momento, proveniencia, placa, descricao, local, e_infracao, consultado, feito, tipo_veiculo, fiscal_id, camera_id]
    );
    return { id: result.insertId, ...eventoData };
  }

  async update(id, eventoData) {
    const { momento, proveniencia, placa, descricao, local, e_infracao, consultado, feito, tipo_veiculo, fiscal_id, camera_id } = eventoData;
    const [result] = await pool.query(
      `UPDATE evento SET momento = ?, proveniencia = ?, placa = ?, descricao = ?, local = ?, e_infracao = ?, 
       consultado = ?, feito = ?, tipo_veiculo = ?, fiscal_id = ?, camera_id = ? WHERE id = ?`,
      [momento, proveniencia, placa, descricao, local, e_infracao, consultado, feito, tipo_veiculo, fiscal_id, camera_id, id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM `evento` WHERE id = ?', [id]);
    return result;
  }

  async updateStatus(id, statusData) {
    const { consultado, feito } = statusData;
    // Constrói a query dinamicamente para atualizar apenas os campos fornecidos
    const fields = [];
    const values = [];
    if (consultado !== undefined) {
      fields.push('consultado = ?');
      values.push(consultado);
    }
    if (feito !== undefined) {
      fields.push('feito = ?');
      values.push(feito);
    }
    if (fields.length === 0) return; // Nada a fazer

    values.push(id); // Adiciona o ID para a cláusula WHERE

    const sql = `UPDATE evento SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    return result;
  }
}

export default new EventoRepository();