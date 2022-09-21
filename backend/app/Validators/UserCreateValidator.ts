import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserCreateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    nome: schema.string({}, [rules.required(), rules.maxLength(50)]),
    email: schema.string({}, [rules.required(), rules.email()]),
    senha: schema.string({}, [
      rules.required(),
      rules.minLength(6),
      rules.maxLength(50),
      rules.confirmed('confirmacao_senha'),
    ]),
    cpf: schema.string({}, [
      rules.required(),
      rules.minLength(13),
      rules.maxLength(15),
      rules.regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
      rules.unique({ column: 'cpf', table: 'clientes' }),
    ]),
    data_nascimento: schema.date({}, [rules.required(), rules.before('today')]),
  })
  public messages: CustomMessages = {
    'required': '{{ field }} obrigatório',
    'nome.maxLength': 'nome deve conter no máximo 50 caracteres',
    'email.email': 'email deve ser válido',
    'senha.minLength': 'senha deve conter no mínimo 6 caracteres',
    'senha.maxLength': 'senha deve conter no máximo 50 caracteres',
    'confirmacao_senha.confirmed': 'o campo de confirmação de senha é obrigatório',
    'cpf.unique': 'cpf já cadastrado',
    'cpf.regex': 'cpf inválido',
    'cpf.minLength': 'cpf inválido',
    'cpf.maxLength': 'cpf inválido',
    'data_nascimento.required': 'data de nascimento obrigatório',
    'data_nascimento.date.format': 'data de nascimento inválida',
    'data_nascimento.before': 'data de nascimento deve ser de pelo menos 1 dia atrás',
  }
}
