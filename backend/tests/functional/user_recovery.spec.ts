import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'
// import Cliente from 'App/Models/Cliente'

test.group('UsersController.recovery', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('should returns a error if cpf is not provided', async ({ client, route }) => {
    const cliente = {}
    const response = await client.post(route('UsersController.recovery')).json(cliente)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'cpf',
          message: 'cpf obrigatório',
          rule: 'required',
        },
      ],
    })
  })
  test('should returns a error if cpf is invalid length', async ({ client, route }) => {
    const cliente = {
      cpf: 'invalid_cpf',
    }
    let response = await client.post(route('UsersController.recovery')).json(cliente)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          args: {
            minLength: 13,
          },
          field: 'cpf',
          message: 'cpf inválido',
          rule: 'minLength',
        },
      ],
    })
    cliente.cpf = 'invalid_cpf_max_length'
    response = await client.post(route('UsersController.recovery')).json(cliente)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          args: {
            maxLength: 15,
          },
          field: 'cpf',
          message: 'cpf inválido',
          rule: 'maxLength',
        },
      ],
    })
  })
  test('should returns a error if cpf is invalid regex', async ({ client, route }) => {
    const cliente = {
      cpf: 'invalid_cpf',
    }
    const response = await client.post(route('UsersController.recovery')).json(cliente)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'cpf',
          message: 'cpf inválido',
          rule: 'regex',
        },
      ],
    })
  })
  test('should returns a error if cpf is not exists', async ({ client, route }) => {
    const cliente = {
      cpf: '123.123.123-99',
    }
    const response = await client.post(route('UsersController.recovery')).json(cliente)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'cpf',
          message: 'cpf não cadastrado',
          rule: 'exists',
        },
      ],
    })
  })
  test('should returns a message that a email is send with another password defined by server if cpf is valid', async ({
    client,
    route,
  }) => {
    const date = new Date()
    const cpf = '123.123.123-12'
    date.setUTCDate(date.getUTCDate() - 1)
    const user = {
      nome: 'valid_nome',
      email: 'valid_email@email.com',
      cpf,
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: date.toISOString(),
    }
    await client.post(route('UsersController.create')).json(user)
    const cliente = await Cliente.query().where('cpf', cpf).firstOrFail()
    const response = await client.post(route('UsersController.recovery')).json({ cpf })
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        message: `uma nova senha foi enviada ao e-mail: ${cliente.email}`,
      },
    })
  })
})
