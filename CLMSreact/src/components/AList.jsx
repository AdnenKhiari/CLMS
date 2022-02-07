
 /***
 * display data as a table/list
 * Require : data with header name and body a list of entires from sql
 * **/
const AList = ({data})=>{
    return <div className="table-container">
        <table>
            <thead>
                <tr>
                {data.body && Object.keys(data.body[0]).map(key=><th key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.body && data.body.map((rowvalues,r)=><tr key={rowvalues.ID}>
                    {rowvalues && Object.keys(rowvalues).map(key=>rowvalues[key]).map((value,d)=>{
                    if(value)
                        return <td key={100+d}>
                            {value}
                        </td>
                    return <td key={100+d}>null</td>
                    })}
                </tr>) }
            </tbody>
        </table>
    </div>
}
export default AList;