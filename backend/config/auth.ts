import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

const authConfig: AuthConfig = {
  guard: 'basic',
  guards: {
    basic: {
      driver: 'basic',
      realm: 'Login',

      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        uids: ['cpf'],
        model: () => import('App/Models/Cliente'),
      },
    },
  },
}

export default authConfig
