import BookForm from "../components/BookForm"

const UserAdd = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return  <BookForm name={"Add a User"} Submit={Submit} />
}
export default UserAdd