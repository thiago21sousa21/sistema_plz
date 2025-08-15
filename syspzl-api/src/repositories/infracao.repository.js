import pool from '../database/database.connection.js';

class InfracaoRepository {
  // O método create continua o mesmo
  async create(infracaoData) {
    const { evento_id, autuado_id, fiscal_id } = infracaoData;
    const [result] = await pool.query(
      'INSERT INTO `infracao` (evento_id, autuado_id, fiscal_id) VALUES (?, ?, ?)',
      [evento_id, autuado_id, fiscal_id]
    );
    return { id: result.insertId, ...infracaoData };
  }

  // O método antigo findAll será substituído pelo novo findAllDetailed
  async findAllDetailed(filters) {
    let query = `
      SELECT 
        i.id AS infracao_id,
        e.momento,
        e.placa,
        e.descricao AS evento_descricao,
        a.autor AS autuado_nome,
        a.cpf_cnpj,
        f.nome AS fiscal_nome,
        end.cidade,
        end.bairro
      FROM infracao i
      JOIN evento e ON i.evento_id = e.id
      JOIN autuado a ON i.autuado_id = a.id
      JOIN fiscal f ON i.fiscal_id = f.id
      LEFT JOIN endereco end ON a.id = end.autuado_id
    `;

    const whereClauses = [];
    const queryParams = [];

    if (filters.search) {
      const searchTerm = `%${filters.search}%`;
      whereClauses.push(`(e.placa LIKE ? OR a.autor LIKE ? OR a.cpf_cnpj LIKE ? OR e.descricao LIKE ?)`);
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }
    if (filters.fiscalId) {
      whereClauses.push(`f.id = ?`);
      queryParams.push(filters.fiscalId);
    }
    if (filters.dataInicio) {
        whereClauses.push(`DATE(e.momento) >= ?`);
        queryParams.push(filters.dataInicio);
    }
    if (filters.dataFim) {
        whereClauses.push(`DATE(e.momento) <= ?`);
        queryParams.push(filters.dataFim);
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    query += ` ORDER BY e.momento DESC`;
    
    const [rows] = await pool.query(query, queryParams);
    return rows;
  }
}

export default new InfracaoRepository();