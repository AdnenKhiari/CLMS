import React from "react"
import * as ROUTES from "../lib/apiroutes"
import {UseGet} from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"

const allfields = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [
    {
      label: "ID",
      name: "ID",
      type: "number",
      options : {
        required:  false
      }
    },
    {
      label: "Title ",
      name: "title",
      type: "text",
      options : {
        required:  false
      }
    },
    {
      label: "Publisher",
      name: "publisher",
      type: "text",
      options : {
        required: false
      }
    },
    {
      label: "Author",
      name: "author",
      type: "text",
      options : {
        required: false
      }
    },
    {
      label: "ISBN",
      name: "ISBN",
      type: "text",
      options : {
        required: false
      }
    },
    {
      label: "Publication Date",
      name: "publication_date",
      type: "date",
      options : {
        required: false
      }
    }
  ]
}
}

const BookSearch = ()=>{
    const {Submit,data ,error : err} = UseGet(ROUTES.BOOKS)
    console.log(data,err)
    return <>
      <h2>{"Search a Book"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Search Results",
          body : data
        }}/>}
    </>  
}
export default BookSearch