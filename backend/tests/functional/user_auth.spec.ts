import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('AuthController SignIn', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('should returns a error if cpf is not provided', async ({ client, route }) => {
    const cliente = {
      senha: 'any_senha',
    }
    const response = await client.post(route('AuthController.signin')).json(cliente)
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
      senha: 'any_senha',
    }
    let response = await client.post(route('AuthController.signin')).json(cliente)
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
    response = await client.post(route('AuthController.signin')).json(cliente)
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
      cpf: 'invalid_cpf_rgx',
      senha: 'any_senha',
    }
    const response = await client.post(route('AuthController.signin')).json(cliente)
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
  test('should returns a error if cpf is not exists on database', async ({ client, route }) => {
    const cliente = {
      cpf: 'cpf_is_not_exists',
      senha: 'any_senha',
    }
    const response = await client.post(route('AuthController.signin')).json(cliente)
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
  test('should returns a error if senha is invalid', async ({ client, route }) => {
    const cliente = {
      cpf: '123.123.123-12',
      senha: 'milen',
    }
    const response = await client.post(route('AuthController.signin')).json(cliente)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          args: {
            minLength: 6,
          },
          field: 'senha',
          message: 'senha deve conter no mínimo 6 caracteres',
          rule: 'minLength',
        },
      ],
    })
  })
  test('should returns a valid token if user is correct', async ({ client, route }) => {
    const date = new Date()
    date.setUTCDate(date.getUTCDate() - 1)
    const cliente = {
      cpf: '123.123.123-00',
      email: 'any_email@email.com',
      senha: 'minha_senha',
      confirmacao_senha: 'minha_senha',
      data_nascimneto: date,
    }
    let response = await client.post(route('UsersController.create')).json(cliente)
    response = await client.post(route('AuthController.signin')).json(cliente)
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        cliente: {
          token: String,
          type: 'bearer',
        },
      },
    })
  })
})
