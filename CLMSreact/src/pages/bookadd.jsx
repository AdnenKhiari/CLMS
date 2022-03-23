import React from "react"
import * as ROUTES from "../lib/apiroutes"
import * as Fetcher from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"
import Joi from "joi"
import {validate_isbn} from "../lib/utils"

import ErrorDisplay from "../components/ErrorForm"

const allfields = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [
    {
      label: "Title ",
      name: "title",
      type: "text",
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
  schema :Joi.object({
    title : Joi.string().trim().disallow("").exist().label("Title"),
    publisher: Joi.string().trim().disallow("").exist().label("Publisher"),
    author: Joi.string().trim().disallow("").exist().label("Author"),
    ISBN: Joi.string().trim().custom(validate_isbn).disallow("").exist().label("ISBN"),
    publication_date: Joi.date().disallow("").allow(null).optional().default(null).label("Publication Date"),
    cover_url: Joi.string().uri().allow(null).trim().disallow("").optional().default(null).label("Cover Url")
})
}}

const BookAdd = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BOOKS,Fetcher.postData)
    return <>
      <h2>{"Add a Book"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}
      <ErrorDisplay err={err} />
    </>  
}
export default BookAdd




