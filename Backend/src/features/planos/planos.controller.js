class PlanoController {
  constructor(planoService) {
    this.planoService = planoService
  }

  async findAll(req, res) {
    const planos = await this.planoService.findAll()
    return res.status(200).send(planos)
  }

  async findById(req, res) {
    const { id } = req.params
    const plano = await this.planoService.findById(id)
    return res.status(200).send(plano)
  }

  async create(req, res) {
    const plano = await this.planoService.create(req.body)
    return res.status(201).send(plano)
  }

  async update(req, res) {
    const { id } = req.params
    const plano = await this.planoService.update(id, req.body)
    return res.status(200).send(plano)
  }

  async delete(req, res) {
    const { id } = req.params
    await this.planoService.delete(id)
    return res.status(204).send()
  }
}

export default PlanoController