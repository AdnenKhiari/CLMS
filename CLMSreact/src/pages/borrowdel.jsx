import BookForm from "../components/BookForm"

const BorrowDel = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Delete a Borrow Operation"} Submit={Submit} />
}
export default BorrowDel