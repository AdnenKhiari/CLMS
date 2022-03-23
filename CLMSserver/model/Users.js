const {StatusCodes} = require("http-status-codes")
const {mysqlClient} = require("../lib/db")
const ApiError = require("../errors/ApiError")

const format_result = (data)=>{
    return data.map((st)=>{
        if(st.birth_date)
            st.birth_date = new Date(st.birth_date).toLocaleDateString()
        return st
    } )
}

//query all the users
const getAllUsers = async (filter = {}) => new Promise((resolve,reject)=>{
    var FINAL_STATEMENT = null
    var params = null
    //determine how you search for the users
    if(!filter.ID){
        const date_select = (filter.birth_date && filter.birth_date != "" ? ' AND DATE(birth_date) = DATE(?)  ' : (filter.birth_date != null ? "AND birth_date LIKE ?" : " AND birth_date  IS ? "  ))
        const address_select = (filter.address != null  ? " AND LOWER(adresse) LIKE LOWER(?)  " : ' AND adresse IS ? ')
       
        FINAL_STATEMENT = "SELECT ID,first_name,last_name,gender,email,birth_date,salary,grade,adresse FROM Users WHERE LOWER(first_name) LIKE LOWER(?) AND LOWER(last_name) LIKE LOWER(?) AND gender LIKE ? AND LOWER(email) LIKE LOWER(?) AND LOWER(salary) LIKE LOWER(?) AND LOWER(grade) LIKE LOWER(?) " + date_select + address_select
        params = [filter.first_name,filter.last_name,filter.gender,filter.email,filter.salary,filter.grade,filter.birth_date,filter.address]
        params = params.map((val)=> (val !== null && typeof(val) === "string" ) ?  ( val !== "" ? '%'+val+'%' : '%' )  : val)
    }else{
        FINAL_STATEMENT = "SELECT ID,first_name,last_name,gender,email,birth_date,salary,grade,adresse FROM Users WHERE ID=?"
        params = [filter.ID]
    }
    console.log(params,FINAL_STATEMENT)
    //query the db
    mysqlClient.query(FINAL_STATEMENT,params,(error,result,info)=>{
        if(error)
            return reject(error)
        if(!result || (result.length === 0 && filter.hasOwnProperty("ID")))
            return reject(new ApiError("Resource Not Found","User with that ID Or Specs Not Found",StatusCodes.BAD_REQUEST))
        
        //return the result with formatting the dates
        return resolve(format_result(result))
    })
})

const addAUser = async (data) => new Promise((resolve,reject)=>{
    const STATEMENT = "INSERT INTO Users (first_name,last_name,gender,email,password,birth_date,salary,grade,adresse) VALUES (?,?,?,?,?,?,?,?,?)"

    params = [data.first_name,data.last_name,data.gender,data.email,data.password,data.birth_date,data.salary,data.grade,data.address]
    mysqlClient.query(STATEMENT,params,(error,result,info)=>{
        if(error)
            return reject(error)
        if(!result || result.affectedRows === 0)
            return reject(new ApiError("Resource Could not be updated","No User was added",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        
            //return the added user
         mysqlClient.query("SELECT ID,first_name,last_name,gender,email,birth_date,salary,grade,adresse FROM Users WHERE ID=?",[result.insertId],(err2,result2)=>{
                if(err2)
                    return reject(err2)
                if(!result2 || result2.length === 0)
                    return reject(new ApiError("Resource Could not be updated","User was added but could not be retrieved",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
                
                return resolve(format_result(result2))
        })
    })
})

const deleteAUser = async (data) => new Promise((resolve,reject)=>{
    const STATEMENT = "DELETE FROM Users WHERE ID = ?"
    const params = [data.ID]
    mysqlClient.query("SELECT ID,first_name,last_name,gender,email,birth_date,salary,grade,adresse FROM Users WHERE ID= ? ",[data.ID],(err,old_data,info_old)=>{
        if(err)
            return reject(err)
        if(!old_data || old_data.length === 0)
            return reject(new ApiError("Resource Could not be updated","No User was found with that ID",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
  
        mysqlClient.query(STATEMENT,params,(error,result,info)=>{
            if(error)
                return reject(error)
            if(!result || result.affectedRows === 0)
                return reject(new ApiError("Resource Could not be updated","No User was deleted",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
            return resolve(format_result(old_data))
        })
    })
})

const patchAUser =  async (data) => new Promise((resolve,reject)=>{
    const STATEMENT = "UPDATE Users SET first_name = ? ,last_name = ?,gender= ?,email = ?,birth_date = ?, salary = ?,grade = ? ,adresse = ?,password = ? WHERE ID = ?"
    
    mysqlClient.query("SELECT ID,first_name,last_name,gender,email,birth_date,salary,grade,adresse,password FROM Users WHERE ID = ? ",[data.ID],(err,old_data,info_old)=>{
        if(err)
            return reject(err)
        if(!old_data || old_data.length === 0)
            return reject(new ApiError("Resource Could not be updated","No User was found with that ID",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))   
        
        //Process Data for patching 
        Object.keys(data).forEach((key)=>{
            if(data[key] === "")
                delete data[key]
        })
        //to fix the adresse of db and address of the obj
        old_data = old_data[0]
        old_data.address = old_data.adresse
        delete old_data.adresse
        const new_data = {...old_data,...data}
        params = [new_data.first_name,new_data.last_name,new_data.gender,new_data.email,new_data.birth_date, new_data.salary,new_data.grade,new_data.address,new_data.password,new_data.ID]

        //Patch Data
        mysqlClient.query(STATEMENT,params,(error,result,info)=>{
            if(error)
                return reject(error)
            if(!result || result.affectedRows === 0)
                return reject(new ApiError("Resource Could not be updated","Valid Id but could not update the User",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))   
            if(new_data.password != old_data.password){
                new_data.password="Changed Password"
                old_data.password="Changed Password"
            }else{
                new_data.password="Password Not Updated"
                old_data.password="Password Not Updated"
            }
            return resolve(format_result[old_data,new_data] )  
        })
    })
})

const ValidateInsertUser = async (data) => new Promise((resolve,reject)=>{
    const STATEMENT = "SELECT email FROM Users WHERE email = ? LIMIT 1"
    mysqlClient.query(STATEMENT,[data.email],(error,result,info)=>{
        if(error)
            return reject(error)
        if(!result || result.length != 0)
            return reject(new ApiError("Resource Could not be added","Email already used",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to have a non used email , if there is  problem or the email have been used without your consent , contact the administrator"))   
        return resolve(null)
    })
})

module.exports = {
    getAllUsers,
    addAUser,
    deleteAUser,
    patchAUser,
    ValidateInsertUser
}