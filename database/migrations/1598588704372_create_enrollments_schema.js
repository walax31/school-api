'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEnrollmentsSchema extends Schema {
  up () {
    this.create('enrollments', (table) => {
      table.increments('enrollments_id')
      table.float('mark').default(0)
      table.timestamp('mark_date').default(this.fn.now())
      table.timestamps()
      table.integer('student_id').notNullable().unsigned()
      table.integer('subject_id').notNullable().unsigned()

      table
      .foreign('student_id')
      .references('students.student_id')
      .onDelete('CASCADE') //on delete cascade
      .onUpdate('CASCADE') //on update cascade

      table
      .foreign('subject_id')
      .references('subjects.subject_id')
      .onDelete('CASCADE') //on delete cascade
      .onUpdate('CASCADE') //on update cascade

      

    })
  }

  down () {
    this.drop('enrollments')
  }
}

module.exports = CreateEnrollmentsSchema
