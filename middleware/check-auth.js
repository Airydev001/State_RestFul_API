const jwt = require("jsonwebtoken")
const HttpError = require("../models/http-error")
module.exports = (req,res,next)=>{
	/*if(req.method === 'OPTION'){
return next();
	}*/
       const authHeader = req.headers.authorization;
	
    try {
        const token = authHeader.split(' ')[1];
        //console.log(req.headers);
        console.log(token);
        if(!token){
            throw new Error("Authentication Failed! please try again")
        }
        const decodedToken = jwt.verify(token,process.env.JWT_KEY)
        req.userData ={userId:decodedToken.userId}
        next();
    } catch(err){
        console.log(err);
        const error = new HttpError("Authentication failed!",401);
        return next(error)
    }
}