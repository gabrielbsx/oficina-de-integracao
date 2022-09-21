import Cliente from 'App/Models/Cliente'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof Cliente>
      config: LucidProviderConfig<typeof Cliente>
    }
  }

  interface GuardsList {
    api: {
      implementation: OATGuardContract<'user', 'api'>
      config: OATGuardConfig<'user'>
      client: OATClientContract<'user'>
    }
  }
}
