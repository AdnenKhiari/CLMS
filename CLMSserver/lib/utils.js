const moment = require("moment")
const format_data = (body)=>{
    if(body != null){
        if(typeof body ==="string"){
            return body.trim().replaceAll("\\t","")
        }else if(typeof body === "object"){
            Object.keys(body).forEach((key)=>{
                body[key]=format_data(body[key])
            })
            return body
        }else{
            return body
        }
    }
    return null
}

module.exports = {
    format_data
}

 