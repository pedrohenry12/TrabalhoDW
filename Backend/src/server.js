import "dotenv/config"
import Fastify from 'fastify'
import pool from './database/pool.js'
import errorHandler from './pluggins/ErrorHandler.js'
import alunoRoutes from './features/alunos/alunos.routes.js'
import exercicioRoutes from './features/exercicios/exercicios.routes.js'
import avaliacaoFisicaRoutes from "./features/avaliacoes/avaliacoes.routes.js"
import planoRoutes from './features/planos/planos.routes.js'

const app = Fastify()

errorHandler(app)

app.register(alunoRoutes)
app.register(exercicioRoutes)
app.register(planoRoutes)

app.register(avaliacaoFisicaRoutes)

pool.query('SELECT NOW()')
  .then(res => console.log('banco conectado:', res.rows[0]))
  .catch(err => console.error('erro ao conectar:', err))

app.listen({ port: 3333 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('servidor rodando na porta 3333')
})