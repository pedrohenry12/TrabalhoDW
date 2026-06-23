import Fastify from 'fastify'

const app = Fastify()

app.get('/teste', (req, res) => {
  res.send({ status: 'ok' })
})

app.listen({ port: 3333 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('servidor rodando na porta 3333')
})