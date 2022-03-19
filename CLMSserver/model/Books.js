const { StatusCodes } = require( "http-status-codes" )
const ApiError = require( "../errors/ApiError" )
const {mysqlClient} = require("../lib/db")
//TODO PAGINATION
const getAllBooks = async (filter = {})=> new Promise((resolve,reject)=>{
    if(filter.publication_date)
        filter.publication_date = new Date(filter.publication_date)
    const callBack = (err,result,info)=>{
        if(err)
            return reject(err)
        if(!result || result.length === 0){
            return reject(new ApiError("Resource Not Found","Book with that ID Or Specs Not Found",StatusCodes.BAD_REQUEST))
        }
        return resolve(result.map(value=>{
            //format the result before sending it back
            if(value.publication_date)
                value.publication_date = new Date(value.publication_date).toLocaleDateString()
            return value
        }))
    }
    if(filter.ID){
        const STATEMENT = 'SELECT * FROM Books WHERE ID = ?'
        const params = [filter.ID]
        mysqlClient.query(STATEMENT,params,callBack)
    }else{
        var STATEMENT = 'SELECT * FROM Books WHERE LOWER(title) LIKE ? AND LOWER(publisher) LIKE ? AND  LOWER(author) LIKE  ? AND LOWER(ISBN) LIKE ? '+ (filter.publication_date && filter.publication_date != "" ?' AND DATE(publication_date)=DATE(?)' : filter.publication_date==="" ? "":'AND DATE(publication_date) IS NULL');
        var params = [filter.title,filter.publisher,filter.author,filter.ISBN,filter.publication_date].map((value)=>typeof(value)=="string" ? '%'+value.toLowerCase()+'%' : value)
        mysqlClient.query(STATEMENT,params,callBack)
    }
})

const ValidateBookInsertConstraints = async (values) => new Promise((resolve,reject)=>{
    if(values.ISBN){
        const STATEMENT = 'SELECT COUNT(ISBN) as occurences FROM Books WHERE ISBN=?'
        mysqlClient.query(STATEMENT,values.ISBN,(err,result,info)=>{
            if(err)
                return reject(err)
            if(result.length === 0){
                return reject(new ApiError("Resource Not Found","ISBN Not Found",StatusCodes.BAD_REQUEST))
            }
            return resolve(result[0].occurences === 0)
        })
    }else{
        return reject(new ApiError("Resource Not Found","ISBN Not Found",StatusCodes.BAD_REQUEST))
    }
})

const addABook = async (values)=> new Promise((resolve,reject)=>{
    //cast date if exists
    if(values.publication_date){
        values.publication_date = new Date(values.publication_date)
    }
    console.log("Book to add :",values)
    const STATEMENT = `INSERT INTO Books (title, publisher, author, ISBN, publication_date, cover_url) VALUES (?,?,?,?,?,?)`
    mysqlClient.query(STATEMENT,[values.title,values.publisher,values.author,values.ISBN,values.publication_date === "" ? null : values.publication_date,values.cover_url],(err,result,info)=>{
        if(err)
            return reject(err)
        if(!result || result.affectedRows == 0)
            return reject(new ApiError("Resource Could not be updated","No Book was added","Make sure to have a valid inputs , if the problem persists , contact the administrator",StatusCodes.INTERNAL_SERVER_ERROR))
                mysqlClient.query('SELECT * FROM Books WHERE ID=?',[result.insertId],(err,result)=>{
            if(err)
                return reject(err)
            return resolve(result)
        })
    })
})

const deleteABook = async (filters) => new Promise((resolve,reject)=>{
    if(!filters.ID)
        return reject(new ApiError("Resource Not Found","ID Not Found",StatusCodes.BAD_REQUEST))
    const STATEMENT_SELECT = 'SELECT * FROM Books WHERE ID=?'
    mysqlClient.query(STATEMENT_SELECT,[filters.ID],(err,result,info)=>{
        if(err)
           return reject(err)
        if(result.length === 0 || !result)
            return reject(new ApiError("Resource Not Found","Book with that ID Not Found",StatusCodes.BAD_REQUEST))
        const STATEMENT = 'DELETE FROM Books WHERE ID=?'
        mysqlClient.query(STATEMENT,[filters.ID],(err2,result2,info2)=>{
            if(err2)
                return reject(err2)
            if(!result2.affectedRows === 0)
                return reject(new ApiError("Resource Not Found","Book with that ID Not Found",StatusCodes.BAD_REQUEST))
            return resolve(result)
        })
    })

})

const patchABook = async (values) => new Promise((resolve,reject)=>{
        if(!values.ID)
            return reject(new Error("No Id Specified To Update Field"))
        const SELECT_STATEMENT = 'SELECT * FROM Books WHERE ID = ?'
        mysqlClient.query(SELECT_STATEMENT,[values.ID],(err,result,info)=>{
            console.log("result",result)
            if(err)
                return reject(err)
            if(result && result.length === 0)
                return reject(new ApiError("Resource Not Found","Book Not Found using that ID ",StatusCodes.BAD_REQUEST))
            return resolve(result[0])
        })
    }).then((entries)=>new Promise((resolve,reject)=>{

        Object.keys(values).forEach((key)=>{
            //empty strings should be removed and considered to not be updated
            if(values[key] === "" )
                delete values[key]
        })
        if(values.publication_date)
            values.publication_date = new Date(values.publication_date)
        console.log("AHAAAA",values.publication_date)
        values = {...entries,...values}
        console.log("values",values)
        const UPDATE_STATEMENT = 'UPDATE Books SET title = ? , publisher = ? , author = ? , ISBN = ? , publication_date = ? , cover_url = ?  WHERE ID = ?'
        mysqlClient.query(UPDATE_STATEMENT,[values.title,values.publisher,values.author,values.ISBN,values.publication_date,values.cover_url,values.ID],(error,result,info)=>{
            if(error)
                return reject(error)
            if(result.affectedRows === 0)
                return reject(new ApiError("Resource could not be update","Book Not Found",StatusCodes.BAD_REQUEST))
            return resolve([entries,values])
        })
}))

module.exports = {
    getAllBooks,
    addABook,
    deleteABook,
    patchABook,
    ValidateBookInsertConstraints
}