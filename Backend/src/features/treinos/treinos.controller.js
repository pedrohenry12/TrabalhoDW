class TreinoController {
  constructor(treinoService) {
    this.treinoService = treinoService
  }

  async findAll(req, res) {
    const treinos = await this.treinoService.findAll()
    return res.status(200).send(treinos)
  }

  async findById(req, res) {
    const { id } = req.params
    const treino = await this.treinoService.findById(id)
    return res.status(200).send(treino)
  }

  async create(req, res) {
    const treino = await this.treinoService.create(req.body)
    return res.status(201).send(treino)
  }

  async update(req, res) {
    const { id } = req.params
    const treino = await this.treinoService.update(id, req.body)
    return res.status(200).send(treino)
  }

  async delete(req, res) {
    const { id } = req.params
    await this.treinoService.delete(id)
    return res.status(204).send()
  }
}

export default TreinoController