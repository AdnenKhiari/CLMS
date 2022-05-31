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
    first_name: Joi.string().required().trim().label("First Name"),
    last_name: Joi.string().required().trim().label("Last Name"),
    gender: Joi.string().trim().required().valid("M","F").label("Gender"),
    email : Joi.string().trim().required().email({tlds: false}).label("Email"),
    password : Joi.string().min(3).required().label("Password"),
    address : Joi.string().trim().optional().label("Address").default(null).allow(null),
    grade: Joi.string().trim().required().valid("A","C","D").label("Grade"),
    salary : Joi.number().positive().required().label("Salary"),
    birth_date : Joi.date().required().label("BirthDate")
})

}}

const UserAdd = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.USERS,Fetcher.postData)
  if(!useCheckRole(PERMISSIONS.USER_ADD_PERM))
    return <Navigate to="/home" />
    return <>
      <h2>{"Add a User"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}

      <ErrorDisplay err={err} />
      
    </>  
}
export default UserAdd