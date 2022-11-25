import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'
import Gerenciamento from 'App/Models/Gerenciamento'

test.group('MedicinesController Fetch', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })
    test('should returns a 401 code error if paginate is called with invalid authorization token', async ({ client, route }) => {
        const bearer = `Bearer invalid_token`
        const responseMedicines = await client
            .get(route('medicines/all'))
            .header('Authorization', bearer)
        responseMedicines.assertStatus(401)
    })

})