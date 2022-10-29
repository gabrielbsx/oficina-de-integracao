import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAuth from 'App/interfaces/user-auth'
import UserAuthValidator from 'App/Validators/UserAuthValidator'

export default class AuthController {
  public async signin({ request, response, auth }: HttpContextContract) {
    await request.validate(UserAuthValidator)
    const { cpf, senha } = request.only(['cpf', 'senha']) as UserAuth
    const cliente = await auth.use('api').attempt(cpf, senha)
    return response.ok({
      statusCode: 200,
      body: {
        cliente,
      },
    })
  }
}
