import BookForm from "../components/BookForm"

const TransactionDel = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Delete a Transaction"} Submit={Submit} />
}
export default TransactionDel