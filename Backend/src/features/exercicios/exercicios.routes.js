import pool from '../../database/pool.js'
import ExercicioRepository from './exercicios.repository.js'
import ExercicioService from './exercicios.service.js'
import ExercicioController from './exercicios.controller.js'

const exercicioRepository = new ExercicioRepository(pool)
const exercicioService = new ExercicioService(exercicioRepository)
const exercicioController = new ExercicioController(exercicioService)

export default async function exercicioRoutes(app) {
  app.get('/exercicios', (req, res) => exercicioController.findAll(req, res))
  app.get('/exercicios/:id', (req, res) => exercicioController.findById(req, res))
  app.post('/exercicios', (req, res) => exercicioController.create(req, res))
  app.patch('/exercicios/:id', (req, res) => exercicioController.update(req, res))
  app.delete('/exercicios/:id', (req, res) => exercicioController.delete(req, res))
}