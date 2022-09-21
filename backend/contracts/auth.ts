import Cliente from 'App/Models/Cliente'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof Cliente>
      config: LucidProviderConfig<typeof Cliente>
    }
  }
  interface GuardsList {
    basic: {
      implementation: BasicAuthGuardContract<'user', 'basic'>
      config: BasicAuthGuardConfig<'user'>
      client: BasicAuthClientContract<'user'>
    }
  }
}
