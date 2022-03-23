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
  schema : Joi.object({
    ID: Joi.number().positive().required()
})
}}
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
  schema : Joi.object({
    student_ID : Joi.number().positive().required().allow("").label("Student ID"),
    book_ID : Joi.number().positive().required().allow("").label("Book ID"),
    date_borrowed : Joi.date().required().allow("").label("Date Borrowed"),
    date_return : Joi.date().optional().allow("",null).default(null).label("Date Return"),
})
}
}

const BorrowSearch = ()=>{
    const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BORROWS,Fetcher.getData)
    const {Submit : Submit2,data : data2 ,error : err2} = Fetcher.useFetch(ROUTES.BORROWS,Fetcher.getData)
    console.log("Response",data,err)
    return <>
      <h2>{"Search a Borrow"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Search Results",
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
export default BorrowSearch