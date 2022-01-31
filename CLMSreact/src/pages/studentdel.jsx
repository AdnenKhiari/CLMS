import BookForm from "../components/BookForm"

const StudentDel = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Delete a Student"} Submit={Submit} />
}
export default StudentDel