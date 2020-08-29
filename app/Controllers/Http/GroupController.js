"use strict";

const Database = use(`Database`);
function numberTypeParameValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    error: `param:${number} is not supported,please use number type param intnstead`;
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

    const validateValue = numberTypeParameValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

    const enrollments = await Database.select("*")
      .from("groups")
      .where("groups_id", id)
      .first();

    return { status: 200, error: undefined, data: group || {} };
  }
  async store({ request }) {
    const { name} = request.body;
    const missingKeys = [];
    if (!name) missingKeys.push("name");
    if (missingKeys.length)
      return {
        status: 422,
        error: `${missingKeys} is missing.`,
        data: undefined,
      };
    const enrollment = await Database.table("groups").insert({ name });

    return { status: 200, error: undefined, data: { name } };
  }
}

module.exports = GroupController;
