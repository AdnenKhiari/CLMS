import BookForm from "../components/BookForm"

const StudentAdd = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Add a Student"} Submit={Submit} />
}
export default StudentAdd