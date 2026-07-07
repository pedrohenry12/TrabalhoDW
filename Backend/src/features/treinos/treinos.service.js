import AppError from '../../errors/App-error.js'

class TreinoService {
  constructor(treinoRepository) {
    this.treinoRepository = treinoRepository
  }

  async findAll() {
    return this.treinoRepository.findAll()
  }

  async findById(id) {
    const treino = await this.treinoRepository.findById(id)
    if (!treino) {
      throw new AppError('Treino não encontrado', 404)
    }
    return treino
  }

  async create(data) {
    if (!data.nome) {
      throw new AppError('O campo nome é obrigatório', 400)
    }

    const nomeJaExiste = await this.treinoRepository.findByNome(data.nome)
    if (nomeJaExiste) {
      throw new AppError('Já existe um treino cadastrado com esse nome', 409)
    }

    return this.treinoRepository.create(data)
  }

  async update(id, data) {
    const treino = await this.treinoRepository.findById(id)
    if (!treino) {
      throw new AppError('Treino não encontrado', 404)
    }

    if (data.nome) {
      const nomeJaExiste = await this.treinoRepository.findByNome(data.nome)
      if (nomeJaExiste && nomeJaExiste.id !== Number(id)) {
        throw new AppError('Já existe um treino cadastrado com esse nome', 409)
      }
    }

    return this.treinoRepository.update(id, data)
  }

  async delete(id) {
    const treino = await this.treinoRepository.findById(id)
    if (!treino) {
      throw new AppError('Treino não encontrado', 404)
    }

    const vinculado = await this.treinoRepository.isVinculadoAAluno(id)
    if (vinculado) {
      throw new AppError('Não é possível excluir um treino vinculado a um aluno', 409)
    }

    await this.treinoRepository.delete(id)
  }
}

export default TreinoService