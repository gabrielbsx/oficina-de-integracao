import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUpdateMedicineValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    idMedicamento: schema.number([rules.exists({ table: 'medicamentos', column: 'id' })]),
    horaGerenciamento: schema.date(),
  })

  public messages: CustomMessages = {
    'id_medicamento.exists': 'medicamento não cadastrado',
    'hora_gerenciamento.date': 'hora inválida',
  }
}
