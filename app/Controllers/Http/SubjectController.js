"use strict";

const Database = use(`Database`);
const Validator = use("Validator");
const Subject =use('App/Models/Subject')

function numberTypeParamValidator(number) {
  if (Number.isNaN(parseInt(number))) {
    return {
      error: `param:${number} is not supported,please use number type param intnstead`,
    };
  }
  return {};
}

class SubjectController {
  async index({request}) {
    //? /subjects?references
    const { references=undefined} =request.qs
    const subjects = Subject.query()
    if (references){
       const extractedReferences =references.split(",")
       subjects.with(extractedReferences)
    }
     return { status: 200, error: undefined, data:await subjects.fetch() };
  }
 
 
  async show({ request }) {
    const { id } = request.params;
    const subject =await Subject.find(id)
    const validateValue = numberTypeParamValidator(id);

    if (validateValue.error)
      return { status: 500, error: validateValue.error, data: undefined };



    return { status: 200, error: undefined, data: subject || {} };
  }
  
  
 
 
 
 
 
  async store({ request }) {
    const { title,teacher_id } = request.body;
    
   
    const rules = {
      title: "required"
    }

    const validation = await Validator.validateAll(request.body, rules);
    if (validation.fails())
      return { status: 422, error: validation.messages(), data: undefined };
    
    const subject = new Subject()
    subject.title =title
    subject.teacher_id =teacher_id
  
    await subject.save()
    

    return {status:200 ,error:undefined ,data: title}
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

    await Database
    .table("subjects")
    .where({ subject_id: id })
    .delete();

    return { status: 200, error: undefined, data: { massage: "success" } };
  }

  
  
  
  
  
  
  
  async showTeacher({request}){
    const {id} =request.params
    const subject =await Database
    .table('subjects')
    .where({subject_id: id})
    .innerJoin('teachers','subjects.teacher_id','teachers.teacher_id')
    .first();

  }
}

module.exports = SubjectController;
