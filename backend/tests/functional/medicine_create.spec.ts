import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'

test.group('MedicinesController Create', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('should returns a statusCode 401 and message error if user is unauthorized', async ({
    client,
    route,
  }) => {
    const medicineRow = await Database.from('medicamentos').first()
    const medicine = {
      idMedicamento: medicineRow.id,
      horaGerenciamento: '10:20',
    }
    const bearer = `Bearer unauthorized_token`
    const responseMedCreate = await client
      .post(route('medicines/create'))
      .header('Authorization', bearer)
      .json(medicine)
    responseMedCreate.assertStatus(401)
    responseMedCreate.assertBodyContains({
      errors: [
        {
          message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access',
        },
      ],
    })
  })
  test('should returns a statusCode 422 and a message error if date is invalid', async ({
    client,
    route,
  }) => {
    const cpf = '123.123.123-23'
    const password = 'any_senha'
    await Cliente.query().where('cpf', cpf).delete()
    const cliente = await Cliente.create({
      nome: 'any_nome',
      email: 'any_email@mail.com',
      cpf,
      password: password,
      dataNascimento: new Date(),
    })
    const responseAuth = await client.post(route('signin')).json({
      cpf,
      senha: password,
    })
    const { body } = responseAuth.body()
    const bearer = `Bearer ${body.cliente.token}`
    const medicineRow = await Database.from('medicamentos').first()
    const medicine = {
      idMedicamento: medicineRow.id,
      horaGerenciamento: 'invalid_hour',
    }
    const responseMedCreate = await client
      .post(route('medicines/create'))
      .header('Authorization', bearer)
      .json(medicine)
    responseMedCreate.assertStatus(422)
    responseMedCreate.assertBodyContains({
      errors: [
        {
          args: {},
          field: 'horaGerenciamento',
          message: 'the input "invalid_hour" can\'t be parsed as ISO 8601',
          rule: 'date.format',
        },
      ],
    })
    await cliente.delete()
  })
  test('should returns a statusCode 422 and a message error if medicine is not exists on database', async ({
    client,
    route,
  }) => {
    const cpf = '123.123.123-23'
    const password = 'any_senha'
    await Cliente.query().where('cpf', cpf).delete()
    const cliente = await Cliente.create({
      nome: 'any_nome',
      email: 'any_email@mail.com',
      cpf,
      password: password,
      dataNascimento: new Date(),
    })
    const responseAuth = await client.post(route('signin')).json({
      cpf,
      senha: password,
    })
    const { body } = responseAuth.body()
    const bearer = `Bearer ${body.cliente.token}`
    const medicine = {
      idMedicamento: 10000000000000000000,
      horaGerenciamento: '14:20',
    }
    const responseMedCreate = await client
      .post(route('medicines/create'))
      .header('Authorization', bearer)
      .json(medicine)
    responseMedCreate.assertStatus(422)
    responseMedCreate.assertBodyContains({
      errors: [
        {
          field: 'idMedicamento',
          message: 'exists validation failure',
          rule: 'exists',
        },
      ],
    })
    await cliente.delete()
  })
  test('should returns a statusCode 200 if medicine is created on management medicine schedule', async ({
    client,
    route,
  }) => {
    const cpf = '123.123.123-12'
    const password = 'any_senha'
    await Cliente.query().where('cpf', cpf).delete()
    const cliente = await Cliente.create({
      nome: 'any_nome',
      email: 'any_email@mail.com',
      cpf,
      password: password,
      dataNascimento: new Date(),
    })
    const responseAuth = await client.post(route('signin')).json({
      cpf,
      senha: password,
    })
    const { body } = responseAuth.body()
    const medicineRow = await Database.from('medicamentos').first()
    const medicine = {
      idMedicamento: medicineRow.id,
      horaGerenciamento: '10:20',
    }
    const bearer = `Bearer ${body.cliente.token}`
    const responseMedCreate = await client
      .post(route('medicines/create'))
      .header('Authorization', bearer)
      .json(medicine)
    responseMedCreate.assertStatus(201)
    await cliente.delete()
  })
})
