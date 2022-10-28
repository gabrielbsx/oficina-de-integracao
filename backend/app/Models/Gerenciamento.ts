import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Medicamento from './Medicamento'
import Cliente from './Cliente'

export default class Gerenciamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idMedicamento: number

  @column()
  public horaGerenciamento: Date

  @column()
  public idCliente: number

  @belongsTo(() => Medicamento, {
    foreignKey: 'id_medicamento',
  })
  public medicamento: BelongsTo<typeof Medicamento>

  @belongsTo(() => Cliente, {
    foreignKey: 'id_cliente',
  })
  public cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
