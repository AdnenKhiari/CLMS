import React from "react"
import * as ROUTES from "../lib/apiroutes"
import * as Fetcher from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"
import Joi from "joi"
import ErrorDisplay from "../components/ErrorForm"

import {useCheckRole} from "../lib/utils"
import * as PERMISSIONS from "../lib/permissions"
import {Navigate} from "react-router-dom"


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
      type: "email"
    },
    {
      label: "Password",
      name: "password",
      type: "password"
    }
  ],
  schema: Joi.object({
    first_name: Joi.string().required().trim().label("First Name"),
    last_name: Joi.string().required().trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F").label("Gender"),
    email : Joi.string().trim().required().email({tlds : false }).label("Email"),
    password : Joi.string().min(3).required().label("Password"),
    address : Joi.string().trim().optional().label("Address").default(null).allow(null),
    birth_date : Joi.date().optional().label("BirthDate").default(null)
  })
}
}
const StudentAdd = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.STUDENTS,Fetcher.postData)
  if(!useCheckRole(PERMISSIONS.STUDENT_ADD_PERM))
  return <Navigate to="/home" />
    return <>
      <h2>{"Add a Student"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}

      <ErrorDisplay err={err} />
    </>  
}
export default StudentAdd