import BookForm from "../components/BookForm"

const BookDel = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Delete a Book"} Submit={Submit} />
}
export default BookDel