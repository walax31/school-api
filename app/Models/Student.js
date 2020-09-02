'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    static get primaryKey(){
    return 'student_id'
    
    }
    enrollments(){
        return this.hasMany('App/Models/Enrollment')
    }
    group(){
        return this.belongsTo('App/Models/Group')
    }
}

module.exports = Student
