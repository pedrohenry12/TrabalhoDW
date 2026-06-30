class PlanoRepository {
  constructor(pool) {
    this.pool = pool
  }

  async findById(id) {
    const result = await this.pool.query(
      'SELECT id FROM plano WHERE id = $1',
      [id]
    )
    return result.rows[0]
  }
}

export default PlanoRepository