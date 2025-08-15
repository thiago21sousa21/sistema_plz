import pool from '../database/database.connection.js';

class CameraRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM `camera`');
    return rows;
  }

  async create(cameraData) {
    const {id, bairro, zona, local } = cameraData;
    const [result] = await pool.query(
      'INSERT INTO `camera` (id, bairro, zona, local) VALUES (?, ?, ?, ?)',
      [id, bairro, zona, local]
    );
    return { id: result.insertId, ...cameraData };
  }

    /**
   * Busca uma única câmera pelo seu ID.
   */
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM `camera` WHERE id = ?', [id]);
    return rows[0]; // Retorna o primeiro resultado ou undefined
  }

  /**
   * Atualiza os dados de uma câmera existente.
   */
  async update(id, cameraData) {
    const { bairro, zona, local } = cameraData;
    const [result] = await pool.query(
      'UPDATE `camera` SET bairro = ?, zona = ?, local = ? WHERE id = ?',
      [bairro, zona, local, id]
    );
    return result;
  }

  /**
   * Deleta uma câmera do banco de dados.
   */
  async delete(id) {
    const [result] = await pool.query('DELETE FROM `camera` WHERE id = ?', [id]);
    return result;
  }
}

export default new CameraRepository();
