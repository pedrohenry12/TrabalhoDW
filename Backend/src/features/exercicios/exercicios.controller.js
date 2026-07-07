class ExercicioController {
  constructor(exercicioService) {
    this.exercicioService = exercicioService
  }

  async findAll(req, res) {
    const exercicios = await this.exercicioService.findAll()
    return res.status(200).send(exercicios)
  }

  async findById(req, res) {
    const { id } = req.params
    const exercicio = await this.exercicioService.findById(id)
    return res.status(200).send(exercicio)
  }

  async create(req, res) {
    const exercicio = await this.exercicioService.create(req.body)
    return res.status(201).send(exercicio)
  }

  async update(req, res) {
    const { id } = req.params
    const exercicio = await this.exercicioService.update(id, req.body)
    return res.status(200).send(exercicio)
  }

  async delete(req, res) {
    const { id } = req.params
    await this.exercicioService.delete(id)
    return res.status(204).send()
  }
}

export default ExercicioController