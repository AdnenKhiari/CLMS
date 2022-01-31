import {useForm} from "react-hook-form"
const handleData = (data)=>{
    console.log(data)
}
const Profile = ()=>{
    const { register,formState: { errors }, handleSubmit } = useForm();
    return <form action="" onSubmit={handleSubmit(handleData)} className="profileForm">
        <div className="input_fields">
            <label htmlFor="first_name">First Name</label>
            <input type="text" {...register("first_name",{required : true})} />
        </div>
        <div className="input_fields">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" {...register("last_name",{required : true})} />
        </div>
        <div className="input_fields">
            <label htmlFor="adresse">Adresse</label>
            <input type="text" {...register("adresse")} />
        </div>
        <div className="input_fields">
            <label htmlFor="birth_date">Birth Date</label>
            <input type="date" {...register("birth_date",{required : true})} />
        </div>
        <div className="input_fields">
            <label htmlFor="email">Email</label>
            <input type="Email" {...register("email",{required : true})} />
        </div>
        <div className="input_fields">
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password",{required : true})} />
        </div>
        <div className="input_fields">
            <label htmlFor="salary">salary</label>
            <input type="number" {...register("salary",{required : true})} />
        </div>
        <div className="input_fields">
            <label htmlFor="gender">Gender</label>
            <select {...register("gender", { required: true })}>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>        
      </div>
      <div className="input_fields">
            <label htmlFor="grade">Grade</label>
            <select {...register("grade", { required: true })}>
                <option value="A">Agent</option>
                <option value="C">Chief</option>
                <option value="D">Director</option>
            </select>        
      </div>
          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
    </form>
}

export default Profile