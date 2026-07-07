import AppError from '../../errors/App-error.js'

class ExercicioService {
  constructor(exercicioRepository) {
    this.exercicioRepository = exercicioRepository
  }

  async findAll() {
    return this.exercicioRepository.findAll()
  }

  async findById(id) {
    const exercicio = await this.exercicioRepository.findById(id)
    if (!exercicio) {
      throw new AppError('Exercício não encontrado', 404)
    }
    return exercicio
  }

  async create(data) {
    if (!data.nome) {
      throw new AppError('O campo nome é obrigatório', 400)
    }

    const nomeJaExiste = await this.exercicioRepository.findByNome(data.nome)
    if (nomeJaExiste) {
      throw new AppError('Já existe um exercício cadastrado com esse nome', 409)
    }

    return this.exercicioRepository.create(data)
  }

  async update(id, data) {
    const exercicio = await this.exercicioRepository.findById(id)
    if (!exercicio) {
      throw new AppError('Exercício não encontrado', 404)
    }

    if (data.nome) {
      const nomeJaExiste = await this.exercicioRepository.findByNome(data.nome)
      if (nomeJaExiste && nomeJaExiste.id !== Number(id)) {
        throw new AppError('Já existe um exercício cadastrado com esse nome', 409)
      }
    }

    return this.exercicioRepository.update(id, data)
  }

  async delete(id) {
    const exercicio = await this.exercicioRepository.findById(id)
    if (!exercicio) {
      throw new AppError('Exercício não encontrado', 404)
    }

    const vinculado = await this.exercicioRepository.isVinculadoATreino(id)
    if (vinculado) {
      throw new AppError('Não é possível excluir um exercício vinculado a um treino', 409)
    }

    await this.exercicioRepository.delete(id)
  }
}

export default ExercicioService