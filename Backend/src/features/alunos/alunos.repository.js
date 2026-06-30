class AlunoRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findAll() {
    const result = await this.pool.query(`
      SELECT aluno.id, aluno.nome, aluno.email, aluno.telefone, aluno.criado_em,
             plano.nome AS plano_nome, plano.preco AS plano_preco
      FROM aluno
      INNER JOIN plano ON aluno.plano_id = plano.id
    `)
    return result.rows
  }

  async findById(id) {
    const result = await this.pool.query(`
      SELECT aluno.id, aluno.nome, aluno.email, aluno.telefone, aluno.criado_em,
             plano.nome AS plano_nome, plano.preco AS plano_preco
      FROM aluno
      INNER JOIN plano ON aluno.plano_id = plano.id
      WHERE aluno.id = $1
    `, [id])
    return result.rows[0]
  }

  async findByEmail(email) {
    const result = await this.pool.query(
      'SELECT id FROM aluno WHERE email = $1',
      [email]
    )
    return result.rows[0]
  }

  async create(data) {
    const { nome, email, telefone, plano_id } = data
    const result = await this.pool.query(
      'INSERT INTO aluno (nome, email, telefone, plano_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, telefone, plano_id]
    )
    return result.rows[0]
  }

  async update(id, data) {
    const { nome, email, telefone, plano_id } = data
    const result = await this.pool.query(
      `UPDATE aluno SET
        nome = COALESCE($1, nome),
        email = COALESCE($2, email),
        telefone = COALESCE($3, telefone),
        plano_id = COALESCE($4, plano_id)
       WHERE id = $5 RETURNING *`,
      [nome, email, telefone, plano_id, id]
    )
    return result.rows[0]
  }

  async delete(id) {
    await this.pool.query('DELETE FROM aluno WHERE id = $1', [id])
  }
}

export default AlunoRepository