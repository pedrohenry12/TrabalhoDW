class PlanoRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findAll(){
    const resultado = await this.pool.query(
      `SELECT plano.id, plano.nome, plano.duracao_dias, plano.preco
      FROM plano`
    )

    return resultado.rows
  }

  async findById(id) {
    const result = await this.pool.query(
      'SELECT * FROM plano WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }

 async findByName(nome) {
  const result = await this.pool.query(
    'SELECT id FROM plano WHERE nome = $1',
    [nome]
  )
  return result.rows[0]
}

  async create(data){
    const {nome, duracao_dias, preco} = data
    const resultado = await this.pool.query(
      `INSERT INTO plano(nome, duracao_dias, preco) VALUES($1, $2, $3) RETURNING*`,
      [nome, duracao_dias, preco]
    )
  }

async update(id, data) {
  const { nome, duracao_dias, preco } = data
  const result = await this.pool.query(
    `UPDATE plano SET
      nome = COALESCE($1, nome),
      duracao_dias = COALESCE($2, duracao_dias),
      preco = COALESCE($3, preco)
     WHERE id = $4 RETURNING *`,
    [nome, duracao_dias, preco, id]
  )
  return result.rows[0]
}

  async delete(id){
    await this.pool.query('DELETE FROM plano WHERE id = $1', [id])
  }


}

export default PlanoRepository