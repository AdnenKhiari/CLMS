import BookForm from "../components/BookForm"

const BorrowAdd = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Add a Borrow Operation"} Submit={Submit} />
}
export default BorrowAdd