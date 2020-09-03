"use strict";

const { test } = use("Test/Suite")("Teacher Validator");
const teacherValidator =require('../../service/TeacherValidator.js')

test("should receive obj as first parameter", async ({ assert }) => {
  const validateData =await teacherValidator({
    first_name:"john"
    ,last_name:"Doe"
    ,email:"john@gmail.com"
    ,password:"12345678"
  })
  assert.isOk( validatedData)
  const  validatedata2 =await teacherValidator("john","doe","wrong email","pass")
  assert.inNotOk(validatedata2)
})
test("should reture error when pass incorrect data",async({ assert})=>{
  const validatedData =await teacherValidator("wala","blue","wala.com","123458")
  assert.isArray(validatedData.error)
})

test('should return only one error if singele incorrect data is passed', async ({assert})=>{
  const validatedData =await teacherValidator({
    first_name:"john"
    ,last_name:"Doe"
    ,email:"john@gmail.com"
    ,password:"12347"
  })
  assert.equal( validatedData.error.length,1)
}
)

test('should reture more than one error if mutiple incorrect data is passed', async({assert})=>{
  const validatedData =await teacherValidator("wala","blue","wala.com","123458")
  assert.isAbove(validatedData.error.length,1)
})

test("should return undefined when pass correct data", async({ assert })=>{
  const validateData =await teacherValidator({
    first_name:"john"
    ,last_name:"Doe"
    ,email:"john@gmail.com"
    ,password:"12345678"
  })
  assert.equal(validateData.error ,undefined)
})