import BookForm from "../components/BookForm"

const BookMod = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Modify a Book"} Submit={Submit} />
}
export default BookMod