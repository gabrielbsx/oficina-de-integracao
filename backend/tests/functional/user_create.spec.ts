import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'

test.group('UsersController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('endpoint returns a valid response', async ({ route, client }) => {
    const response = await client.post(route('UsersController.create'))
    response.hasBody()
  })
  test('returns a error when nome is not provided', async ({ client, route }) => {
    const user = {
      email: 'any_email@email.com',
      cpf: 'any_cpf',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    const response = await client.post(route('UsersController.create')).json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'nome obrigatório',
          field: 'nome',
          rule: 'required',
        },
      ],
    })
  })
  test('returns a error when nome is invalid length', async ({ client, route }) => {
    const user = {
      nome: 'any',
      email: 'any_email@email.com',
      cpf: 'any_cpf',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    let response = await client.post(route('UsersController.create')).json(user)
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
    user.cpf = 'any_cpf_that_exceded_max_length'
    response = await client.post(route('UsersController.create')).json(user)
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
  test('returns a error when cpf is invalid regex', async ({ client, route }) => {
    const user = {
      nome: 'any',
      email: 'any_email@email.com',
      cpf: 'any_cpf',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    const response = await client.post(route('UsersController.create')).json(user)
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
  test('returns a error when cpf is not provided', async ({ client, route }) => {
    const user = {
      nome: 'any_nome',
      email: 'any_email@email.com',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    const response = await client.post(route('UsersController.create')).json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          message: 'cpf obrigatório',
          field: 'cpf',
          rule: 'required',
        },
      ],
    })
  })
  test('returns a error when cpf is not unique', async ({ client, route, assert }) => {
    const user = {
      nome: 'any_nome',
      cpf: '123.123.123-12',
      email: 'any_email@email.com',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    await client.post(route('UsersController.create')).json(user)
    const response = await client.post(route('UsersController.create')).json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'cpf',
          message: 'cpf já cadastrado',
          rule: 'unique',
        },
      ],
    })
  })
  test('returns a error when email is not provided', async ({ client, route }) => {
    const user = {
      nome: 'any_nome',
      cpf: 'any_cpf',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    const response = await client.post(route('UsersController.create')).json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'email obrigatório',
          rule: 'required',
        },
      ],
    })
  })
  test('returns a error when email is not valid', async ({ client, route }) => {
    const user = {
      nome: 'any_nome',
      email: 'invalid_email',
      cpf: 'any_cpf',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    const response = await client.post(route('UsersController.create')).json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'email deve ser válido',
          rule: 'email',
        },
      ],
    })
  })
  test('returns a error when data nascimento is not provided', async ({ client, route }) => {
    const user = {
      nome: 'any_nome',
      email: 'any_email@email.com',
      cpf: 'any_cpf',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
    }
    const response = await client.post(route('UsersController.create')).json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'data_nascimento',
          message: 'data de nascimento obrigatório',
          rule: 'required',
        },
      ],
    })
  })
  test('returns a error when data nascimento is after or equals now', async ({ client, route }) => {
    const user = {
      nome: 'any_nome',
      email: 'any_email@email.com',
      cpf: 'any_cpf',
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: new Date(),
    }
    const response = await client.post(route('UsersController.create')).json(user)
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'data_nascimento',
          message: 'data de nascimento deve ser de pelo menos 1 dia atrás',
          rule: 'before',
        },
      ],
    })
  })
  test('returns a ok response and create a user if values is valid', async ({ client, route }) => {
    const date = new Date()
    const cpf = '123.123.123-12'
    date.setUTCDate(date.getUTCDate() - 1)
    await Cliente.query().where('cpf', cpf).delete()
    const user = {
      nome: 'valid_nome',
      email: 'valid_email@email.com',
      cpf,
      senha: 'any_senha',
      confirmacao_senha: 'any_senha',
      data_nascimento: date.toISOString(),
    }
    const response = await client.post(route('UsersController.create')).json(user)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { confirmacao_senha, senha, ...cliente } = user
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        cliente,
      },
    })
  })
})
