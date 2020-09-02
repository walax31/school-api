"use strict";

const Database = use("Database");
const Hash = use("Hash");
const Validator = use("Validator");
const Teacher =use('App/Models/Teacher')

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param:${number} is not supported,please use number type param intnstead`,
    };
  }
  return {};
}

class TeacherController {
  async index() {
    const teachers = await Database.table("teachers");

    return { status: 200, error: undefined, data: teachers };
  }


 
 
 
  async show({ request }) {
    const { id } = request.params;
    const teacher= await Teacher.find(id)

    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

   
    return { status: 200, error: undefined, data: teachers || {} };
  }


  async store({ request }) {
    const { first_name, last_name, email, password,group_id,} = request.body;
    
    
    const rules = {
      first_name: "required",
      last_name: "required",
      email: "required|email|unique:teachers,email",
      password: "required|min:8",
    };

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };


    const hashedPassword = await Hash.make(password);
    const teacher= new Teacher()
    
    teacher.first_name=first_name
    teacher.last_name=last_name
    teacher.email=email
    teacher.password=password
    await teacher.save()


    return {
      status: 200,
      error: undefined,
      data: { first_name, last_name, email },
    };
  }


  async update({ request }) {
    const { body, params } = request;
 
    const { id } = params;
    const { first_name, last_name, email } = body;

    const teacherId = await Database.table("teachers")
      .where({ teacher_id: id })
      .update({ first_name, last_name, email });

    const teacher = await Database.table("teachers")
      .where({ teacher_id: teacherId })
      .first();
    return { status: 200, error: undefined, data: teacher };
  }


  async destroy({ request }) {
    const { id } = request.params;

   
    await Database.table("teachers").where({ teacher_id: id }).delete();

 

    return { status: 200, error: undefined, data: { massage: "success" } };
  }
}

module.exports = TeacherController;
