import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRecovery from 'App/interfaces/user-recovery'
import Cliente from 'App/Models/Cliente'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import UserRecoveryValidator from 'App/Validators/UserRecoveryValidator'
import IUserCreate from '../../interfaces/user-create'
import generator from 'generate-password'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    await request.validate(UserCreateValidator)
    const {
      nome,
      email,
      senha: password,
      cpf,
      data_nascimento: dataNascimento,
    } = request.only(['nome', 'email', 'senha', 'cpf', 'data_nascimento']) as IUserCreate
    const cliente = await Cliente.create({
      nome,
      email,
      password,
      cpf,
      dataNascimento,
    })
    return response.created({
      statusCode: 201,
      body: {
        cliente,
      },
    })
  }
  public async recovery({ request, response }: HttpContextContract) {
    await request.validate(UserRecoveryValidator)
    const { cpf } = request.only(['cpf']) as UserRecovery
    const cliente = await Cliente.query().where('cpf', cpf).firstOrFail()
    const password = generator.generate({
      length: 10,
      uppercase: true,
      lowercase: true,
      symbols: true,
    })
    cliente.password = password
    await cliente.save()
    return response.ok({
      statusCode: 200,
      body: {
        // message: `uma nova senha foi enviada ao e-mail: ${cliente.email}`,
        cpf: cliente.cpf,
        password,
      },
    })
  }
  public async verify({ auth, response }: HttpContextContract) {
    await auth.use('api').authenticate()
    return response.ok({
      statusCode: 200,
      body: {
        message: 'usuário autenticado!',
      },
    })
  }
}
