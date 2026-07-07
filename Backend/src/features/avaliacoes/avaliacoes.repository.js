class AvaliacaoFisicaRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findAll() {
    const result = await this.pool.query(`
      SELECT avaliacao_fisica.id, avaliacao_fisica.peso_kg, avaliacao_fisica.altura_cm,
             avaliacao_fisica.percentual_gordura, avaliacao_fisica.data_avaliacao,
             aluno.nome AS aluno_nome, aluno.email AS aluno_email
      FROM avaliacao_fisica
      INNER JOIN aluno ON avaliacao_fisica.aluno_id = aluno.id
    `)
    return result.rows
  }

  async findById(id) {
    const result = await this.pool.query(`
      SELECT avaliacao_fisica.id, avaliacao_fisica.peso_kg, avaliacao_fisica.altura_cm,
             avaliacao_fisica.percentual_gordura, avaliacao_fisica.data_avaliacao,
             aluno.nome AS aluno_nome, aluno.email AS aluno_email
      FROM avaliacao_fisica
      INNER JOIN aluno ON avaliacao_fisica.aluno_id = aluno.id
      WHERE avaliacao_fisica.id = $1
    `, [id])
    return result.rows[0]
  }

  async findByAlunoId(aluno_id) {
    const result = await this.pool.query(
      'SELECT id FROM avaliacao_fisica WHERE aluno_id = $1',
      [aluno_id]
    )
    return result.rows[0]
  }

  async create(data) {
    const { aluno_id, peso_kg, altura_cm, percentual_gordura } = data
    const result = await this.pool.query(
      `INSERT INTO avaliacao_fisica (aluno_id, peso_kg, altura_cm, percentual_gordura)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [aluno_id, peso_kg, altura_cm, percentual_gordura]
    )
    return result.rows[0]
  }

  async update(id, data) {
    const { peso_kg, altura_cm, percentual_gordura } = data
    const result = await this.pool.query(
      `UPDATE avaliacao_fisica SET
        peso_kg = COALESCE($1, peso_kg),
        altura_cm = COALESCE($2, altura_cm),
        percentual_gordura = COALESCE($3, percentual_gordura),
        data_avaliacao = CURRENT_DATE
       WHERE id = $4 RETURNING *`,
      [peso_kg, altura_cm, percentual_gordura, id]
    )
    return result.rows[0]
  }

  async delete(id) {
    await this.pool.query('DELETE FROM avaliacao_fisica WHERE id = $1', [id])
  }
}

export default AvaliacaoFisicaRepository