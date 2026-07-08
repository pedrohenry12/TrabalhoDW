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

  async findCompleto(id) {
  const aluno = await this.pool.query(`
    SELECT aluno.id, aluno.nome, aluno.email, aluno.telefone, aluno.criado_em,
           plano.nome AS plano_nome, plano.preco AS plano_preco,
           avaliacao_fisica.peso_kg, avaliacao_fisica.altura_cm,
           avaliacao_fisica.percentual_gordura, avaliacao_fisica.data_avaliacao
    FROM aluno
    INNER JOIN plano ON aluno.plano_id = plano.id
    LEFT JOIN avaliacao_fisica ON avaliacao_fisica.aluno_id = aluno.id
    WHERE aluno.id = $1
  `, [id])

  if (!aluno.rows[0]) return null

  const treinos = await this.pool.query(`
    SELECT treino.id AS treino_id, treino.nome AS treino_nome,
           aluno_treino.data_inicio,
           exercicio.id AS exercicio_id, exercicio.nome AS exercicio_nome,
           exercicio.grupo_muscular,
           treino_exercicio.series, treino_exercicio.repeticoes
    FROM aluno_treino
    INNER JOIN treino ON aluno_treino.treino_id = treino.id
    LEFT JOIN treino_exercicio ON treino_exercicio.treino_id = treino.id
    LEFT JOIN exercicio ON exercicio.id = treino_exercicio.exercicio_id
    WHERE aluno_treino.aluno_id = $1
    ORDER BY treino.id
  `, [id])

  const dados = aluno.rows[0]

  const treinosMap = {}
  for (const row of treinos.rows) {
    if (!treinosMap[row.treino_id]) {
      treinosMap[row.treino_id] = {
        id: row.treino_id,
        nome: row.treino_nome,
        data_inicio: row.data_inicio,
        exercicios: []
      }
    }
    if (row.exercicio_id) {
      treinosMap[row.treino_id].exercicios.push({
        id: row.exercicio_id,
        nome: row.exercicio_nome,
        grupo_muscular: row.grupo_muscular,
        series: row.series,
        repeticoes: row.repeticoes
      })
    }
  }

  return {
    id: dados.id,
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone,
    criado_em: dados.criado_em,
    plano: {
      nome: dados.plano_nome,
      preco: dados.plano_preco
    },
    avaliacao_fisica: dados.peso_kg ? {
      peso_kg: dados.peso_kg,
      altura_cm: dados.altura_cm,
      percentual_gordura: dados.percentual_gordura,
      data_avaliacao: dados.data_avaliacao
    } : null,
    treinos: Object.values(treinosMap)
  }
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