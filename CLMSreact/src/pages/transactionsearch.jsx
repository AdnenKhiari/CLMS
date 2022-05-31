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


const uIdField = (Submit = (data)=>console.log(data))=>{return {
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
        label: "Borrow ID",
        name: "borrow_ID",
        type: "number",
    },
    {
        label: "User ID",
        name: "user_ID",
        type: "number",
    },   
    {
        label: "Name",
        name: "name",
        type: "text"
    },
    {
        label: "Comment",
        name: "comment",
        type: "text",
        nullable : true
    }
  ],
  schema : Joi.object({
    name : Joi.string().trim().allow("").required().label("Name"),
    comment: Joi.string().trim().allow("").optional().allow(null).default(null).label("Comment"),
    borrow_ID : Joi.number().positive().required().allow("").label("Borrow ID"),
    user_ID : Joi.number().positive().required().allow("").label("User ID")
})
}
}

const TransactionSearch = ()=>{
    const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.TRANSACTIONS,Fetcher.getData)
    const {Submit : Submit2,data : data2 ,error : err2} = Fetcher.useFetch(ROUTES.TRANSACTIONS,Fetcher.getData)
    console.log("Response",data,err)
    if(!useCheckRole(PERMISSIONS.TRANSACTION_SEARCH_PERM))
      return <Navigate to="/home" />
    return <>
      <h2>{"Search a Transaction"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Search Results",
          body : data
        }}/>}
      <AForm allfields={uIdField(Submit2)} />
      {data2 && err2 == null && <AList data={{
          name:"Search Results",
          body : data2
        }}/>}
      <ErrorDisplay err={err} />

      <ErrorDisplay err={err2} />

        
        </>  
}
export default TransactionSearch