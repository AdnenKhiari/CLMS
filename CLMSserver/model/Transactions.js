const { StatusCodes } = require( "http-status-codes" )
const ApiError = require( "../errors/ApiError" )
const {mysqlClient} = require("../lib/db")
const format_result = (data)=> data.map(value=>{
    //format the result before sending it back
    return value
})

const getATransaction = async (filter = {}) => new Promise((resolve,reject)=>{
    var STATEMENT = null
    var params = null
    if(filter.ID){
        STATEMENT = "SELECT * FROM Transactions WHERE ID = ?"
        params = [filter.ID]
    }else{
        const getUserId = (filter.user_ID !== "" ? " AND user_ID = ? " : " AND user_ID LIKE ? ")
        const getBorrowId = (filter.borrow_ID !== "" ? " AND borrow_ID = ? " : " AND borrow_ID LIKE ? ")
        const getcomment =  filter.comment !== null ?  " AND comment LIKE ? " : " AND  comment IS ? "
        
        STATEMENT = "SELECT * FROM Transactions WHERE name LIKE ? " + getcomment + getUserId + getBorrowId
        params = [filter.name,filter.comment,filter.user_ID,filter.borrow_ID]
        params = params.map((val)=>typeof(val) === "string" ? (val ==="" ? '%' : '%'+val+'%' ) : val)
    }
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0){
            return reject(new ApiError("Resource Not Found","Transaction with that ID Or Specs Not Found",StatusCodes.BAD_REQUEST))
        }
        return resolve(format_result(result))
    })
})

const deleteATransaction  = async (data) => new Promise((resolve,reject)=>{
    const STATEMENT_GET = "SELECT * FROM Transactions Where ID = ?"
    const params_get = [data.ID]
    mysqlClient.query(STATEMENT_GET,params_get,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0){
            return reject(new ApiError("Resource Could not be updated","No Transactions exists with that ID",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        }
        return resolve(result)
    })
}).then(async (old_data)=> new Promise((resolve,reject)=>{
    const STATEMENT = "DELETE FROM Transactions WHERE ID = ?"
    const params = [data.ID]
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.affectedRows === 0)
            return reject(new ApiError("Resource Could not be updated","No Transactions was deleted",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        
        return resolve(format_result(old_data))
    })
}))

const addATransaction = async (data) => new Promise((resolve,reject)=>{
    const STATEMENT = "INSERT INTO Transactions (name,comment,user_ID,borrow_ID) VALUES (?,?,?,?)"
    params = [data.name,data.comment,data.user_ID,data.borrow_ID]
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.affectedRows === 0)
            return reject(new ApiError("Resource Could not be updated","No Transactions was deleted",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        return resolve(result.insertId)
    })
}).then(async id=> new Promise((resolve,reject)=>{
    const STATEMENT = "SELECT * FROM Transactions WHERE ID = ?"
    params = [id]
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.affectedRows === 0)
            return reject(new ApiError("Resource was updated but could not be retrieved","No Transactions was added but could not be retrieved",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        return resolve(format_result(result))
    }) 
}))

const patchATransaction =  async (data) => new Promise((resolve,reject)=>{
    const STATEMENT = "SELECT * FROM Transactions WHERE ID = ?"
    params = [data.ID]
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0)
            return reject(new ApiError("Resource Not Found","Transaction with that ID Or Specs Not Found",StatusCodes.UNPROCESSABLE_ENTITY))
        Object.keys(data).forEach((key)=>{
            if(data[key] === "")
                delete data[key]
        })
        return resolve(result[0])
    }) 
}).then(async old_result => new Promise((resolve,reject)=>{
    const new_data = {...old_result,...data}
    const STATEMENT = "UPDATE Transactions SET name = ?, comment = ? , user_ID = ? , borrow_ID = ? WHERE ID = ?"
    const params = [new_data.name,new_data.comment,new_data.user_ID,new_data.borrow_ID,new_data.ID]
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0)
            return reject(new ApiError("Resource Could not be Updated","Transactions Could not be modified",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))   
        return resolve([old_result,new_data])
    }) 
}))

const ValidateTransactionInsertConstraints = async (data)=>new Promise((resolve,reject)=>{
    if(data.user_ID === "")
        return resolve(true)
    const STATEMENT = "SELECT * FROM Users WHERE ID = ?"
    params = [data.user_ID]
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0)
            return reject(new ApiError("Resource Not Found","No User was found with that ID",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        return resolve(true)
    }) 
}).then(async ()=> new Promise((resolve,reject)=>{
    if(data.borrow_ID === "")
        return resolve(true)
    const STATEMENT = "SELECT * FROM Borrows WHERE ID = ?"
    params = [data.borrow_ID]
    mysqlClient.query(STATEMENT,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0)
            return reject(new ApiError("Resource Not Found","No Borrow was found with that ID",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        return resolve(true)
    }) 
}))

module.exports = {getATransaction,addATransaction,patchATransaction,deleteATransaction,ValidateTransactionInsertConstraints}