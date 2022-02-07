import React from "react"
import * as ROUTES from "../lib/apiroutes"
import {UsePost} from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"

const allfields = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [
    {
      label: "Title ",
      name: "title",
      type: "text",
      options : {
        required:  true
      }
    },
    {
      label: "Publisher",
      name: "publisher",
      type: "text",
      options : {
        required: true
      }
    },
    {
      label: "Author",
      name: "author",
      type: "text",
      options : {
        required: true
      }
    },
    {
      label: "ISBN",
      name: "ISBN",
      type: "text",
      options : {
        required: true
      }
    },
    {
      label: "Publication Date",
      name: "publication_date",
      type: "date",
      options : {
        required: true
      }
    }
  ]
}
}
const BookAdd = ()=>{
  const {Submit,data ,error : err} = UsePost(ROUTES.BOOKS)
    return <>
      <h2>{"Add a Book"}</h2>
      <AForm allfields={allfields(Submit)} />
      {data && err == null && <AList data={{
          name:"Result :",
          body : data
        }}/>}
        <p>{err != null && "Error !"}</p> 
    </>  
}
export default BookAdd




