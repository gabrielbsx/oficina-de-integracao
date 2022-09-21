import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('create', 'UsersController.create').as('users/create')
}).prefix('api/v1/users')
