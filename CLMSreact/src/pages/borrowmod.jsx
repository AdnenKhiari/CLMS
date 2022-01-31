import BookForm from "../components/BookForm"

const BorrowMod = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Modify a Borrow Operation"} Submit={Submit} />
}
export default BorrowMod