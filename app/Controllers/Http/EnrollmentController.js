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

class EnrollmentController {
  async index() {
    const enrollments = await Database.table("enrollments");

    return { status: 200, error: undefined, data: enrollments };
  }
  async show({ request }) {
    const { id } = request.params;

    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

    const enrollments = await Database.select("*")
      .from("enrollments")
      .where("enrollments_id", id)
      .first();

    return { status: 200, error: undefined, data: enrollments || {} };
  }
  async store({ request }) {
    const { mark } = request.body;
    const rules = {
      first_name: "required",
      last_name: "requried",
      email: "required|email|unique:teachers,email",
      password: "required|min:8",
    };

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    const enrollment = await Database.table("enrollments").insert({ mark });

    return { status: 200, error: undefined, data: { mark } };
  }

  async update({ request }) {
    const { body, params } = request;
    const { id } = params;
    const { mark } = body;

    const enrollmentId = await Database.table("enrollments")
      .where({ enrollments_id: id })
      .update({ mark });

    const enrollment = await Database.table("enrollments")
      .where({ enrollments_id: enrollmentId })
      .first();

    return { status: 200, error: undefined, data: { massage: "success" } };
  }
  async destroy({ request }) {
    const { id } = request.params;

    await Database.table("enrollments").where({ enrollments_id: id }).delete();

    return { status: 200, error: undefined, data: { massage: "success" } };
  }
}

module.exports = EnrollmentController;
