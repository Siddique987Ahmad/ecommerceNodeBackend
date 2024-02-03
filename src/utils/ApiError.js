class ApiError extends Error{
    constructor(
        statusCode,
        message="Something wrong",
        errors=[],
        stack=""
    )
    {
        super(message),
        this.statusCode=statusCode,
        this.data=null,
        this.errors=errors,
        this.message=message,
        this.success=false
        if(stack)
        {
this.stack=stack
        }
        else {
            Error.captureStackTrace(this,this.constructor)
        }
        

    }
}
export default ApiError