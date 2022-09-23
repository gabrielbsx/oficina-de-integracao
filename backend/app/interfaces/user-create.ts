export default interface UserCreate {
  cpf: string
  nome: string
  email: string
  senha: string
  confirmacao_senha: string
  data_nascimento: Date
}
