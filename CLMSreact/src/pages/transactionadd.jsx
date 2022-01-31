import BookForm from "../components/BookForm"

const TransactionAdd = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Add a Transaction"} Submit={Submit} />
}
export default TransactionAdd