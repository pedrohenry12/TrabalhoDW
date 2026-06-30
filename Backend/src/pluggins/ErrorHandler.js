import AppError from '../errors/AppError.js'

export default function errorHandler(app) {
  app.setErrorHandler((error, req, res) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
      })
    }

    console.error(error)

    return res.status(500).send({
      statusCode: 500,
      message: 'Erro interno do servidor',
    })
  })
}