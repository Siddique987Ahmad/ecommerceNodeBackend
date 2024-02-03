const asyncHandler=(requestHandle)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandle(req,res,next)).
        catch((err)=>next(err))
    }
}

export default asyncHandler