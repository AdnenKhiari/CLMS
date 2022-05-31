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
  schema: Joi.object({
    ID: Joi.number().positive().required().label("ID"),
    name : Joi.string().allow("").trim().required().label("Name"),
    comment: Joi.string().allow("").trim().optional().allow(null).default(null).label("Comment"),
    borrow_ID : Joi.number().allow("").positive().required().label("Borrow ID"),
    user_ID : Joi.number().allow("").positive().required().label("User ID")
})
}
}
const TransactionMod = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.TRANSACTIONS,Fetcher.patchData)
  if(!useCheckRole(PERMISSIONS.TRANSACTION_MOD_PERM))
  return <Navigate to="/home" />
    return <>
      <h2>{"Modify a Transaction"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}
      <ErrorDisplay err={err} />
    </>  
}
export default TransactionMod
