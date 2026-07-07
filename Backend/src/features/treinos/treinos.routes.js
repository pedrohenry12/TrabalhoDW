import pool from '../../database/pool.js'
import TreinoRepository from './treinos.repository.js'
import TreinoService from './treinos.service.js'
import TreinoController from './treinos.controller.js'
import TreinoExercicioRepository from './treino-exercicios.repository.js'
import TreinoExercicioService from './treino-exercicios.service.js'
import TreinoExercicioController from './treino-exercicios.controller.js'
import TreinoAlunoRepository from './treino-alunos.repository.js'
import TreinoAlunoService from './treino-alunos.service.js'
import TreinoAlunoController from './treino-alunos.controller.js'
import ExercicioRepository from '../exercicios/exercicios.repository.js'
import AlunoRepository from '../alunos/alunos.repository.js'

const treinoRepository = new TreinoRepository(pool)
const exercicioRepository = new ExercicioRepository(pool)
const alunoRepository = new AlunoRepository(pool)

const treinoService = new TreinoService(treinoRepository)
const treinoController = new TreinoController(treinoService)

const treinoExercicioRepository = new TreinoExercicioRepository(pool)
const treinoExercicioService = new TreinoExercicioService(treinoRepository, exercicioRepository, treinoExercicioRepository)
const treinoExercicioController = new TreinoExercicioController(treinoExercicioService)

const treinoAlunoRepository = new TreinoAlunoRepository(pool)
const treinoAlunoService = new TreinoAlunoService(treinoRepository, alunoRepository, treinoAlunoRepository)
const treinoAlunoController = new TreinoAlunoController(treinoAlunoService)

export default async function treinoRoutes(app) {
  // CRUD de treino
  app.get('/treinos', (req, res) => treinoController.findAll(req, res))
  app.get('/treinos/:id', (req, res) => treinoController.findById(req, res))
  app.post('/treinos', (req, res) => treinoController.create(req, res))
  app.patch('/treinos/:id', (req, res) => treinoController.update(req, res))
  app.delete('/treinos/:id', (req, res) => treinoController.delete(req, res))

  // Vínculo N:N treino <-> exercicio
  app.get('/treinos/:treinoId/exercicios', (req, res) => treinoExercicioController.listar(req, res))
  app.post('/treinos/:treinoId/exercicios', (req, res) => treinoExercicioController.vincular(req, res))
  app.patch('/treinos/:treinoId/exercicios/:exercicioId', (req, res) => treinoExercicioController.atualizar(req, res))
  app.delete('/treinos/:treinoId/exercicios/:exercicioId', (req, res) => treinoExercicioController.desvincular(req, res))

  // Vínculo N:N aluno <-> treino (matrícula)
  app.get('/treinos/:treinoId/alunos', (req, res) => treinoAlunoController.listar(req, res))
  app.post('/treinos/:treinoId/alunos', (req, res) => treinoAlunoController.matricular(req, res))
  app.delete('/treinos/:treinoId/alunos/:alunoId', (req, res) => treinoAlunoController.desmatricular(req, res))
}