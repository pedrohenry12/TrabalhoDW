class AlunoTreinoController {
  constructor(alunoTreinoService) {
    this.alunoTreinoService = alunoTreinoService
  }

  async listar(req, res) {
    const { treinoId } = req.params
    const alunos = await this.alunoTreinoService.listar(treinoId)
    return res.status(200).send(alunos)
  }

  async matricular(req, res) {
    const { treinoId } = req.params
    const matricula = await this.alunoTreinoService.matricular(treinoId, req.body)
    return res.status(201).send(matricula)
  }

  async desmatricular(req, res) {
    const { treinoId, alunoId } = req.params
    await this.alunoTreinoService.desmatricular(treinoId, alunoId)
    return res.status(204).send()
  }
}

export default AlunoTreinoController