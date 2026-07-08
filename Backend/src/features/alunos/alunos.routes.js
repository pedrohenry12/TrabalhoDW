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
  app.get('/alunos', {
    schema: {
      tags: ['Alunos'],
      summary: 'Listar todos os alunos',
      response: {
        200: { description: 'Lista de alunos retornada com sucesso' },
        500: { description: 'Erro interno do servidor' }
      }
    }
  }, (req, res) => alunoController.findAll(req, res))

  app.get('/alunos/:id', {
    schema: {
      tags: ['Alunos'],
      summary: 'Buscar aluno por ID',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        200: { description: 'Aluno encontrado com sucesso' },
        404: { description: 'Aluno não encontrado' }
      }
    }
  }, (req, res) => alunoController.findById(req, res))

  app.get('/alunos/:id/completo', {
    schema: {
      tags: ['Alunos'],
      summary: 'Buscar aluno completo com plano, avaliação física e treinos',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        200: { description: 'Aluno completo retornado com sucesso' },
        404: { description: 'Aluno não encontrado' }
      }
    }
  }, (req, res) => alunoController.findCompleto(req, res))

  app.post('/alunos', {
    schema: {
      tags: ['Alunos'],
      summary: 'Criar novo aluno',
      body: {
        type: 'object',
        required: ['nome', 'email', 'plano_id'],
        properties: {
          nome: { type: 'string' },
          email: { type: 'string' },
          telefone: { type: 'string' },
          plano_id: { type: 'integer' }
        }
      },
      response: {
        201: { description: 'Aluno criado com sucesso' },
        409: { description: 'E-mail já cadastrado' }
      }
    }
  }, (req, res) => alunoController.create(req, res))

  app.patch('/alunos/:id', {
    schema: {
      tags: ['Alunos'],
      summary: 'Atualizar aluno',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          email: { type: 'string' },
          telefone: { type: 'string' },
          plano_id: { type: 'integer' }
        }
      },
      response: {
        200: { description: 'Aluno atualizado com sucesso' },
        404: { description: 'Aluno não encontrado' }
      }
    }
  }, (req, res) => alunoController.update(req, res))

  app.delete('/alunos/:id', {
    schema: {
      tags: ['Alunos'],
      summary: 'Deletar aluno',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        204: { description: 'Aluno deletado com sucesso' },
        404: { description: 'Aluno não encontrado' }
      }
    }
  }, (req, res) => alunoController.delete(req, res))
}