'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSupjectsSchema extends Schema {
  up () {
    this.create('subjects', (table) => {
      table.increments('subject_id')
      table.string('title').notNullable()
      table.integer('teacher_id').notNullable().unsigned()

      table.foreign('teacher_id')
      .references('teachers.teacher_id')
      .onDelete('CASCADE') //on delete cascade
      .onUpdate('CASCADE') //on update cascade
    })
  }

  down () {
    this.drop('subjects')
  }
}

module.exports = CreateSupjectsSchema
