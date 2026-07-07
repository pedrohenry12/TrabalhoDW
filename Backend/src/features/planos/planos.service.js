import AppError from "../../errors/App-error.js"

class PlanoService {
    constructor(planoRepository){
        this.planoRepository = planoRepository
    }

    async findAll(){
        return this.planoRepository.findAll()
    }

    async findById(id){
    const plano = await this.planoRepository.findById(id)
        if (!plano) {
        throw new AppError('Plano não encontrado', 404)
    }
        return plano
    }

    async create(data){
        const nomeDoPlanoExiste = await this.planoRepository.findByName(data.nome)
    if (nomeDoPlanoExiste) {
      throw new AppError('Já existe um plano cadastrado com esse nome', 409)
    }

    return this.planoRepository.create(data)
    }

    async update(id, data){
    const plano = await this.planoRepository.findById(id)
    if (!plano) {
      throw new AppError('Plano não encontrado', 404)
    }

    if (data.nome) {
      const nomeDoPlanoExiste = await this.planoRepository.findByEmail(data.nome)
      if (nomeDoPlanoExiste && nomeDoPlanoExiste.id !== Number(id)) {
        throw new AppError('Já existe um plano cadastrado com esse nome', 409)
      }
    }

    return this.planoRepository.update(id, data)
    }

    async delete(id){
        const plano = await this.planoRepository.findById(id)
    if (!plano) {
      throw new AppError('Plano não encontrado', 404)
    }
    await this.planoRepository.delete(id)
    }

}

export default PlanoService