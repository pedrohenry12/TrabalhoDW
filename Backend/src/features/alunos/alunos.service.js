import AppError from '../../errors/App-error.js'

class AlunoService {
  constructor(alunoRepository, planoRepository) {
    this.alunoRepository = alunoRepository
    this.planoRepository = planoRepository
  }

  async findAll() {
    return this.alunoRepository.findAll()
  }

  async findCompleto(id) {
  const aluno = await this.alunoRepository.findCompleto(id)
  if (!aluno) {
    throw new AppError('Aluno não encontrado', 404)
  }
  return aluno
}

  async findById(id) {
    const aluno = await this.alunoRepository.findById(id)
    if (!aluno) {
      throw new AppError('Aluno não encontrado', 404)
    }
    return aluno
  }

  async create(data) {
    const emailJaExiste = await this.alunoRepository.findByEmail(data.email)
    if (emailJaExiste) {
      throw new AppError('Já existe um aluno cadastrado com esse e-mail', 409)
    }

    const planoExiste = await this.planoRepository.findById(data.plano_id)
    if (!planoExiste) {
      throw new AppError('Plano não encontrado', 404)
    }

    return this.alunoRepository.create(data)
  }

  async update(id, data) {
    const aluno = await this.alunoRepository.findById(id)
    if (!aluno) {
      throw new AppError('Aluno não encontrado', 404)
    }

    if (data.email) {
      const emailJaExiste = await this.alunoRepository.findByEmail(data.email)
      if (emailJaExiste && emailJaExiste.id !== Number(id)) {
        throw new AppError('Já existe um aluno cadastrado com esse e-mail', 409)
      }
    }

    if (data.plano_id) {
      const planoExiste = await this.planoRepository.findById(data.plano_id)
      if (!planoExiste) {
        throw new AppError('Plano não encontrado', 404)
      }
    }

    return this.alunoRepository.update(id, data)
  }

  async delete(id) {
    const aluno = await this.alunoRepository.findById(id)
    if (!aluno) {
      throw new AppError('Aluno não encontrado', 404)
    }
    await this.alunoRepository.delete(id)
  }
}

export default AlunoService