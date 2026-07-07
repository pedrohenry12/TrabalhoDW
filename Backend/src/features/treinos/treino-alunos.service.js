import AppError from '../../errors/App-error.js'

class AlunoTreinoService {
  constructor(treinoRepository, alunoRepository, alunoTreinoRepository) {
    this.treinoRepository = treinoRepository
    this.alunoRepository = alunoRepository
    this.alunoTreinoRepository = alunoTreinoRepository
  }

  async listar(treinoId) {
    const treino = await this.treinoRepository.findById(treinoId)
    if (!treino) {
      throw new AppError('Treino não encontrado', 404)
    }
    return this.alunoTreinoRepository.findByTreinoId(treinoId)
  }

  async matricular(treinoId, data) {
    const { aluno_id, data_inicio } = data

    if (!aluno_id) {
      throw new AppError('O campo aluno_id é obrigatório', 400)
    }

    const treino = await this.treinoRepository.findById(treinoId)
    if (!treino) {
      throw new AppError('Treino não encontrado', 404)
    }

    const aluno = await this.alunoRepository.findById(aluno_id)
    if (!aluno) {
      throw new AppError('Aluno não encontrado', 404)
    }

    const linkExiste = await this.alunoTreinoRepository.findLink(aluno_id, treinoId)
    if (linkExiste) {
      throw new AppError('Esse aluno já está matriculado nesse treino', 409)
    }

    return this.alunoTreinoRepository.create(aluno_id, treinoId, data_inicio)
  }

  async desmatricular(treinoId, alunoId) {
    const linkExiste = await this.alunoTreinoRepository.findLink(alunoId, treinoId)
    if (!linkExiste) {
      throw new AppError('Matrícula desse aluno nesse treino não encontrada', 404)
    }

    await this.alunoTreinoRepository.delete(alunoId, treinoId)
  }
}

export default AlunoTreinoService