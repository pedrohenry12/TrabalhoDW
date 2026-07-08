class AlunoController {
  constructor(alunoService) {
    this.alunoService = alunoService
  }

  async findAll(req, res) {
    const alunos = await this.alunoService.findAll()
    return res.status(200).send(alunos)
  }

  async findCompleto(req, res) {
  const { id } = req.params
  const aluno = await this.alunoService.findCompleto(id)
  return res.status(200).send(aluno)
}

  async findById(req, res) {
    const { id } = req.params
    const aluno = await this.alunoService.findById(id)
    return res.status(200).send(aluno)
  }

  async create(req, res) {
    const aluno = await this.alunoService.create(req.body)
    return res.status(201).send(aluno)
  }

  async update(req, res) {
    const { id } = req.params
    const aluno = await this.alunoService.update(id, req.body)
    return res.status(200).send(aluno)
  }

  async delete(req, res) {
    const { id } = req.params
    await this.alunoService.delete(id)
    return res.status(204).send()
  }
}

export default AlunoController