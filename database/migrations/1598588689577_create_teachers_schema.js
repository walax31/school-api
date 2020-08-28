'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTeachersSchema extends Schema {
  up () {
    this.create('teachers', (table) => {
      table.increments('teacher_id')
      table.integer('group_id').unsigned()
      table.string('first_name',120).notNullable()
      table.string('last_name',120).notNullable()
      table.string('email',255).notNullable().unique()
      table.string('password').notNullable()
      table.timestamps()

       
    })
  }

  down () {
    this.drop('teachers')
    }
  }


module.exports = CreateTeachersSchema
