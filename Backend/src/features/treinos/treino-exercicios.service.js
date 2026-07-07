import AppError from '../../errors/App-error.js'

class TreinoExercicioService {
  constructor(treinoRepository, exercicioRepository, treinoExercicioRepository) {
    this.treinoRepository = treinoRepository
    this.exercicioRepository = exercicioRepository
    this.treinoExercicioRepository = treinoExercicioRepository
  }

  async listar(treinoId) {
    const treino = await this.treinoRepository.findById(treinoId)
    if (!treino) {
      throw new AppError('Treino não encontrado', 404)
    }
    return this.treinoExercicioRepository.findByTreinoId(treinoId)
  }

  async vincular(treinoId, data) {
    const { exercicio_id, series, repeticoes } = data

    if (!exercicio_id || !series || !repeticoes) {
      throw new AppError('Os campos exercicio_id, series e repeticoes são obrigatórios', 400)
    }

    const treino = await this.treinoRepository.findById(treinoId)
    if (!treino) {
      throw new AppError('Treino não encontrado', 404)
    }

    const exercicio = await this.exercicioRepository.findById(exercicio_id)
    if (!exercicio) {
      throw new AppError('Exercício não encontrado', 404)
    }

    const linkExiste = await this.treinoExercicioRepository.findLink(treinoId, exercicio_id)
    if (linkExiste) {
      throw new AppError('Esse exercício já está vinculado a esse treino', 409)
    }

    return this.treinoExercicioRepository.create(treinoId, exercicio_id, series, repeticoes)
  }

  async atualizar(treinoId, exercicioId, data) {
    const linkExiste = await this.treinoExercicioRepository.findLink(treinoId, exercicioId)
    if (!linkExiste) {
      throw new AppError('Vínculo entre treino e exercício não encontrado', 404)
    }

    return this.treinoExercicioRepository.update(treinoId, exercicioId, data)
  }

  async desvincular(treinoId, exercicioId) {
    const linkExiste = await this.treinoExercicioRepository.findLink(treinoId, exercicioId)
    if (!linkExiste) {
      throw new AppError('Vínculo entre treino e exercício não encontrado', 404)
    }

    await this.treinoExercicioRepository.delete(treinoId, exercicioId)
  }
}

export default TreinoExercicioService