import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateMedicineValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_medicamento: schema.number([rules.exists({ table: 'medicamentos', column: 'id' })]),
    hora_gerenciamento: schema.date(),
  })

  public messages: CustomMessages = {
    'id_medicamento.exists': 'medicamento não cadastrado',
    'hora_gerenciamento.date': 'hora inválida',
  }
}
