import AppError from '../../errors/App-error.js'

class AvaliacaoFisicaService {
  constructor(avaliacaoFisicaRepository, alunoRepository) {
    this.avaliacaoFisicaRepository = avaliacaoFisicaRepository
    this.alunoRepository = alunoRepository
  }

  async findAll() {
    return this.avaliacaoFisicaRepository.findAll()
  }

  async findById(id) {
    const avaliacao = await this.avaliacaoFisicaRepository.findById(id)
    if (!avaliacao) {
      throw new AppError('Avaliação física não encontrada', 404)
    }
    return avaliacao
  }

  async create(data) {
    const alunoExiste = await this.alunoRepository.findById(data.aluno_id)
    if (!alunoExiste) {
      throw new AppError('Aluno não encontrado', 404)
    }

    const avaliacaoJaExiste = await this.avaliacaoFisicaRepository.findByAlunoId(data.aluno_id)
    if (avaliacaoJaExiste) {
      throw new AppError('Esse aluno já possui uma avaliação física cadastrada', 409)
    }

    return this.avaliacaoFisicaRepository.create(data)
  }

  async update(id, data) {
    const avaliacao = await this.avaliacaoFisicaRepository.findById(id)
    if (!avaliacao) {
      throw new AppError('Avaliação física não encontrada', 404)
    }

    return this.avaliacaoFisicaRepository.update(id, data)
  }

  async delete(id) {
    const avaliacao = await this.avaliacaoFisicaRepository.findById(id)
    if (!avaliacao) {
      throw new AppError('Avaliação física não encontrada', 404)
    }
    await this.avaliacaoFisicaRepository.delete(id)
  }
}

export default AvaliacaoFisicaService