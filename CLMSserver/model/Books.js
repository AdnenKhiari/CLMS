const {mysqlClient} = require("../lib/db")
const getAllBooks = (filter = {})=> new Promise((resolve,reject)=>{
    const STATEMENT = `SELECT * FROM Books WHERE LOWER(title) LIKE ? AND LOWER(publisher) LIKE ? AND  LOWER(author) LIKE  ? AND LOWER(ISBN) LIKE ? AND publication_date LIKE ?`
    mysqlClient.query(STATEMENT,[filter.title,filter.publisher,filter.author,filter.ISBN,filter.publication_date].map((value)=>'%'+value.toLowerCase()+'%'),(err,result,info)=>{
        if(err)
            reject(err)
        resolve(result.map(value=>{
            value.publication_date = new Date(value.publication_date).toLocaleDateString()
            return value
        }))
    })
})
const addABook = (values)=> new Promise((resolve,reject)=>{
    const STATEMENT = `INSERT INTO Books (title, publisher, author, ISBN, publication_date, cover_url) VALUES (?,?,?,?,?,?)`
    mysqlClient.query(STATEMENT,[values.title,values.publisher,values.author,values.ISBN,values.publication_date,values.cover_url],(err,result,info)=>{
        if(err)
            return reject(err)
        if(result.affectedRows == 0)
             return reject(new Error("No New Book Added"))
        mysqlClient.query('SELECT * FROM Books WHERE ID=?',[result.insertId],(err,result)=>{
            if(err)
                return reject(err)
            return resolve(result)
        })
    })
})
module.exports = {
    getAllBooks,
    addABook
}