class AvaliacaoFisicaController {
  constructor(avaliacaoFisicaService) {
    this.avaliacaoFisicaService = avaliacaoFisicaService
  }

  async findAll(req, res) {
    const avaliacoes = await this.avaliacaoFisicaService.findAll()
    return res.status(200).send(avaliacoes)
  }

  async findById(req, res) {
    const { id } = req.params
    const avaliacao = await this.avaliacaoFisicaService.findById(id)
    return res.status(200).send(avaliacao)
  }

  async create(req, res) {
    const avaliacao = await this.avaliacaoFisicaService.create(req.body)
    return res.status(201).send(avaliacao)
  }

  async update(req, res) {
    const { id } = req.params
    const avaliacao = await this.avaliacaoFisicaService.update(id, req.body)
    return res.status(200).send(avaliacao)
  }

  async delete(req, res) {
    const { id } = req.params
    await this.avaliacaoFisicaService.delete(id)
    return res.status(204).send()
  }
}

export default AvaliacaoFisicaController