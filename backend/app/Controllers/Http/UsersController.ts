import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import IUserCreate from '../../interfaces/user-create'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    await request.validate(UserCreateValidator)
    const {
      nome,
      email,
      senha,
      cpf,
      data_nascimento: dataNascimento,
    } = request.only(['nome', 'email', 'senha', 'cpf', 'data_nascimento']) as IUserCreate
    const cliente = await Cliente.create({
      nome,
      email,
      senha,
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
}
