
import React from "react"
import * as ROUTES from "../lib/apiroutes"
import * as Fetcher from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"
import * as yup from "yup"

const allfields = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [
    {
      label: "ID",
      name: "ID",
      type: "number",
    }
  ],
  schema : yup.object({
    ID: yup.number().positive("Should Positive number").required("Field required")
  })
}
}
const BookDel = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BOOKS,Fetcher.deleteData)
  console.log(data,err)
  return <>
    <h2>{"Delete a Book"}</h2>
    <AForm allfields={allfields(Submit)} />
    {data && err == null && <AList data={{
        name:"Search Results",
        body : data
      }}/>}
          {err != null && <div className="danger-container">
          <p className="danger">{err.message}</p>
           { err.details && err.details.length > 0 && err.details.map((dt,index)=><p key={index} className="danger">{dt}</p>)}
        </div>}
  </>  
}
export default BookDel

