import BookForm from "../components/BookForm"

const TransactionMod = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Modify a Transaction"} Submit={Submit} />
}
export default TransactionMod