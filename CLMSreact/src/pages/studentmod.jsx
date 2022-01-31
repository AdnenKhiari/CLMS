import BookForm from "../components/BookForm"

const StudentMod = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Modify a Student"} Submit={Submit} />
}
export default StudentMod