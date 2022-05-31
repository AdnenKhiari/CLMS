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
      label: "Grade",
      name: "grade",
      type: "text",
    },    
    {
      label: "Salary",
      name: "salary",
      type: "number",
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
    grade: Joi.string().trim().required().valid("A","C","D","").label("Grade"),
    salary : Joi.number().positive().required().label("Salary").allow(""),
    email : Joi.string().trim().allow("").required().email({tlds: false}).label("Email"),
    password : Joi.string().min(3).required().allow("").label("Password"),
    address : Joi.string().trim().allow("",null).required().label("Address").allow(null),
    birth_date : Joi.date().allow("").required().label("BirthDate")
})
}
}
const UserMod = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.USERS,Fetcher.patchData)
  if(!useCheckRole(PERMISSIONS.USER_MOD_PERM))
    return <Navigate to="/home" />
    return <>
      <h2>{"Modify a User"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}
      <ErrorDisplay err={err} />
    </>  
}
export default UserMod