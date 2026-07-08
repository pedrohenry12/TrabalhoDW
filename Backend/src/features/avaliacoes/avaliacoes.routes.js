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
  app.get('/avaliacoes', {
    schema: {
      tags: ['Avaliações Físicas'],
      summary: 'Listar todas as avaliações físicas',
      response: {
        200: { description: 'Lista de avaliações retornada com sucesso' },
        500: { description: 'Erro interno do servidor' }
      }
    }
  }, (req, res) => avaliacaoFisicaController.findAll(req, res))

  app.get('/avaliacoes/:id', {
    schema: {
      tags: ['Avaliações Físicas'],
      summary: 'Buscar avaliação física por ID',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        200: { description: 'Avaliação encontrada com sucesso' },
        404: { description: 'Avaliação não encontrada' }
      }
    }
  }, (req, res) => avaliacaoFisicaController.findById(req, res))

  app.post('/avaliacoes', {
    schema: {
      tags: ['Avaliações Físicas'],
      summary: 'Criar nova avaliação física',
      body: {
        type: 'object',
        required: ['aluno_id', 'peso_kg', 'altura_cm'],
        properties: {
          aluno_id: { type: 'integer' },
          peso_kg: { type: 'number' },
          altura_cm: { type: 'number' },
          percentual_gordura: { type: 'number' }
        }
      },
      response: {
        201: { description: 'Avaliação criada com sucesso' },
        404: { description: 'Aluno não encontrado' },
        409: { description: 'Aluno já possui avaliação física cadastrada' }
      }
    }
  }, (req, res) => avaliacaoFisicaController.create(req, res))

  app.patch('/avaliacoes/:id', {
    schema: {
      tags: ['Avaliações Físicas'],
      summary: 'Atualizar avaliação física',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      body: {
        type: 'object',
        properties: {
          peso_kg: { type: 'number' },
          altura_cm: { type: 'number' },
          percentual_gordura: { type: 'number' }
        }
      },
      response: {
        200: { description: 'Avaliação atualizada com sucesso' },
        404: { description: 'Avaliação não encontrada' }
      }
    }
  }, (req, res) => avaliacaoFisicaController.update(req, res))

  app.delete('/avaliacoes/:id', {
    schema: {
      tags: ['Avaliações Físicas'],
      summary: 'Deletar avaliação física',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        204: { description: 'Avaliação deletada com sucesso' },
        404: { description: 'Avaliação não encontrada' }
      }
    }
  }, (req, res) => avaliacaoFisicaController.delete(req, res))}