import "dotenv/config"
import Fastify from 'fastify'
import pool from './database/pool.js'
import AppError from './errors/App-error.js'

const app = Fastify()

app.get('/teste', (req, res) => {
  res.send({ status: 'ok' })
})

app.get('/erro-teste', () => {
  throw new AppError('testando o error handler', 400)
})

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