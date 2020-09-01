"use strict";

const Database = use(`Database`);
const Validator = use("Validator");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param:${number} is not supported,please use number type param intnstead`,
    };
  }
  return {};
}

class SubjectController {
  async index() {
    const subject = await Database.table("subjects");

    return { status: 200, error: undefined, data: group };
  }
  async show({ request }) {
    const { id } = request.params;

    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

    const enrollments = await Database.select("*")
      .from("subjects")
      .where("subject_id", id)
      .first();

    return { status: 200, error: undefined, data: subject || {} };
  }
  async store({ request }) {
    const { title } = request.body;

    const rules = {
      first_name: "required",
      last_name: "requried",
      email: "required|email|unique:teachers,email",
      password: "required|min:8",
    };

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    const enrollment = await Database.table("subjects").insert({ title });

    return { status: 200, error: undefined, data: { title } };
  }

  async update({ request }) {
    const { body, params } = request;

    const { id } = params;
    const { title } = body;

    const subjectID = await Database.table("subjects")
      .where({ subject_id: id })
      .update({ title });

    const subject = await Database.table("subjects")
      .where({ subject_id: subjectID })
      .first();

    return { status: 200, error: undefined, data: subject };
  }
  async destroy({ request }) {
    const { id } = request.params;

    await Database.table("subjects").where({ subject_id: id }).delete();

    return { status: 200, error: undefined, data: { massage: "success" } };
  }
}

module.exports = SubjectController;
