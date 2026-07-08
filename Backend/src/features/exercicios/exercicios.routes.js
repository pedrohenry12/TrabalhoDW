import pool from '../../database/pool.js'
import ExercicioRepository from './exercicios.repository.js'
import ExercicioService from './exercicios.service.js'
import ExercicioController from './exercicios.controller.js'

const exercicioRepository = new ExercicioRepository(pool)
const exercicioService = new ExercicioService(exercicioRepository)
const exercicioController = new ExercicioController(exercicioService)

export default async function exercicioRoutes(app) {
  app.get('/exercicios', {
    schema: {
      tags: ['Exercícios'],
      summary: 'Listar todos os exercícios',
      response: {
        200: { description: 'Lista de exercícios retornada com sucesso' },
        500: { description: 'Erro interno do servidor' }
      }
    }
  }, (req, res) => exercicioController.findAll(req, res))

  app.get('/exercicios/:id', {
    schema: {
      tags: ['Exercícios'],
      summary: 'Buscar exercício por ID',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        200: { description: 'Exercício encontrado com sucesso' },
        404: { description: 'Exercício não encontrado' }
      }
    }
  }, (req, res) => exercicioController.findById(req, res))

  app.post('/exercicios', {
    schema: {
      tags: ['Exercícios'],
      summary: 'Criar novo exercício',
      body: {
        type: 'object',
        required: ['nome', 'grupo_muscular'],
        properties: {
          nome: { type: 'string' },
          grupo_muscular: { type: 'string' },
          descricao: { type: 'string' }
        }
      },
      response: {
        201: { description: 'Exercício criado com sucesso' },
        409: { description: 'Exercício já cadastrado' }
      }
    }
  }, (req, res) => exercicioController.create(req, res))

  app.patch('/exercicios/:id', {
    schema: {
      tags: ['Exercícios'],
      summary: 'Atualizar exercício',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          grupo_muscular: { type: 'string' },
          descricao: { type: 'string' }
        }
      },
      response: {
        200: { description: 'Exercício atualizado com sucesso' },
        404: { description: 'Exercício não encontrado' }
      }
    }
  }, (req, res) => exercicioController.update(req, res))

  app.delete('/exercicios/:id', {
    schema: {
      tags: ['Exercícios'],
      summary: 'Deletar exercício',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        204: { description: 'Exercício deletado com sucesso' },
        404: { description: 'Exercício não encontrado' }
      }
    }
  }, (req, res) => exercicioController.delete(req, res))
}