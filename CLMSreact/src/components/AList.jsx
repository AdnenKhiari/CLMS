
 /***
 * display data as a table/list
 * Require : data with header name and body a list of entires from sql
 * **/
const AList = ({data})=>{
    console.log("A LIST",data.body)
    if(data.body && Object.keys(data.body).length === 0)
        return <p>No Data</p>
    return <div className="table-container">
        <table>
            <thead>
                <tr>
                    {data.body && Object.keys(data.body[0]).map(key=><th key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.body && data.body.map((rowvalues,r)=><tr key={rowvalues.ID}>
                    {rowvalues && Object.keys(rowvalues).map((key,d)=>{
                    if(rowvalues[key])
                        return <td key={100+d}>
                            {key === "cover_url" ? <img src={rowvalues[key]} alt="Img" /> : rowvalues[key] }
                        </td>
                    return <td key={100+d}>null</td>
                    })}
                </tr>) }
            </tbody>
        </table>
    </div>
}
export default AList;