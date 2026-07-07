class TreinoExercicioController {
  constructor(treinoExercicioService) {
    this.treinoExercicioService = treinoExercicioService
  }

  async listar(req, res) {
    const { treinoId } = req.params
    const exercicios = await this.treinoExercicioService.listar(treinoId)
    return res.status(200).send(exercicios)
  }

  async vincular(req, res) {
    const { treinoId } = req.params
    const vinculo = await this.treinoExercicioService.vincular(treinoId, req.body)
    return res.status(201).send(vinculo)
  }

  async atualizar(req, res) {
    const { treinoId, exercicioId } = req.params
    const vinculo = await this.treinoExercicioService.atualizar(treinoId, exercicioId, req.body)
    return res.status(200).send(vinculo)
  }

  async desvincular(req, res) {
    const { treinoId, exercicioId } = req.params
    await this.treinoExercicioService.desvincular(treinoId, exercicioId)
    return res.status(204).send()
  }
}

export default TreinoExercicioController