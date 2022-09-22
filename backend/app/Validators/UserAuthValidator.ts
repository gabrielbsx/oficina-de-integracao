import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserAuthValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    cpf: schema.string({}, [
      rules.required(),
      rules.minLength(13),
      rules.maxLength(15),
      rules.regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
      rules.exists({ column: 'cpf', table: 'clientes' }),
    ]),
    senha: schema.string({}, [rules.required(), rules.minLength(6), rules.maxLength(50)]),
  })
  public messages: CustomMessages = {
    'required': '{{ field }} obrigatório',
    'cpf.exists': 'cpf não cadastrado',
    'cpf.regex': 'cpf inválido',
    'cpf.minLength': 'cpf inválido',
    'cpf.maxLength': 'cpf inválido',
    'senha.minLength': 'senha deve conter no mínimo 6 caracteres',
    'senha.maxLength': 'senha deve conter no máximo 50 caracteres',
  }
}
