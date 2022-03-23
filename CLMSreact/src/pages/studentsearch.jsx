
import React from "react"
import * as ROUTES from "../lib/apiroutes"
import * as Fetcher from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"
import Joi from "joi"
import ErrorDisplay from "../components/ErrorForm"



const useIdField = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [{
    label: "ID",
    name: "ID",
    type: "number",
  }],
  schema :  Joi.object({
    ID : Joi.number().positive().required().label("ID")
  })
}}


const allfields = (Submit = (data)=>console.log(data))=>{return {

  Submit : Submit,
  fields : [
    {
      label: "First Name ",
      name: "first_name",
      type: "text",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
    },
    {
      label: "Gender",
      name: "gender",
      type: "text",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      nullable : true

    },
    {
      label: "Birth Date",
      name: "birth_date",
      type: "date"
    },
    {
      label: "Email",
      name: "email",
      type: "text"
    }
  ],
  schema : Joi.object({
    first_name: Joi.string().required().allow("").trim().label("First Name"),
    last_name: Joi.string().required().allow("").trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F","").label("Gender"),
    email : Joi.string().trim().allow("").required().label("Email"),
    birth_date : Joi.date().allow("").required().label("BirthDate"),
    grade: Joi.string().trim().required().valid("A","C","D","").label("Grade"),
    salary : Joi.number().positive().required().allow("").label("Salary"),
    address : Joi.string().trim().allow("").optional().label("Address").default(null).allow(null)
 })
}
}
const StudentSearch = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.STUDENTS,Fetcher.getData)
  const {Submit : Submit2,data : data2 ,error : err2} = Fetcher.useFetch(ROUTES.STUDENTS,Fetcher.getData)
    return <>
      <h2>{"Search for a Student"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}


      <AForm allfields={useIdField(Submit2)} />
      {data2 && err2 == null && <AList data={{
          name:"Search Results",
          body : data2
        }}/>}

      <ErrorDisplay err={err} />

      <ErrorDisplay err={err2} />
    </>  
}
export default StudentSearch