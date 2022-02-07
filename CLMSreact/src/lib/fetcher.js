import React from "react"
export const postData = (route,data)=>{
    return fetch(route,{
        method : "POST",
        body: JSON.stringify(data),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(dt=>dt.json())
}
export const patchData = (route,data)=>{
  return fetch(route,{
      method : "PATCH",
      body: JSON.stringify(data),
      headers : {
          "Content-Type" : "application/json"
      }
  }).then(dt=>dt.json())
}
export const deleteData = (route,data)=>{
  return fetch(route,{
      method : "DELETE",
      body: JSON.stringify(data),
      headers : {
          "Content-Type" : "application/json"
      }
  }).then(dt=>dt.json())
}
export const getData = (route,data = {})=>{
    const params = Object.keys(data).map((key)=>encodeURIComponent(key)+"="+data[key].toString()).join("&")
    const URI_ENCODED = route+"?"+params
    console.log("ENCODED ",URI_ENCODED)
    return fetch(URI_ENCODED,{
        method : "GET"
    }).then(dt=>dt.json())
}

export const UsePost = (route)=>{
    const [data,setData] = React.useState(null)
    const [err,setErr] = React.useState(null)
    const Submit = async (values)=>{
      try{
        const result = await postData(route,values)
        console.log("RES",result)
        if(result.error){
          setData(null)
          return setErr(result.error)
        }
        if(result.length === 0){
          setData(null)
          return setErr("NOTHING RETURNED")
        }
        //No error so set error to null and return the data
        setErr(null)
        return setData(result)
      }catch(err){
        setData(null)
        return setErr(err)
      }
    }
    return {
        Submit,
        data,
        error : err
    }
}
export const UseGet = (route)=>{
    const [data,setData] = React.useState(null)
    const [err,setErr] = React.useState(null)
    const Submit = async (values)=>{
      try{
        const result = await getData(route,values)
        console.log("RES",result)
        if(result.error){
          setData(null)
          return setErr(result.error)
        }
        if(result.length === 0){
          setData(null)
          return setErr("NOTHING RETURNED")
        }
        //No error so set error to null and return the data
        setErr(null)
        return setData(result)
      }catch(err){
        setData(null)
        return setErr(err)
      }
    }
    return {
        Submit,
        data,
        error : err
    }
}


export const UsePatch = (route)=>{
  const [data,setData] = React.useState(null)
  const [err,setErr] = React.useState(null)
  const Submit = async (values)=>{
    try{
      const result = await patchData(route,values)
      console.log("RES",result)
      if(result.error){
        setData(null)
        return setErr(result.error)
      }
      if(result.length === 0){
        setData(null)
        return setErr("NOTHING RETURNED")
      }
      //No error so set error to null and return the data
      setErr(null)
      return setData(result)
    }catch(err){
      setData(null)
      return setErr(err)
    }
  }
  return {
      Submit,
      data,
      error : err
  }
}


export const UseDelete = (route)=>{
  const [data,setData] = React.useState(null)
  const [err,setErr] = React.useState(null)
  const Submit = async (values)=>{
    try{
      const result = await deleteData(route,values)
      console.log("RES",result)
      if(result.error){
        setData(null)
        return setErr(result.error)
      }
      if(result.length === 0){
        setData(null)
        return setErr("NOTHING RETURNED")
      }
      //No error so set error to null and return the data
      setErr(null)
      return setData(result)
    }catch(err){
      setData(null)
      return setErr(err)
    }
  }
  return {
      Submit,
      data,
      error : err
  }
}
