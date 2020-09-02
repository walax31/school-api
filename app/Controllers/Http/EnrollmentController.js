"use strict";

const Database = use(`Database`);
const Validator = use("Validator");
const Enrollment= use('App/Models/Enrollment')

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param:${number} is not supported,please use number type param intnstead`,
    };
  }
  return {};
}

class EnrollmentController {
  async index({request}) {
    const {references=undefined} = request.qs
    const enrollments=Enrollment.query()
    if (references){
      const extractedReferences =references.split(",")
      for(const value of extractedReferences){
        enrollments.with(value)
      }
      
    } 

    return { status: 200, error: undefined, data:await enrollments.fetch() };
  }
  
  
  
  
  
  async show({ request }) {
    const { id } = request.params;
    const enrollment =await Enrollment.find(id)
    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };

    

    return { status: 200, error: undefined, data: enrollments || {} };
  }



  async store({ request }) {
    const { mark,student_id,subject_id } = request.body;
   
    const rules = {
     mark:"required"
    };

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };
      const enrollment = new Enrollment()
      enrollment.mark =mark
      enrollment.student_id=student_id
      enrollment.subject_id=subject_id
  
      await enrollment.save()
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
