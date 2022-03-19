class ApiError extends Error{
    constructor(name,message,status_code,details = null){
        super(message)
        this.name = name;
        this.details = details
        this.status_code = status_code
    }
}

module.exports = ApiError