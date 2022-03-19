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
  schema : yup.object({
    title : yup.string().required("Title is required"),
    publisher : yup.string().required("Publisher is required"),
    author : yup.string().required("Author is required"),
    ISBN : yup.string().required("ISBN is required"),
    publication_date : yup.date("Publication date is a Date Type").nullable().transform((cur,origin)=> origin === "" ? null : cur),
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
        {err != null && <div className="danger-container">
          <p className="danger">{err.message}</p>
           { err.details && err.details.length > 0 && err.details.map((dt,index)=><p key={index} className="danger">{dt}</p>)}
        </div>
        }
    </>  
}
export default BookAdd




