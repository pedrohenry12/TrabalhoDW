class TreinoExercicioRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findByTreinoId(treinoId) {
    const result = await this.pool.query(`
      SELECT
        exercicio.id AS exercicio_id,
        exercicio.nome,
        exercicio.grupo_muscular,
        exercicio.descricao,
        treino_exercicio.series,
        treino_exercicio.repeticoes
      FROM treino_exercicio
      INNER JOIN exercicio ON treino_exercicio.exercicio_id = exercicio.id
      WHERE treino_exercicio.treino_id = $1
      ORDER BY exercicio.nome
    `, [treinoId])
    return result.rows
  }

  async findLink(treinoId, exercicioId) {
    const result = await this.pool.query(
      'SELECT * FROM treino_exercicio WHERE treino_id = $1 AND exercicio_id = $2',
      [treinoId, exercicioId]
    )
    return result.rows[0]
  }

  async create(treinoId, exercicioId, series, repeticoes) {
    const result = await this.pool.query(
      `INSERT INTO treino_exercicio (treino_id, exercicio_id, series, repeticoes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [treinoId, exercicioId, series, repeticoes]
    )
    return result.rows[0]
  }

  async update(treinoId, exercicioId, data) {
    const { series, repeticoes } = data
    const result = await this.pool.query(
      `UPDATE treino_exercicio SET
        series = COALESCE($1, series),
        repeticoes = COALESCE($2, repeticoes)
       WHERE treino_id = $3 AND exercicio_id = $4 RETURNING *`,
      [series, repeticoes, treinoId, exercicioId]
    )
    return result.rows[0]
  }

  async delete(treinoId, exercicioId) {
    await this.pool.query(
      'DELETE FROM treino_exercicio WHERE treino_id = $1 AND exercicio_id = $2',
      [treinoId, exercicioId]
    )
  }
}

export default TreinoExercicioRepository