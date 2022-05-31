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
  schema: Joi.object({
    ID : Joi.number().positive().required().label("ID")
})
}}

const BorrowDel = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BORROWS,Fetcher.deleteData)
  if(!useCheckRole(PERMISSIONS.BORROW_DEL_PERM))
  return <Navigate to="/home" />

  return <>
      <h2>{"Delete a Borrow"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}

      <ErrorDisplay err={err} />
      
    </>  
}
export default BorrowDel