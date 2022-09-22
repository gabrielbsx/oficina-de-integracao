import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('signin', 'AuthController.signin').as('auth/signin')
}).prefix('api/v1/auth')
