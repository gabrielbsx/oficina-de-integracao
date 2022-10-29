import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'MedicinesController.create').as('medicines/create')
  Route.delete('/delete/:id', 'MedicinesController.delete').as('medicines/delete')
  Route.put('/update/:id', 'MedicinesController.update').as('medicines/update')
  Route.get('/all', 'MedicinesController.all').as('medicines/all')
  Route.get('/', 'MedicinesController.medicines').as('medicines/medicines')
})
  .prefix('api/v1/medicines')
  .middleware('auth')
