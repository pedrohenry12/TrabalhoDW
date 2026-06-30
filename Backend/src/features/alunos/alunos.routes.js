import pool from '../../database/pool.js'
import AlunoRepository from './alunos.repository.js'
import AlunoService from './alunos.service.js'
import AlunoController from './alunos.controller.js'
import PlanoRepository from '../planos/planos.repository.js'

const alunoRepository = new AlunoRepository(pool)
const planoRepository = new PlanoRepository(pool)
const alunoService = new AlunoService(alunoRepository, planoRepository)
const alunoController = new AlunoController(alunoService)

export default async function alunoRoutes(app) {
  app.get('/alunos', (req, res) => alunoController.findAll(req, res))
  app.get('/alunos/:id', (req, res) => alunoController.findById(req, res))
  app.post('/alunos', (req, res) => alunoController.create(req, res))
  app.patch('/alunos/:id', (req, res) => alunoController.update(req, res))
  app.delete('/alunos/:id', (req, res) => alunoController.delete(req, res))
}