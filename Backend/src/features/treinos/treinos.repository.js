class TreinoRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findAll() {
    const result = await this.pool.query(`
      SELECT id, nome, descricao
      FROM treino
      ORDER BY id
    `)
    return result.rows
  }

  async findById(id) {
    const result = await this.pool.query(
      'SELECT id, nome, descricao FROM treino WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }

  async findByNome(nome) {
    const result = await this.pool.query(
      'SELECT id FROM treino WHERE nome = $1',
      [nome]
    )
    return result.rows[0]
  }

  async isVinculadoAAluno(id) {
    const result = await this.pool.query(
      'SELECT 1 FROM aluno_treino WHERE treino_id = $1 LIMIT 1',
      [id]
    )
    return result.rows.length > 0
  }

  async create(data) {
    const { nome, descricao } = data
    const result = await this.pool.query(
      'INSERT INTO treino (nome, descricao) VALUES ($1, $2) RETURNING *',
      [nome, descricao]
    )
    return result.rows[0]
  }

  async update(id, data) {
    const { nome, descricao } = data
    const result = await this.pool.query(
      `UPDATE treino SET
        nome = COALESCE($1, nome),
        descricao = COALESCE($2, descricao)
       WHERE id = $3 RETURNING *`,
      [nome, descricao, id]
    )
    return result.rows[0]
  }

  async delete(id) {
    await this.pool.query('DELETE FROM treino WHERE id = $1', [id])
  }
}

export default TreinoRepository