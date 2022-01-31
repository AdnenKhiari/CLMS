import BookForm from "../components/BookForm"

const UserDel = ()=>{
    const Submit=(data)=>{
      console.log(data) 
    }
    return <BookForm name={"Delete a User"} Submit={Submit} />
}
export default UserDel