'use strict'

const Database = use(`Database`);

  function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) { return { error: `param:${number} is not supported,please use number type param intnstead` } }
    return {}
  }


class SubjectController {
    async index() {
        const subject = await Database.table("subjects");
    
        return { status: 200, error: undefined, data: group }
      }
      async show({ request }) {
        const { id } = request.params;
    
        const validateValue = numberTypeParamValidator(id)
    
        if (validateValue.error)
          return { status: 500, error: validateValue.error, data: undefined }
    
        const enrollments = await Database.select("*")
          .from("subjects")
          .where("subject_id", id)
          .first();
    
        return { status: 200, error: undefined, data: subject || {} }
      }
      async store({ request }) {
        const { title} = request.body;
        const missingKeys = [];
        if (!title) missingKeys.push("title")
        if (missingKeys.length)
          return {
            status: 422,
            error: `${missingKeys} is missing.`,
            data: undefined,
          };
        const enrollment = await Database.table("subjects").insert({ title })
    
        return { status: 200, error: undefined, data: { title } }
      }
}

module.exports = SubjectController
