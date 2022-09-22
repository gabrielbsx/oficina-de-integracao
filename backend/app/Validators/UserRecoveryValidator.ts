import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserRecoveryValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    cpf: schema.string({}, [
      rules.required(),
      rules.minLength(13),
      rules.maxLength(15),
      rules.regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
      rules.exists({ column: 'cpf', table: 'clientes' }),
    ]),
  })
  public messages: CustomMessages = {
    'cpf.required': 'cpf obrigatório',
    'cpf.exists': 'cpf não cadastrado',
    'cpf.regex': 'cpf inválido',
    'cpf.minLength': 'cpf inválido',
    'cpf.maxLength': 'cpf inválido',
  }
}
