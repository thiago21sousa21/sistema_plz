import pool from '../database/database.connection.js';

class VeiculoRepository {
  // Busca todos os veículos de um autuado específico
  async findByAutuadoId(autuadoId) {
    const [rows] = await pool.query('SELECT * FROM `veiculo` WHERE autuado_id = ?', [autuadoId]);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM `veiculo` WHERE id = ?', [id]);
    return rows[0];
  }

  async findByPlaca(placa) {
    const [rows] = await pool.query('SELECT * FROM `veiculo` WHERE placa = ?', [placa]);
    return rows[0];
  }

  async create(veiculoData) {
    const { autuado_id, placa, marca_modelo } = veiculoData;
    const [result] = await pool.query(
      'INSERT INTO `veiculo` (autuado_id, placa, marca_modelo) VALUES (?, ?, ?)',
      [autuado_id, placa, marca_modelo]
    );
    return { id: result.insertId, ...veiculoData };
  }

  async update(id, veiculoData) {
    const { placa, marca_modelo } = veiculoData;
    const [result] = await pool.query(
      'UPDATE `veiculo` SET placa = ?, marca_modelo = ? WHERE id = ?',
      [placa, marca_modelo, id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM `veiculo` WHERE id = ?', [id]);
    return result;
  }
}

export default new VeiculoRepository();