import React from "react"
import * as ROUTES from "../lib/apiroutes"
import * as Fetcher from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"
import Joi from "joi"
import {validate_isbn} from "../lib/utils"
import ErrorDisplay from "../components/ErrorForm"

const useIdField = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [{
    label: "ID",
    name: "ID",
    type: "number",
  }],
  schema : Joi.object({
    ID: Joi.number().positive("ID should be positive").required("Missing Arguments: ID")
})
}}
const allfields = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [
    {
      label: "Title ",
      name: "title",
      type: "text"
    },
    {
      label: "Publisher",
      name: "publisher",
      type: "text",

    },
    {
      label: "Author",
      name: "author",
      type: "text",
    },
    {
      label: "ISBN",
      name: "ISBN",
      type: "text",
    },
    {
      label: "Publication Date",
      name: "publication_date",
      type: "date",
      nullable : true
    }
  ],
  schema : Joi.object({
    title : Joi.string().trim().allow("").exist().label("Title"),
    publisher: Joi.string().trim().allow("").default("").exist().label("Publisher"),
    author: Joi.string().trim().allow("").default("").exist().label("Author"),
    ISBN: Joi.string().trim().allow("").default("").exist().label("ISBN"),
    publication_date: Joi.date().allow("").default(null).label("Publication Date")
})
}
}

const BookSearch = ()=>{
    const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BOOKS,Fetcher.getData)
    const {Submit : Submit2,data : data2 ,error : err2} = Fetcher.useFetch(ROUTES.BOOKS,Fetcher.getData)
    console.log("Response",data,err)
    return <>
      <h2>{"Search a Book"}</h2>
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
export default BookSearch