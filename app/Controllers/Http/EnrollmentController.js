"use strict";

const Database = use(`Database`);


  function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) { return { error: `param:${number} is not supported,please use number type param intnstead` } }
    return {}
  }


class EnrollmentController {
  async index() {
    const enrollments = await Database.table("enrollments");

    return { status: 200, error: undefined, data: enrollments };
  }
  async show({ request }) {
    const { id } = request.params;

    const validateValue = numberTypeParamValidator(id)

    if (validateValue.error)
    return { status: 500, error: validateValue.error, data: undefined }

    const enrollments = await Database
      .select('*')
      .from('enrollments')
      .where("enrollments_id", id)
      .first()

    return { status: 200, error: undefined, data: enrollments || {} };
  }
  async store({ request }) {

    const { mark } = request.body
    const missingKeys = []

    if (!mark) missingKeys.push('make')
    if (missingKeys.length)
      return {
        status: 422,
        error: `${missingKeys} is missing.`,
        data: undefined,
      }
      const enrollment =await Database
      .table('enrollments')
      .insert({mark})

      return{status:200,error: undefined,data:{mark}}
  }
}

module.exports = EnrollmentController;
