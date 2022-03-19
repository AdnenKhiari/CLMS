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

  schema : yup.object({
    ID: yup.number().positive("Should Positive number").required("Field required").nullable().transform((cur,origin)=> origin === ""? null : cur),
    title : yup.string().trim(),
    publisher : yup.string().trim(),
    author : yup.string().trim(),
    ISBN : yup.string().trim(),
    publication_date :yup.date("This is a date").transform(v => (v instanceof Date && !isNaN(v) ? v : null)).nullable(),
    cover_url : yup.string().matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,{excludeEmptyString : true,message : "Enter a valid Url"})
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
        {err != null && <div className="danger-container">
          <p className="danger">{err.message}</p>
           { err.details && err.details.length > 0 && err.details.map((dt,index)=><p key={index} className="danger">{dt}</p>)}
        </div>
        }
    </>  
}
export default BookMod