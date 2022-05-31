import React from "react"

export const useFetch = (route,makeCall)=>{
  const [data,setData] = React.useState(null)
  const [err,setErr] = React.useState(null)
  const Submit = async (values)=>{
    //console.log("PROCESSED DAAATA ",values)
    try{
      const result = await makeCall(route,values)
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
      error : err,
      loading : !data && !err
  }
}
export const postData = async (route,data)=>{
  try{
    const response = await fetch(route,{
        method : "POST",
        body: data ? JSON.stringify(data) : null,
        credentials: 'include',
        headers : {
            "Content-Type" : "application/json"
        }
      })
     
        const res = await response.json()  
        if(response.ok){
          return Promise.resolve(res)
        }else{
          return Promise.reject(res)
        }
      }catch(err){
        throw err
      }

}
export const patchData = async (route,data)=>{
  try{
  const response = await fetch(route,{
      method : "PATCH",
      body: JSON.stringify(data),
      headers : {
          "Content-Type" : "application/json"
      },
      credentials: 'include',
    })

  
      const res = await response.json()  
      if(response.ok){
        return Promise.resolve(res)
      }else{
        return Promise.reject(res)
      }
    }catch(err){
      throw err
    }
  }
export const deleteData = async (route,data)=>{
  try{
  const response= await fetch(route,{
      method : "DELETE",
      body: JSON.stringify(data),
      credentials: 'include',
      headers : {
          "Content-Type" : "application/json"
      }
    })

      const res = await response.json()  
      if(response.ok){
        return Promise.resolve(res)
      }else{
        return Promise.reject(res)
      }
    }catch(err){
      throw err
    }
  }
export const getData =  async (route,data = {})=>{
    //console.log("FINAL BEFIRE EVERYTHING",data)
    const params = Object.keys(data).length > 0 ? Object.keys(data).filter(dt => data[dt] != null).map((key)=> encodeURIComponent(key)+"="+ data[key].toString()).join("&") : ""
    const URI_ENCODED = Object.keys(data).length === 0 ? route : route+"?"+params
    console.log("ENCODED ",URI_ENCODED)
    try{
    const response = await fetch(URI_ENCODED,{
        method : "GET",
        credentials: 'include'
      })
    
        const res = await response.json()  
        if(response.ok){
          return Promise.resolve(res)
        }else{
          return Promise.reject(res)
        }
      }catch(err){
        throw err
      }
}
