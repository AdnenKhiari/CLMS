import { useForm } from "react-hook-form";


//exazmple :
const allfields = {
    Submit:(data)=>{
      console.log(data)
    },
    fields:[
      {
        label: "First Name",
        name: "first_name",
        type: "text",
        options : {
          required: true
        }
      },
      {
        label: "Last Name",
        name: "last_name",
        type: "text"
      },
      {
        label: "Age",
        name: "age",
        type: "number"
      }
    ]
  }
/***
 * Create a form requires allfields object with Submit function and fields array with objects having:
 * label : the label value ;
 * name : the input name;
 * type : input type ( text , email etc);
 * options : data validation;
 ***/
const AForm = ({allfields})=>{
  // bug of reset files
    const { register,formState: { errors }, handleSubmit  } = useForm();
    return <div>
       <form onSubmit={handleSubmit(allfields.Submit)}>
          <div className="formFields">
          {allfields.fields.map((data,id)=> <div key={id} className="input_fields">
          {data.label && <label htmlFor={data.name}>{data.label}</label>}
          <input type={data.type || "text" } {...register(data.name,data.options || {})} />
          {errors[data.name] && <p className="danger">{data.name + " is " + errors[data.name].type}</p>}
          </div>)}
          </div>

          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
    </form>
    </div>
}

export default AForm