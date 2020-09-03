"use strict";

const Database = use(`Database`);
const Group = use("App/Models/Group");

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param:${number} is not supported,please use number type param intnstead`,
    };
  }
  return {};
}

class GroupController {
  async index({ request }) {
    const { references = undefined } = request.qs;
    const groups = Group.query();
    if (references) {
      const extractedReferences = references.split(",");
      groups.with(extractedReferences);
    }

    return { status: 200, error: undefined, data: await groups.fetch() };
  }

  async show({ request }) {
    const { id } = request.params;
    const group = await Group.find(id);
    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

    return { status: 200, error: undefined, data: group || {} };
  }

  async store({ request }) {
    const { name } = request.body;
    const rules = {
      name: "required",
    };

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };

    const group = new Group();
    group.name = name;

    await group.save();
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
