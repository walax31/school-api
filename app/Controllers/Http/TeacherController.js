"use strict";

const Database = use("Database");
const Hash = use("Hash");
const Validator = use("Validator");

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

    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

    const teachers = await Database.select("*")
      .from("teachers")
      .where("teacher_id", id)
      .first();
    //0, "" ,false ,undefine,null =>false
    return { status: 200, error: undefined, data: teachers || {} };
  }
  async store({ request }) {
    const { first_name, last_name, email, password } = request.body;

    const rules = {
      first_name: "required",
      last_name: "requried",
      email: "required|email|unique:teachers,email",
      password: "required|min:8",
    };

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    // const missingKeys = []

    // if (!first_name) missingKeys.push('first_name')
    // if (!last_name) missingKeys.push('last_name')
    // if (!email) missingKeys.push('email')
    // if (!password) missingKeys.push('password')

    // new RegExp(/hello/gi).test("hello word")
    // new RegExp("hello",gi).test("hello word")//ไม่นิยมใช้
    // (/hello/gi).test('hello word')

    // if (missingKeys.length)
    //   return { status: 422, error: `${missingKeys} is missing.`, data: undefined }

    const hashedPassword = await Hash.make(password);

    const teacher = await Database.table("teachers").insert({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    return {
      status: 200,
      error: undefined,
      data: { first_name, last_name, email },
    };
  }
  async update({ request }) {
    const { body, params } = request;
    // const body=request.body
    // const params=request.params
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

    // const deletedTeacher = await Database
    await Database.table("teachers").where({ teacher_id: id }).delete();

    // return deletedTeachers

    return { status: 200, error: undefined, data: { massage: "success" } };
  }
}

module.exports = TeacherController;
