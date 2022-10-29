import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('signin', 'AuthController.signin').as('signin')
  Route.post('signup', 'AuthController.signup').as('signup')
}).prefix('api/v1/auth')
