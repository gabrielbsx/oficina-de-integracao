import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async ({ response }: HttpContextContract) => {
  return response.send('Projeto de Oficina de Integração 2 - API')
})
