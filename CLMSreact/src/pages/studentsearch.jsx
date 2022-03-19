
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
      label: "First Name ",
      name: "first_name",
      type: "text",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
    },
    {
      label: "Gender",
      name: "gender",
      type: "text",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      nullable : true

    },
    {
      label: "Birth Date",
      name: "birth_date",
      type: "date"
    },
    {
      label: "Email",
      name: "email",
      type: "email"
    },
    {
      label: "Password",
      name: "password",
      type: "password"
    }
  ],
  schema : yup.object({
    first_name : yup.string().required("First Name is required").label("First Name"),
    last_name : yup.string().required("Last Name is required").label("Last Name"),
    gender : yup.string().required("Gender is required").oneOf(["M","F"]).label("Gender"),
    address : yup.string().nullable().transform((cur,origin)=> origin === "" ? null : cur).label("Address"),
    email : yup.string().required("Email is required").email().label("Email"),
    password : yup.string().required("Password is required").label("Password"),
    birth_date : yup.date("Birth date is a Date Type").label("Birth Date"),
  })
}
}
const StudentSearch = ()=>{
  const {Submit,data ,error : err} = Fetcher.useFetch(ROUTES.STUDENTS,Fetcher.postData)
    return <>
      <h2>{"Add a Student"}</h2>
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
export default StudentSearch