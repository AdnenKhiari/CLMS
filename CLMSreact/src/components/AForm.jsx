import { useForm } from "react-hook-form";

import  Joi from "joi"
import {joiResolver } from "@hookform/resolvers/joi"
import { useEffect, useState } from "react";
//exazmple :
const example = {
    Submit:(data)=>{
      console.log(data)
    },
    fields:[
      {
        label: "First Name",
        name: "first_name",
        type: "text",
      },
      {
        label: "Last Name",
        name: "last_name",
        type: "text"
      },
      {
        label: "Age",
        name: "age",
        type: "number"
      }
    ],
    schema : Joi.object({
      first_name : Joi.string().required()
    })
  }
/***
 * Create a form requires allfields object with Submit function and fields array with objects having:
 * label : the label value ;
 * name : the input name;
 * type : input type ( text , email etc);
 * options : data validation;
 ***/
const AForm = ({allfields})=>{
    const [nullValues,setNullValues] = useState([])
    const updateNullValues = (i)=>{
      nullValues[i] = !nullValues[i]
      setNullValues(nullValues)
    }
    useEffect(()=>{
      setNullValues(Object.keys(allfields).map(key => false))
    },[])

    const { register,unregister, formState: { errors }, handleSubmit ,reset } = useForm({
      resolver : joiResolver(allfields.schema)
    });

    const SubmitFunction = handleSubmit((data)=>{
      console.log("Trying to handle submit with data : ",data,"and fields : ",allfields.fields)
      //make sure to make null = "" unless nullable is speciifed
         allfields.fields.forEach((item,index)=>{
         if(item.nullable && nullValues[index])
           data[item.name] = null
         else if(data[item.name] == null){
           data[item.name] = ""
         }
      })
      //console.log("NEW DATA AFTER PURIFICATION ",data)
      return allfields.Submit(data)
     })
     console.log(errors)
    return <div>
       <form onSubmit={SubmitFunction}
        onReset={()=>reset({
           keepValues: false
        })}>
          
          <div className="formFields">
          {allfields.fields.map((data,id)=> <div key={id} className="input_fields">
          {data.label && <label htmlFor={data.name}>{data.label}</label>}
          <input disabled={nullValues[id]} className={errors[data.name] ? "invalid-input" : ""} type={data.type || "text" } {...register(data.name)} />
          {data.nullable && <img className="nullable" onClick={()=>{updateNullValues(id);unregister(data.name)}} src="empty.png" alt="" />}
          {errors[data.name] && <p className="danger">{data.label + " : " + errors[data.name].message}</p>}
          </div>)}
          </div>
          <div className="buttons">
            <button type="submit" >Submit</button>
            <button type="reset" >Reset</button>
          </div>
    </form>

    </div>
}

export default AForm