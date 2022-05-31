
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
    }
  ],
  schema : Joi.object({
    ID : Joi.number().positive().required().label("ID")
})
}
}
const BookDel = ()=>{
  
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BOOKS,Fetcher.deleteData)
  console.log(data,err)
  if(!useCheckRole(PERMISSIONS.BOOK_DEL_PERM))
  return <Navigate to="/home" />
  return <>
    <h2>{"Delete a Book"}</h2>
    <AForm allfields={allfields(Submit)} />
    {data && err == null && <AList data={{
        name:"Search Results",
        body : data
      }}/>}
      <ErrorDisplay err={err} />

  </>  
}
export default BookDel

