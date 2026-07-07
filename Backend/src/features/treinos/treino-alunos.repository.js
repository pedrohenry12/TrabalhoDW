class AlunoTreinoRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findByTreinoId(treinoId) {
    const result = await this.pool.query(`
      SELECT
        aluno.id AS aluno_id,
        aluno.nome,
        aluno.email,
        aluno_treino.data_inicio
      FROM aluno_treino
      INNER JOIN aluno ON aluno_treino.aluno_id = aluno.id
      WHERE aluno_treino.treino_id = $1
      ORDER BY aluno.nome
    `, [treinoId])
    return result.rows
  }

  async findLink(alunoId, treinoId) {
    const result = await this.pool.query(
      'SELECT * FROM aluno_treino WHERE aluno_id = $1 AND treino_id = $2',
      [alunoId, treinoId]
    )
    return result.rows[0]
  }

  async create(alunoId, treinoId, dataInicio) {
    const result = await this.pool.query(
      dataInicio
        ? `INSERT INTO aluno_treino (aluno_id, treino_id, data_inicio) VALUES ($1, $2, $3) RETURNING *`
        : `INSERT INTO aluno_treino (aluno_id, treino_id) VALUES ($1, $2) RETURNING *`,
      dataInicio ? [alunoId, treinoId, dataInicio] : [alunoId, treinoId]
    )
    return result.rows[0]
  }

  async delete(alunoId, treinoId) {
    await this.pool.query(
      'DELETE FROM aluno_treino WHERE aluno_id = $1 AND treino_id = $2',
      [alunoId, treinoId]
    )
  }
}

export default AlunoTreinoRepository