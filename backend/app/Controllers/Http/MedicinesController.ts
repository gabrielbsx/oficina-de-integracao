import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gerenciamento from 'App/Models/Gerenciamento'
import Medicamento from 'App/Models/Medicamento'
import CreateMedicineValidator from 'App/Validators/CreateMedicineValidator'
import { DateTime } from 'luxon'

export default class MedicinesController {
  public async create({ response, auth, request }: HttpContextContract) {
    await request.validate(CreateMedicineValidator)
    const { idMedicamento, horaGerenciamento } = request.only([
      'idMedicamento',
      'horaGerenciamento',
    ]) as { idMedicamento: number; horaGerenciamento: Date }
    const gerenciamento = new Gerenciamento()
    gerenciamento.idMedicamento = idMedicamento
    gerenciamento.horaGerenciamento = DateTime.fromJSDate(horaGerenciamento)
    gerenciamento.idCliente = await auth.use('api').user!.id
    await gerenciamento.save()
    return response.created({
      statusCode: 200,
      body: {
        message: 'medicamento cadastrado com sucesso',
      },
    })
  }
  public async all({ request, response, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const gerenciamentos = await Gerenciamento.query()
      .where('id_cliente', auth.use('api').user!.id)
      .orderBy('id', 'desc')
      .preload('medicamento')
      .paginate(page, limit)
    return response.ok({
      statusCode: 200,
      body: {
        gerenciamentos,
      },
    })
  }
  public async medicines({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const nomeMedicamento = request.input('search', '')
    const medicamentos = await Medicamento.query()
      .whereLike('nome', `%${nomeMedicamento}%`)
      .orderBy('id', 'desc')
      .paginate(page, limit)
    return response.ok({
      statusCode: 200,
      body: {
        medicamentos,
      },
    })
  }
}
