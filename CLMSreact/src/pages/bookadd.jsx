import BookForm from "../components/BookForm"

const BookAdd = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Add a Book"} Submit={Submit} />
}
export default BookAdd