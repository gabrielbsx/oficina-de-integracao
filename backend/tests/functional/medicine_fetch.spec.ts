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
    test('should returns a pagination data if paginate is called', async ({ client, route }) => {
        const cpf = '123.123.123-23'
        const password = 'any_senha'
        await Cliente.query().where('cpf', cpf).delete()
        const cliente = await Cliente.create({
            nome: 'any_nome',
            email: 'any_email@mail.com',
            cpf,
            password: password,
            dataNascimento: new Date(),
        })
        const responseAuth = await client.post(route('signin')).json({
            cpf,
            senha: password,
        })
        const medicineRow = await Database.from('medicamentos').first()
        const medicine = {
            idMedicamento: medicineRow.id,
            horaGerenciamento: '10:20',
        }
        const newMedicine = new Gerenciamento()
        newMedicine.idCliente = cliente.id
        newMedicine.idMedicamento = medicine.idMedicamento
        newMedicine.horaGerenciamento = medicine.horaGerenciamento as any
        await newMedicine.save()
        const { body } = responseAuth.body()
        const bearer = `Bearer ${body.cliente.token}`
        const responseMedicines = await client
            .get(route('medicines/all'))
            .header('Authorization', bearer)
        responseMedicines.assertStatus(200)
        responseMedicines.assertBodyContains({
            body: {
                gerenciamentos: {
                    meta: {
                        total: 1,
                        per_page: 10,
                        current_page: 1,
                        last_page: 1,
                        first_page: 1,
                        first_page_url: '/?page=1',
                        last_page_url: '/?page=1',
                        next_page_url: null,
                        previous_page_url: null,
                    },
                    data: [
                        {
                            id: newMedicine.id,
                            id_cliente: cliente.id,
                            id_medicamento: newMedicine.idMedicamento,
                            hora_gerenciamento: newMedicine.horaGerenciamento,
                            medicamento: {
                                id: medicineRow.id,
                                farmaceutica: medicineRow.farmaceutica,
                                nome: medicineRow.nome,
                            }
                        },
                    ]
                }
            }
        })
        await newMedicine.delete()
        await cliente.delete()
    })
    test('should returns a pagination data if paginate is called with invalid params', async ({ client, route }) => {
        const cpf = '123.123.123-23'
        const password = 'any_senha'
        await Cliente.query().where('cpf', cpf).delete()
        const cliente = await Cliente.create({
            nome: 'any_nome',
            email: 'any_email@mail.com',
            cpf,
            password: password,
            dataNascimento: new Date(),
        })
        const responseAuth = await client.post(route('signin')).json({
            cpf,
            senha: password,
        })
        const medicineRow = await Database.from('medicamentos').first()
        const medicine = {
            idMedicamento: medicineRow.id,
            horaGerenciamento: '10:20',
        }
        const newMedicine = new Gerenciamento()
        newMedicine.idCliente = cliente.id
        newMedicine.idMedicamento = medicine.idMedicamento
        newMedicine.horaGerenciamento = medicine.horaGerenciamento as any
        await newMedicine.save()
        const { body } = responseAuth.body()
        const bearer = `Bearer ${body.cliente.token}`
        const responseMedicines = await client
            .get('/api/v1/medicines/all?page=-2&limit=-2')
            .header('Authorization', bearer)
        responseMedicines.assertStatus(200)
        responseMedicines.assertBodyContains({
            body: {
                gerenciamentos: {
                    meta: {
                        total: 1,
                        per_page: 1,
                        current_page: 1,
                        last_page: 1,
                        first_page: 1,
                        first_page_url: '/?page=1',
                        last_page_url: '/?page=1',
                        next_page_url: null,
                        previous_page_url: null,
                    },
                    data: [
                        {
                            id: newMedicine.id,
                            id_cliente: cliente.id,
                            id_medicamento: newMedicine.idMedicamento,
                            hora_gerenciamento: newMedicine.horaGerenciamento,
                            medicamento: {
                                id: medicineRow.id,
                                farmaceutica: medicineRow.farmaceutica,
                                nome: medicineRow.nome,
                            }
                        },
                    ]
                }
            }
        })
        await newMedicine.delete()
        await cliente.delete()
    })
    test('should returns a pagination data if paginate is called with limit per page', async ({ client, route }) => {
        const cpf = '123.123.123-23'
        const password = 'any_senha'
        await Cliente.query().where('cpf', cpf).delete()
        const cliente = await Cliente.create({
            nome: 'any_nome',
            email: 'any_email@mail.com',
            cpf,
            password: password,
            dataNascimento: new Date(),
        })
        const responseAuth = await client.post(route('signin')).json({
            cpf,
            senha: password,
        })
        const medicineRow = await Database.from('medicamentos').first()
        const medicine = {
            idMedicamento: medicineRow.id,
            horaGerenciamento: '10:20',
        }
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        const newMedicines = [
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
        ]
        const data: any[] = []
        const limit = 3
        for (const newMedicine of newMedicines) {
            newMedicine.idCliente = cliente.id
            newMedicine.idMedicamento = medicine.idMedicamento
            newMedicine.horaGerenciamento = medicine.horaGerenciamento as any
            await newMedicine.save()
            data.push({
                id: newMedicine.id,
                id_cliente: cliente.id,
                id_medicamento: newMedicine.idMedicamento,
                hora_gerenciamento: newMedicine.horaGerenciamento,
                medicamento: {
                    id: medicineRow.id,
                    farmaceutica: medicineRow.farmaceutica,
                    nome: medicineRow.nome,
                },
            })
        }
        data.reverse()
        data.splice(limit)

        const { body } = responseAuth.body()
        const bearer = `Bearer ${body.cliente.token}`
        
        const page = 1
        const total = newMedicines.length
        const lastPage = Math.ceil(total / limit)
        const responseMedicines = await client
            .get(`/api/v1/medicines/all?page=${page}&limit=${limit}`)
            .header('Authorization', bearer)
        responseMedicines.assertStatus(200)
        responseMedicines.assertBodyContains({
            body: {
                gerenciamentos: {
                    meta: {
                        total,
                        per_page: limit,
                        current_page: page,
                        last_page:lastPage,
                        first_page: 1,
                        first_page_url: '/?page=1',
                        last_page_url: '/?page=' + lastPage,
                        next_page_url: page < lastPage ? '/?page=' + (page + 1) : null,
                        previous_page_url: page > 1 ? '/?page=' + (page - 1) : null,
                    },
                    data,
                }
            }
        })
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        await cliente.delete()
    })
    test('should returns a pagination data if paginate is called with limit per page and some page', async ({ client, route }) => {
        const cpf = '123.123.123-23'
        const password = 'any_senha'
        await Cliente.query().where('cpf', cpf).delete()
        const cliente = await Cliente.create({
            nome: 'any_nome',
            email: 'any_email@mail.com',
            cpf,
            password: password,
            dataNascimento: new Date(),
        })
        const responseAuth = await client.post(route('signin')).json({
            cpf,
            senha: password,
        })
        const medicineRow = await Database.from('medicamentos').first()
        const medicine = {
            idMedicamento: medicineRow.id,
            horaGerenciamento: '10:20',
        }
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        const newMedicines = [
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
        ]
        const data: any[] = []
        const limit = 3
        for (const newMedicine of newMedicines) {
            newMedicine.idCliente = cliente.id
            newMedicine.idMedicamento = medicine.idMedicamento
            newMedicine.horaGerenciamento = medicine.horaGerenciamento as any
            await newMedicine.save()
            data.push({
                id: newMedicine.id,
                id_cliente: cliente.id,
                id_medicamento: newMedicine.idMedicamento,
                hora_gerenciamento: newMedicine.horaGerenciamento,
                medicamento: {
                    id: medicineRow.id,
                    farmaceutica: medicineRow.farmaceutica,
                    nome: medicineRow.nome,
                },
            })
        }
        const page = 2
        data.reverse()
        data.splice(0, limit * (page - 1))

        const { body } = responseAuth.body()
        const bearer = `Bearer ${body.cliente.token}`
        
        const total = newMedicines.length
        const lastPage = Math.ceil(total / limit)
        const responseMedicines = await client
            .get(`/api/v1/medicines/all?page=${page}&limit=${limit}`)
            .header('Authorization', bearer)
        responseMedicines.assertStatus(200)
        responseMedicines.assertBodyContains({
            body: {
                gerenciamentos: {
                    meta: {
                        total,
                        per_page: limit,
                        current_page: page,
                        last_page: lastPage,
                        first_page: 1,
                        first_page_url: '/?page=1',
                        last_page_url: '/?page=' + lastPage,
                        next_page_url: page < lastPage ? '/?page=' + (page + 1) : null,
                        previous_page_url: page > 1 ? '/?page=' + (page - 1) : null,
                    },
                    data,
                }
            }
        })
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        await cliente.delete()
    })
    test('should returns a pagination data if paginate is called with limit per page and some page', async ({ client, route }) => {
        const cpf = '123.123.123-23'
        const password = 'any_senha'
        await Cliente.query().where('cpf', cpf).delete()
        const cliente = await Cliente.create({
            nome: 'any_nome',
            email: 'any_email@mail.com',
            cpf,
            password: password,
            dataNascimento: new Date(),
        })
        const responseAuth = await client.post(route('signin')).json({
            cpf,
            senha: password,
        })
        const medicineRow = await Database.from('medicamentos').first()
        const medicine = {
            idMedicamento: medicineRow.id,
            horaGerenciamento: '10:20',
        }
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        const newMedicines = [
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
            new Gerenciamento(),
        ]
        const data: any[] = []
        const limit = 3
        for (const newMedicine of newMedicines) {
            newMedicine.idCliente = cliente.id
            newMedicine.idMedicamento = medicine.idMedicamento
            newMedicine.horaGerenciamento = medicine.horaGerenciamento as any
            await newMedicine.save()
            data.push({
                id: newMedicine.id,
                id_cliente: cliente.id,
                id_medicamento: newMedicine.idMedicamento,
                hora_gerenciamento: newMedicine.horaGerenciamento,
                medicamento: {
                    id: medicineRow.id,
                    farmaceutica: medicineRow.farmaceutica,
                    nome: medicineRow.nome,
                },
            })
        }
        const page = 2
        data.reverse()
        data.splice(0, limit * (page - 1))

        const { body } = responseAuth.body()
        const bearer = `Bearer ${body.cliente.token}`
        
        const total = newMedicines.length
        const lastPage = Math.ceil(total / limit)
        const responseMedicines = await client
            .get(`/api/v1/medicines/all?page=${page}&limit=${limit}`)
            .header('Authorization', bearer)
        responseMedicines.assertStatus(200)
        responseMedicines.assertBodyContains({
            body: {
                gerenciamentos: {
                    meta: {
                        total,
                        per_page: limit,
                        current_page: page,
                        last_page: lastPage,
                        first_page: 1,
                        first_page_url: '/?page=1',
                        last_page_url: '/?page=' + lastPage,
                        next_page_url: page < lastPage ? '/?page=' + (page + 1) : null,
                        previous_page_url: page > 1 ? '/?page=' + (page - 1) : null,
                    },
                    data,
                }
            }
        })
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        await cliente.delete()
    })
    test('should returns a pagination none data if paginate is called', async ({ client, route }) => {
        const cpf = '123.123.123-23'
        const password = 'any_senha'
        await Cliente.query().where('cpf', cpf).delete()
        const cliente = await Cliente.create({
            nome: 'any_nome',
            email: 'any_email@mail.com',
            cpf,
            password: password,
            dataNascimento: new Date(),
        })
        const responseAuth = await client.post(route('signin')).json({
            cpf,
            senha: password,
        })
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        const { body } = responseAuth.body()
        const bearer = `Bearer ${body.cliente.token}`
        const responseMedicines = await client
            .get(`/api/v1/medicines/all`)
            .header('Authorization', bearer)
        responseMedicines.assertStatus(200)
        responseMedicines.assertBodyContains({
            body: {
                gerenciamentos: {
                    meta: {
                        total: 0,
                        per_page: 10,
                        current_page: 1,
                        last_page: 1,
                        first_page: 1,
                        first_page_url: '/?page=1',
                        last_page_url: '/?page=1',
                        next_page_url: null,
                        previous_page_url: null,
                    },
                    data: [],
                }
            }
        })
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        await cliente.delete()
    })
    test('should returns a 401 error code if get-by-id is called with invalid authorization token', async ({ client, route }) => {
        const bearer = `Bearer invalid_token`
        const responseMedicines = await client
            .get(`/api/v1/medicines/get-by-id/0`)
            .header('Authorization', bearer)
        responseMedicines.assertStatus(401)
    })
    test('should returns a 404 error code if get-by-id is called with invalid id', async ({ client, route }) => {
        const cpf = '123.123.123-23'
        const password = 'any_senha'
        await Cliente.query().where('cpf', cpf).delete()
        const cliente = await Cliente.create({
            nome: 'any_nome',
            email: 'any_email@mail.com',
            cpf,
            password: password,
            dataNascimento: new Date(),
        })
        const responseAuth = await client.post(route('signin')).json({
            cpf,
            senha: password,
        })
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        const { body } = responseAuth.body()
        const bearer = `Bearer ${body.cliente.token}`
        const responseMedicines = await client
            .get(`/api/v1/medicines/get-by-id/0`)
            .header('Authorization', bearer)
        responseMedicines.assertStatus(404)
        await Gerenciamento.query().where('id_cliente', cliente.id).delete()
        await cliente.delete()
    })
})