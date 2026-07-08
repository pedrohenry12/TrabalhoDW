import pool from '../../database/pool.js'
import PlanoRepository from './planos.repository.js'
import PlanoService from './planos.service.js'
import PlanoController from './planos.controller.js'

const planoRepository = new PlanoRepository(pool)
const planoService = new PlanoService(planoRepository)
const planoController = new PlanoController(planoService)

export default async function planoRoutes(app) {
  app.get('/planos', {
    schema: {
      tags: ['Planos'],
      summary: 'Listar todos os planos',
      response: {
        200: { description: 'Lista de planos retornada com sucesso' },
        500: { description: 'Erro interno do servidor' }
      }
    }
  }, (req, res) => planoController.findAll(req, res))

  app.get('/planos/:id', {
    schema: {
      tags: ['Planos'],
      summary: 'Buscar plano por ID',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        200: { description: 'Plano encontrado com sucesso' },
        404: { description: 'Plano não encontrado' }
      }
    }
  }, (req, res) => planoController.findById(req, res))

  app.post('/planos', {
    schema: {
      tags: ['Planos'],
      summary: 'Criar novo plano',
      body: {
        type: 'object',
        required: ['nome', 'preco', 'duracao_dias'],
        properties: {
          nome: { type: 'string' },
          preco: { type: 'number' },
          duracao_dias: { type: 'integer' }
        }
      },
      response: {
        201: { description: 'Plano criado com sucesso' },
        409: { description: 'Nome de plano já cadastrado' }
      }
    }
  }, (req, res) => planoController.create(req, res))

  app.patch('/planos/:id', {
    schema: {
      tags: ['Planos'],
      summary: 'Atualizar plano',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          preco: { type: 'number' },
          duracao_dias: { type: 'integer' }
        }
      },
      response: {
        200: { description: 'Plano atualizado com sucesso' },
        404: { description: 'Plano não encontrado' }
      }
    }
  }, (req, res) => planoController.update(req, res))

  app.delete('/planos/:id', {
    schema: {
      tags: ['Planos'],
      summary: 'Deletar plano',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        204: { description: 'Plano deletado com sucesso' },
        404: { description: 'Plano não encontrado' }
      }
    }
  }, (req, res) => planoController.delete(req, res))
}