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
      label: "Book ID",
      name: "book_ID",
      type: "number",
    },
    {
      label: "Student ID",
      name: "student_ID",
      type: "number",
    },   
    {
      label: "Date Return",
      name: "date_return",
      type: "date",
      nullable : true
    },
    {
      label: "Date Borrowed",
      name: "date_borrowed",
      type: "date"
    }
  ],
  schema: Joi.object({
    student_ID : Joi.number().positive().required().label("Student ID"),
    book_ID : Joi.number().positive().required().label("Book ID"),
    date_borrowed : Joi.date().required().label("Date Borrowed"),
    date_return : Joi.date().optional().allow(null).default(null).label("Date Return")
})
}}

const BorrowAdd = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BORROWS,Fetcher.postData)
  if(!useCheckRole(PERMISSIONS.BORROW_ADD_PERM))
  return <Navigate to="/home" />
   return <>
      <h2>{"Add a Borrow"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}

      <ErrorDisplay err={err} />
      
    </>  
}
export default BorrowAdd