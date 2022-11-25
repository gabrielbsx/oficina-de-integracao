import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Medicamento from './Medicamento'
import Cliente from './Cliente'

export default class Gerenciamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'id_medicamento' })
  public idMedicamento: number

  @column({ columnName: 'hora_gerenciamento' })
  public horaGerenciamento: DateTime

  @column({ columnName: 'id_cliente' })
  public idCliente: number

  @belongsTo(() => Medicamento, {
    foreignKey: 'idMedicamento',
  })
  public medicamento: BelongsTo<typeof Medicamento>

  @belongsTo(() => Cliente, {
    foreignKey: 'idCliente',
  })
  public cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
