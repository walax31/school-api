"use strict";

const Database = use(`Database`);

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param:${number} is not supported,please use number type param intnstead`,
    };
  }
  return {};
}

class GroupController {
  async index() {
    const group = await Database.table("groups");

    return { status: 200, error: undefined, data: group };
  }
  async show({ request }) {
    const { id } = request.params;

    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

    const enrollments = await Database.select("*")
      .from("groups")
      .where("groups_id", id)
      .first();

    return { status: 200, error: undefined, data: group || {} };
  }
  async store({ request }) {
    const { name } = request.body;
    const rules = {
      first_name: "required",
      last_name: "requried",
      email: "required|email|unique:teachers,email",
      password: "required|min:8",
    };

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    const enrollment = await Database.table("groups").insert({ name });

    return { status: 200, error: undefined, data: { name } };
  }

  async update({ request }) {
    const { body, params } = request;

    const { id } = params;
    const { name } = body;

    const groupId = await Database.table("groups")
      .where({ groupId: id })
      .update({ name });

    const group = await Database.table("groups")
      .where({ group_id: groupId })
      .first();
    return { status: 200, error: undefined, data: group };
  }
  async destroy({ request }) {
    const { id } = request.params;

    await Database.table("groups").where({ group_id: id }).delete();

    // return deletedTeachers

    return { status: 200, error: undefined, data: { massage: "success" } };
  }
}

module.exports = GroupController;
