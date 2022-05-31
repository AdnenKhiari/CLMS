const { StatusCodes } = require( "http-status-codes" )
const ApiError = require( "../errors/ApiError" )
const {mysqlClient} = require("../lib/db")
const format_result = (data)=> data.map(value=>{
    //format the result before sending it back
    if(value.date_borrowed)
        value.date_borrowed = new Date(value.date_borrowed).toLocaleDateString()
    if(value.date_return)
        value.date_return = new Date(value.date_return).toLocaleDateString()
    return value
})
const getAllBorrows = async (filter = {})=> new Promise((resolve,reject)=>{
    //Transform Dates to dates Should be handled in the validator
    var STATEMENT = null
    var params = null
    if(filter.hasOwnProperty("ID")){
        STATEMENT = "SELECT bo.ID,book_ID,b.title,student_ID,s.first_name,s.last_name,date_borrowed,date_return FROM Borrows bo , Books b,Students s WHERE s.ID = student_ID AND b.ID = book_ID AND bo.ID = ?  " 
        params = [filter.ID]
    }else{
        const dateBorrowed = (filter.date_borrowed !== "" ? " AND DATE(date_borrowed) = DATE(?) " : " AND date_borrowed LIKE ? "  )
        const dateReturn = (filter.date_return !== null ? (filter.date_return !== "" ? " AND DATE(date_return) = DATE(?) " : " AND date_return LIKE ? "  ) :  " AND date_return IS ?")
        const getBook = (filter.book_ID !== "" ? " AND book_ID = ? " : " AND book_ID LIKE ? ")
        const getStudent = (filter.student_ID !== "" ? " AND student_ID = ? " : " AND student_ID LIKE ? ")
        STATEMENT = "SELECT bo.ID,book_ID,b.title,student_ID,s.first_name,s.last_name,date_borrowed,date_return FROM Borrows bo , Books b,Students s WHERE s.ID = student_ID AND b.ID = book_ID " + dateBorrowed + dateReturn + getStudent + getBook 
        params = [filter.date_borrowed,filter.date_return,filter.student_ID,filter.book_ID]
        params = params.map((val)=>typeof(val) === "string" ? (val ==="" ? '%' : '%'+val+'%' ) : val)
    }
    mysqlClient.query(STATEMENT,params,(error,result,info)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0){
            return reject(new ApiError("Resource Not Found","Borrow with that ID Or Specs Not Found",StatusCodes.UNPROCESSABLE_ENTITY))
        }
        return resolve(format_result(result))
    })
})

const patchABorrow =  async (data)=> new Promise((resolve,reject)=>{
    const STATEMENT_OLD = "SELECT * FROM Borrows WHERE ID = ?"
    var params = [data.ID]
    mysqlClient.query(STATEMENT_OLD,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0)
            return reject(new ApiError("Resource Could not be updated","No Borrow exists with that ID",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        return resolve(result[0])
    })
    }).then(async (old_data)=> new Promise((resolve,reject)=>{
        Object.keys(data).forEach((key)=>{
            if(data[key] === "")
                delete data[key]
        })
        data = {...old_data,...data}

        const STATEMENT = "UPDATE Borrows SET date_borrowed = ? , date_return = ?,student_ID = ?, book_ID = ? WHERE ID = ?"
        params = [data.date_borrowed,data.date_return,data.student_ID,data.book_ID,data.ID]
        mysqlClient.query(STATEMENT,params,(error,result)=>{
            if(error)
                return reject(error)
            if(!result || result.length === 0)
                return reject(new ApiError("Resource Could not be updated","Could not update the borrow with the corresponding data",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
            return resolve([old_data,data])
        })
}))

const addABorrow = async (data)=> new Promise((resolve,reject)=>{
    const STATEMENT = "INSERT INTO Borrows (date_borrowed,date_return,student_ID,book_ID) VALUES (?,?,?,?)"
    params = [data.date_borrowed,data.date_return,data.student_ID,data.book_ID]
    mysqlClient.query(STATEMENT,params,(error,result,info)=>{
        if(error)
            return reject(error)
        if(!result || result.affectedRows === 0)
            return reject(new ApiError("Resource Could not be updated","No Borrow was added","Make sure to have a valid inputs , if the problem persists , contact the administrator",StatusCodes.INTERNAL_SERVER_ERROR))
        
        mysqlClient.query('SELECT * FROM Borrows WHERE ID=?',[result.insertId],(err,res)=>{
            if(err)
                return reject(err)
            if(!res || res.length === 0)
                return reject(new ApiError("Resource Updated But Could not retrieve Data","Borrow Added but Could not retirieve the Borrow",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))   
            return resolve(format_result(res))
        })
    })
})

const deleteABorrow = async (data)=> new Promise((resolve,reject)=>{
    const STATEMENT_OLD = "SELECT * FROM Borrows WHERE ID = ?"
    const params = [data.ID]
    mysqlClient.query(STATEMENT_OLD,params,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0)
            return reject(new ApiError("Resource Could not be updated","No Borrow exists with that ID",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
        return resolve(result)
    })}).then((old_data)=>new Promise((resolve,reject)=>{
        const STATEMENT = "DELETE FROM Borrows WHERE ID = ?"
        const params = [data.ID]
        mysqlClient.query(STATEMENT,params,(error,result)=>{
            if(error)
                return reject(error)
            if(!result || result.changedRows === 0)
                return reject(new ApiError("Resource Could not be updated","No Borrow was deleted",StatusCodes.INTERNAL_SERVER_ERROR,"Make sure to have a valid inputs , if the problem persists , contact the administrator"))
            return resolve(format_result(old_data))
        })
}))

const ValidateInsertBorrow = async (data) => new Promise((resolve,reject)=>{
    if(data.book_ID === "")
        return resolve(true)
    const STATEMENT1 = "SELECT ID FROM Books WHERE ID = ? "
    const params1 = [data.book_ID] 
    mysqlClient.query(STATEMENT1,params1,(error,result)=>{
        if(error)
            return reject(error)
        if(!result || result.length === 0)
            return reject(new ApiError("Resource Could not be added","Invalid Book ID used , the book do not exist",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to use a valid Book ID, if there is problem ,contact the administrator"))   
        return resolve(true)
    })
    })
    .then(async ()=>new Promise((resolve,reject)=>{
        if(data.student_ID === "")
            return resolve(true)
        const STATEMENT2 = "SELECT ID FROM Students WHERE ID = ? "
        const params2 = [data.student_ID] 
        mysqlClient.query(STATEMENT2,params2,(error,result)=>{
            if(error)
                return reject(error)
            if(!result || result.length === 0)
                return reject(new ApiError("Resource Could not be added","Invalid Student ID used , the student do not exist",StatusCodes.UNPROCESSABLE_ENTITY,"Make sure to use a valid Student ID, if there is problem ,contact the administrator"))   
            return resolve(true)
        })
    }))



module.exports = {getAllBorrows,addABorrow ,patchABorrow , deleteABorrow ,ValidateInsertBorrow}