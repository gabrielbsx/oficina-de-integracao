import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gerenciamento from 'App/Models/Gerenciamento'
import Medicamento from 'App/Models/Medicamento'
import CreateUpdateMedicineValidator from 'App/Validators/CreateUpdateMedicineValidator'
import { DateTime } from 'luxon'

export default class MedicinesController {
  public async create({ response, auth, request }: HttpContextContract) {
    await request.validate(CreateUpdateMedicineValidator)
    const { idMedicamento, horaGerenciamento } = request.only([
      'idMedicamento',
      'horaGerenciamento',
    ]) as { idMedicamento: number; horaGerenciamento: DateTime }
    const gerenciamento = new Gerenciamento()
    gerenciamento.idMedicamento = idMedicamento
    gerenciamento.horaGerenciamento = horaGerenciamento
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
    let page = request.input('page', 1)
    let limit = request.input('limit', 10)
    page = page < 1 ? 1 : page
    limit = limit < 1 ? 1 : limit
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
    let page = request.input('page', 1)
    let limit = request.input('limit', 10)
    page = page < 1 ? 1 : page
    limit = limit < 1 ? 1 : limit
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
  public async delete({ response, auth, params }: HttpContextContract) {
    const gerenciamento = await Gerenciamento.query()
      .where('id', params.id)
      .andWhere('id_cliente', auth.use('api').user!.id)
      .firstOrFail()
    await gerenciamento.delete()
    return response.ok({
      statusCode: 200,
      body: {
        message: 'medicamento removido com sucesso',
      },
    })
  }
  public async update({ response, auth, params, request }: HttpContextContract) {
    await request.validate(CreateUpdateMedicineValidator)
    const gerenciamento = await Gerenciamento.query()
      .where('id', params.id)
      .andWhere('id_cliente', auth.use('api').user!.id)
      .firstOrFail()
    const { idMedicamento, horaGerenciamento } = request.only([
      'idMedicamento',
      'horaGerenciamento',
    ]) as { idMedicamento: number; horaGerenciamento: DateTime }
    gerenciamento.idMedicamento = idMedicamento
    gerenciamento.horaGerenciamento = horaGerenciamento
    await gerenciamento.save()
    return response.ok({
      statusCode: 200,
      body: {
        message: 'medicamento atualizado com sucesso',
      },
    })
  }
  public async getById({ response, auth, params }: HttpContextContract) {
    const gerenciamento = await Gerenciamento.query()
      .where('id', params.id)
      .andWhere('id_cliente', auth.use('api').user!.id)
      .firstOrFail()
    await gerenciamento.load('medicamento')
    return response.ok({
      statusCode: 200,
      body: {
        gerenciamento,
      },
    })
  }
}
