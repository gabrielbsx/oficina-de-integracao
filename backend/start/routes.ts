import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import './routes/users'
import './routes/auth'
import './routes/medicines'

Route.get('/', async ({ response }: HttpContextContract) => {
  return response.send('Projeto de Oficina de Integração 2 - API')
})

Route.any('*', ({ response }: HttpContextContract) => {
  return response.json({
    statusCode: 404,
    body: {
      message: 'endpoint not found!',
    },
  })
})
