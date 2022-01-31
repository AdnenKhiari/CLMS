import AForm from "../components/AForm"

const allfields = (Submit = (data)=>console.log(data),reqs = {})=>{return {
    Submit : Submit,
    fields : [
      {
        label: "Title ",
        name: "title",
        type: "text",
        options : {
          required: reqs.title || false
        }
      },
      {
        label: "Publisher",
        name: "publisher",
        type: "text",
        options : {
          required: reqs.publisher || false
        }
      },
      {
        label: "Author",
        name: "author",
        type: "text",
        options : {
          required: reqs.author || false
        }
      },
      {
        label: "ISBN",
        name: "ISBN",
        type: "number",
        options : {
          required: reqs.ISBN || false
        }
      },
      {
        label: "Publication Date",
        name: "publication_date",
        type: "date",
        options : {
          required: reqs.publication_date || false
        }
      }
    ]
  }
}
const BookForm = ({name,Submit})=>{
    return <>
      <h2>{name}</h2>
      <AForm allfields={allfields(Submit)} />
    </>
}
export default BookForm