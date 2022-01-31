
//Example
 const testData = {
    name: "Table Name",
    header : ["field1","field2","field3","field4"],
    body : [[{value: "value1"},{value: "value2"},{value: "value3"},{value: "value4"}],
    [{value: "value1"},{value: "value2"},{value: "value3"},{value: "value4"}],
    [{value: "value1"},{value: "value2"},{value: "value3"},{value: "value4"}],
    [{value: "value1",span: 2},{value: "value3"},{value: "value4"}],
    [{value: "value1"},{value: "value2"},{value: "value3"},{value: "value4"}],
    [{value: "value1",span: 4}]]
  }
 /***
 * display data as a table/list
 * Require : data with header name and body a list of list 
 * containing objects with the form {value,span}
 * **/
const AList = ({data})=>{
    return <div>
        <table>
            {data.name && <thead>{data.name}</thead>}
            <tbody>
                {data.body && data.body.map((rowvalues,r)=><tr key={r}>
                    {rowvalues && rowvalues.map((value,d)=><td key={+d} colSpan={value.span}>
                        {value.value}
                    </td>)}
                </tr>) }
            </tbody>
        </table>
    </div>
}
export default AList;