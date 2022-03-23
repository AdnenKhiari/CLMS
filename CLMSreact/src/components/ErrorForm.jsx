const ErrorDisplay = ({err})=>{
    return <>{err != null && <div className="danger-container">
    <p className="danger">{err.message}</p>
     { err.details  && typeof(err.details) !== "string" && err.details.length > 0 && err.details.map((dt,index)=><p key={index} className="danger">{dt}</p>)}
     {  typeof(err.details) === "string" && <p className="danger">{err.details}</p>}
  </div>}
  </>
}
export default ErrorDisplay