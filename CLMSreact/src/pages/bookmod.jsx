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
      label: "ID",
      name: "ID",
      type: "number",
    },
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
    },
    {
      label: "Cover Url",
      name: "cover_url",
      type: "url",
      nullable : true
    }
  ],

  schema : Joi.object({
    ID : Joi.number().positive().required().label("ID"),
    title : Joi.string().trim().allow("").label("Title"),
    publisher: Joi.string().trim().allow("").label("Publisher"),
    author: Joi.string().trim().allow("").label("Author"),
    ISBN: Joi.string().trim().custom(validate_isbn).allow("").label("ISBN"),
    publication_date: Joi.date().allow("").allow(null).label("Publication Date").default(null),
    cover_url: Joi.string().uri().trim().allow("").allow(null).label("Cover Url").default(null)
})
}
}

const BookMod = ()=>{
    const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.BOOKS,Fetcher.patchData)
    console.log(data,err)
    return <>
      <h2>{"Modify a Book"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Search Results",
          body : data
        }}/>}
      <ErrorDisplay err={err} />

    </>  
}
export default BookMod