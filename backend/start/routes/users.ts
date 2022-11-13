import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('create', 'UsersController.create').as('users/create')
  Route.post('recovery', 'UsersController.recovery').as('users/recovery')
  Route.get('/verify', 'UsersController.verify').as('users/verify').middleware('auth')
}).prefix('api/v1/users')
