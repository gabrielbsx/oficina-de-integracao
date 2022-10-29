import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Gerenciamento from './Gerenciamento'

export default class Medicamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public farmaceutica: string

  @hasMany(() => Gerenciamento, {
    foreignKey: 'id_medicamento',
  })
  public gerenciamentos: HasMany<typeof Gerenciamento>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
