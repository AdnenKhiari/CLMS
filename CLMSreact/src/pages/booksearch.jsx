import React from "react"
import * as ROUTES from "../lib/apiroutes"
import * as Fetcher from "../lib/fetcher"
import AList from "../components/AList"
import AForm from "../components/AForm"
import * as yup from "yup"

const useIdField = (Submit = (data)=>console.log(data))=>{return {
  Submit : Submit,
  fields : [{
    label: "ID",
    name: "ID",
    type: "number",
  }],
  schema : yup.object({
    ID : yup.number().positive().transform((cur,origin)=>origin === "" ? null : cur ).nullable().required(),
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
  schema : yup.object({
    title : yup.string(),
    publisher : yup.string(),
    author : yup.string(),
    ISBN : yup.string(),
    publication_date : yup.date("This is a date").transform(v => (v instanceof Date && !isNaN(v) ? v: null)).nullable()
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
        {err != null && <div className="danger-container">
          <p className="danger">{err.message}</p>
           { err.details && err.details.length > 0 && err.details.map((dt,index)=><p key={index} className="danger">{dt}</p>)}
        </div>
        }
        
        {err2 != null && <div className="danger-container">
          <p className="danger">{err2.message}</p>
           { err2.details && err2.details.length > 0 && err2.details.map((dt,index)=><p key={index} className="danger">{dt}</p>)}
        </div>
        }
        
        </>  
}
export default BookSearch