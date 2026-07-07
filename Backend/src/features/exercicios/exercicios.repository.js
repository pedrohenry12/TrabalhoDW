class ExercicioRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findAll() {
    const result = await this.pool.query(`
      SELECT id, nome, grupo_muscular, descricao
      FROM exercicio
      ORDER BY id
    `)
    return result.rows
  }

  async findById(id) {
    const result = await this.pool.query(
      'SELECT id, nome, grupo_muscular, descricao FROM exercicio WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }

  async findByNome(nome) {
    const result = await this.pool.query(
      'SELECT id FROM exercicio WHERE nome = $1',
      [nome]
    )
    return result.rows[0]
  }

  async isVinculadoATreino(id) {
    const result = await this.pool.query(
      'SELECT 1 FROM treino_exercicio WHERE exercicio_id = $1 LIMIT 1',
      [id]
    )
    return result.rows.length > 0
  }

  async create(data) {
    const { nome, grupo_muscular, descricao } = data
    const result = await this.pool.query(
      'INSERT INTO exercicio (nome, grupo_muscular, descricao) VALUES ($1, $2, $3) RETURNING *',
      [nome, grupo_muscular, descricao]
    )
    return result.rows[0]
  }

  async update(id, data) {
    const { nome, grupo_muscular, descricao } = data
    const result = await this.pool.query(
      `UPDATE exercicio SET
        nome = COALESCE($1, nome),
        grupo_muscular = COALESCE($2, grupo_muscular),
        descricao = COALESCE($3, descricao)
       WHERE id = $4 RETURNING *`,
      [nome, grupo_muscular, descricao, id]
    )
    return result.rows[0]
  }

  async delete(id) {
    await this.pool.query('DELETE FROM exercicio WHERE id = $1', [id])
  }
}

export default ExercicioRepository