import pool from '../../database/pool.js'
import AvaliacaoFisicaRepository from './avaliacoes.repository.js'
import AvaliacaoFisicaService from './avaliacoes.service.js'
import AvaliacaoFisicaController from './avaliacoes.controller.js'
import AlunoRepository from '../alunos/alunos.repository.js'

const avaliacaoFisicaRepository = new AvaliacaoFisicaRepository(pool)
const alunoRepository = new AlunoRepository(pool)
const avaliacaoFisicaService = new AvaliacaoFisicaService(avaliacaoFisicaRepository, alunoRepository)
const avaliacaoFisicaController = new AvaliacaoFisicaController(avaliacaoFisicaService)

export default async function avaliacaoFisicaRoutes(app) {
  app.get('/avaliacoes', (req, res) => avaliacaoFisicaController.findAll(req, res))
  app.get('/avaliacoes/:id', (req, res) => avaliacaoFisicaController.findById(req, res))
  app.post('/avaliacoes', (req, res) => avaliacaoFisicaController.create(req, res))
  app.patch('/avaliacoes/:id', (req, res) => avaliacaoFisicaController.update(req, res))
  app.delete('/avaliacoes/:id', (req, res) => avaliacaoFisicaController.delete(req, res))
}