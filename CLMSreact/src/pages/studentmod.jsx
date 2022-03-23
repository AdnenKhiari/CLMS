import React from "react"
import * as ROUTES from "../lib/apiroutes"
import * as Fetcher from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"
import Joi from "joi"
import ErrorDisplay from "../components/ErrorForm"

const allfields = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [
    {
      label: "ID",
      name: "ID",
      type: "number",
    },
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
      type: "email"
    },
    {
      label: "Password",
      name: "password",
      type: "password"
    }
  ],
  schema: Joi.object({
    ID : Joi.number().positive().required().label("ID"),
    first_name: Joi.string().required().allow("").trim().label("First Name"),
    last_name: Joi.string().required().allow("").trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F","").label("Gender"),
    email : Joi.string().trim().allow("").required().email({tlds: false}).label("Email"),
    password : Joi.string().length(3).required().allow("").label("Password"),
    address : Joi.string().trim().allow("",null).required().label("Address").allow(null),
    birth_date : Joi.date().allow("").required().label("BirthDate")
})
}
}
const StudentMod = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.STUDENTS,Fetcher.patchData)
    return <>
      <h2>{"Modify a Student"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}
      <ErrorDisplay err={err} />
    </>  
}
export default StudentMod