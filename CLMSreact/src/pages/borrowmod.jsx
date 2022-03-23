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
    ID : Joi.number().positive().required().label("ID"),
    student_ID : Joi.number().positive().required().allow("").label("Student ID"),
    book_ID : Joi.number().positive().required().allow("").label("Book ID"),
    date_borrowed : Joi.date().required().allow("").label("Date Borrowed"),
    date_return : Joi.date().optional().allow("",null).default(null).label("Date Return"),
})
}}

const BorrowMod = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BORROWS,Fetcher.patchData)
    return <>
      <h2>{"Modify a Borrow"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}

      <ErrorDisplay err={err} />
      
    </>  
}
export default BorrowMod