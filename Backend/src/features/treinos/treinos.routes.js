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
  // CRUD Treinos
  app.get('/treinos', {
    schema: {
      tags: ['Treinos'],
      summary: 'Listar todos os treinos',
      response: {
        200: { description: 'Lista de treinos retornada com sucesso' },
        500: { description: 'Erro interno do servidor' }
      }
    }
  }, (req, res) => treinoController.findAll(req, res))

  app.get('/treinos/:id', {
    schema: {
      tags: ['Treinos'],
      summary: 'Buscar treino por ID',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        200: { description: 'Treino encontrado com sucesso' },
        404: { description: 'Treino não encontrado' }
      }
    }
  }, (req, res) => treinoController.findById(req, res))

  app.post('/treinos', {
    schema: {
      tags: ['Treinos'],
      summary: 'Criar novo treino',
      body: {
        type: 'object',
        required: ['nome'],
        properties: {
          nome: { type: 'string' },
          descricao: { type: 'string' }
        }
      },
      response: {
        201: { description: 'Treino criado com sucesso' },
        409: { description: 'Treino já cadastrado' }
      }
    }
  }, (req, res) => treinoController.create(req, res))

  app.patch('/treinos/:id', {
    schema: {
      tags: ['Treinos'],
      summary: 'Atualizar treino',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          descricao: { type: 'string' }
        }
      },
      response: {
        200: { description: 'Treino atualizado com sucesso' },
        404: { description: 'Treino não encontrado' }
      }
    }
  }, (req, res) => treinoController.update(req, res))

  app.delete('/treinos/:id', {
    schema: {
      tags: ['Treinos'],
      summary: 'Deletar treino',
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } }
      },
      response: {
        204: { description: 'Treino deletado com sucesso' },
        404: { description: 'Treino não encontrado' },
        409: { description: 'Treino possui exercícios vinculados' }
      }
    }
  }, (req, res) => treinoController.delete(req, res))

  // Treino x Exercício (N:N)
  app.get('/treinos/:treinoId/exercicios', {
    schema: {
      tags: ['Treino x Exercício'],
      summary: 'Listar exercícios de um treino',
      params: {
        type: 'object',
        properties: { treinoId: { type: 'integer' } }
      },
      response: {
        200: { description: 'Lista de exercícios do treino retornada com sucesso' },
        404: { description: 'Treino não encontrado' }
      }
    }
  }, (req, res) => treinoExercicioController.listar(req, res))

  app.post('/treinos/:treinoId/exercicios', {
    schema: {
      tags: ['Treino x Exercício'],
      summary: 'Vincular exercício a um treino',
      params: {
        type: 'object',
        properties: { treinoId: { type: 'integer' } }
      },
      body: {
        type: 'object',
        required: ['exercicio_id', 'series', 'repeticoes'],
        properties: {
          exercicio_id: { type: 'integer' },
          series: { type: 'integer' },
          repeticoes: { type: 'integer' }
        }
      },
      response: {
        201: { description: 'Exercício vinculado com sucesso' },
        404: { description: 'Treino ou exercício não encontrado' },
        409: { description: 'Exercício já vinculado a esse treino' }
      }
    }
  }, (req, res) => treinoExercicioController.vincular(req, res))

  app.patch('/treinos/:treinoId/exercicios/:exercicioId', {
    schema: {
      tags: ['Treino x Exercício'],
      summary: 'Atualizar séries e repetições de um exercício no treino',
      params: {
        type: 'object',
        properties: {
          treinoId: { type: 'integer' },
          exercicioId: { type: 'integer' }
        }
      },
      body: {
        type: 'object',
        properties: {
          series: { type: 'integer' },
          repeticoes: { type: 'integer' }
        }
      },
      response: {
        200: { description: 'Vínculo atualizado com sucesso' },
        404: { description: 'Vínculo não encontrado' }
      }
    }
  }, (req, res) => treinoExercicioController.atualizar(req, res))

  app.delete('/treinos/:treinoId/exercicios/:exercicioId', {
    schema: {
      tags: ['Treino x Exercício'],
      summary: 'Desvincular exercício de um treino',
      params: {
        type: 'object',
        properties: {
          treinoId: { type: 'integer' },
          exercicioId: { type: 'integer' }
        }
      },
      response: {
        204: { description: 'Exercício desvinculado com sucesso' },
        404: { description: 'Vínculo não encontrado' }
      }
    }
  }, (req, res) => treinoExercicioController.desvincular(req, res))

  // Aluno x Treino (N:N)
  app.get('/treinos/:treinoId/alunos', {
    schema: {
      tags: ['Aluno x Treino'],
      summary: 'Listar alunos matriculados em um treino',
      params: {
        type: 'object',
        properties: { treinoId: { type: 'integer' } }
      },
      response: {
        200: { description: 'Lista de alunos do treino retornada com sucesso' },
        404: { description: 'Treino não encontrado' }
      }
    }
  }, (req, res) => treinoAlunoController.listar(req, res))

  app.post('/treinos/:treinoId/alunos', {
    schema: {
      tags: ['Aluno x Treino'],
      summary: 'Matricular aluno em um treino',
      params: {
        type: 'object',
        properties: { treinoId: { type: 'integer' } }
      },
      body: {
        type: 'object',
        required: ['aluno_id'],
        properties: {
          aluno_id: { type: 'integer' },
          data_inicio: { type: 'string', format: 'date' }
        }
      },
      response: {
        201: { description: 'Aluno matriculado com sucesso' },
        404: { description: 'Treino ou aluno não encontrado' },
        409: { description: 'Aluno já matriculado nesse treino' }
      }
    }
  }, (req, res) => treinoAlunoController.matricular(req, res))

  app.delete('/treinos/:treinoId/alunos/:alunoId', {
    schema: {
      tags: ['Aluno x Treino'],
      summary: 'Desmatricular aluno de um treino',
      params: {
        type: 'object',
        properties: {
          treinoId: { type: 'integer' },
          alunoId: { type: 'integer' }
        }
      },
      response: {
        204: { description: 'Aluno desmatriculado com sucesso' },
        404: { description: 'Matrícula não encontrada' }
      }
    }
  }, (req, res) => treinoAlunoController.desmatricular(req, res))
}