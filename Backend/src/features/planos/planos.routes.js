import pool from '../../database/pool.js'
import PlanoRepository from './planos.repository.js'
import PlanoController from './planos.controller.js'
import PlanoService from './planos.service.js'


const planoRepository = new PlanoRepository(pool)
const planoService = new PlanoService(planoRepository)
const planoController = new PlanoController(planoService)

export default async function planoRoutes(app) {
  app.get('/planos', (req, res) => planoController.findAll(req, res))
  app.get('/planos/:id', (req, res) => planoController.findById(req, res))
  app.post('/planos', (req, res) => planoController.create(req, res))
  app.patch('/planos/:id', (req, res) => planoController.update(req, res))
  app.delete('/planos/:id', (req, res) => planoController.delete(req, res))
}