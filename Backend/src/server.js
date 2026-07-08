import 'dotenv/config'
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import pool from './database/pool.js'
import errorHandler from './pluggins/ErrorHandler.js'
import alunoRoutes from './features/alunos/alunos.routes.js'
import avaliacaoFisicaRoutes from './features/avaliacoes/avaliacoes.routes.js'
import exercicioRoutes from './features/exercicios/exercicios.routes.js'
import planoRoutes from './features/planos/planos.routes.js'
import treinoRoutes from './features/treinos/treinos.routes.js'

const app = Fastify()

async function start() {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Sistema de Gestão de Academia',
        description: 'API RESTful para gerenciamento de alunos, planos, treinos e exercícios',
        version: '1.0.0'
      }
    }
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs'
  })

  errorHandler(app)

  await app.register(alunoRoutes)
  await app.register(avaliacaoFisicaRoutes)
  await app.register(exercicioRoutes)
  await app.register(planoRoutes)
  await app.register(treinoRoutes)

  pool.query('SELECT NOW()')
    .then(res => console.log('banco conectado:', res.rows[0]))
    .catch(err => console.error('erro ao conectar:', err))

  await app.listen({ port: 3333 })
  console.log('servidor rodando na porta 3333')
}

start()