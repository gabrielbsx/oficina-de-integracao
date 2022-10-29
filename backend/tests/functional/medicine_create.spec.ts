import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'

test.group('MedicinesController Create', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
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
