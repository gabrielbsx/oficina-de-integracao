import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gerenciamentos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table
        .bigInteger('id_cliente')
        .notNullable()
        .references('id')
        .inTable('clientes')
        .onDelete('cascade')
      table
        .bigInteger('id_medicamento')
        .notNullable()
        .references('id')
        .inTable('medicamentos')
        .onDelete('cascade')
      table.time('hora_gerenciamento').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
