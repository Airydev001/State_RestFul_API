const httpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getAllUser = async (req,res,next)=>{

    let users;

  try{
    users = await User.find({}, "-password")
  } catch(err){
    const error = new httpError("Fetching user failed,please try again later");
    return next(error);
  }

  res.status(200).json({
    userFoundList:users.map(user => user.toObject({getters:true}))
  })

}
const signUpUser = async (req,res,next) => {
console.log(req);
    const {name,email,password}=req.body;
    console.log(password)
    const convertedPassword = Buffer.from(password).toString("base64");
    let existUser;

    try{
     existUser =   await User.findOne({email:email});
    } catch(err){
        console.log(err);
        const error = new httpError("Signup failed,please try again later",500);
        return next(error);
    }
    if(existUser){
        const error = new httpError("User exist already please login instead ",422);
      return next(error)
    }
    let hashPassword;
try{
   hashPassword = await bcrypt.hash(convertedPassword,12)//hashed the password adding salting round
} catch(err){
  const error = new httpError(
    "Couldn't sign up the user",422
  )
  return next(error)
}

    const newlycreateUser = new User ({
        name,
        email,
        password:hashPassword
    })


try {
    await newlycreateUser.save()
} catch(err){
    console.log(err)
      const error = new httpError("Signup user failed try again",500);
      return next(error);
}

let token; 
  try {
  token = jwt.sign({userId:newlycreateUser.id,email:newlycreateUser.email},process.env.JWT_KEY,{expiresIn:'2h'})
  } catch(err){
    const error = new httpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(201).json({ user: newlycreateUser.id,email:newlycreateUser.email, token:token });


/*res.status(201).json({
    user:newlycreateUser.toObject({getters:true})
})*/
}


const logInUser =async (req,res,next)=>{
    const {email,password} = req.body;
    console.log(typeof(password));
    let convertPassword = Buffer.from(password).toString("base64");
    
    //check whether user exixt before
    let existingUser;
    try {
      existingUser = await User.findOne({email:email});
    } catch(err){
      console.log(err);
      const error = new httpError("Mail doesn't exist ,please sign up",500);
      return next(error);
    }
    if(!existingUser){
      const error = new httpError("User exist already please login instead ",422);
      return next(error)
    }

let isValidPassword = false 

try {
  isValidPassword = await bcrypt.compare(convertPassword,existingUser.password);
}catch(err){
const error= new httpError("Invalid credential couldn't log in",500)
return next(error);
}

if(!isValidPassword){
  const error = new httpError(
    'Invalid credentials, could not log you in.',
    401
  );
  return next(error);
}

    let token; 
  try {
  token = jwt.sign({userId:existingUser.id,email:existingUser.email},process.env.JWT_KEY,{expiresIn:'1h'})
  } catch(err){
    const error = new httpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  res.status(201).json({ user: existingUser.id,email:existingUser.email, token:token });

    /*res.json({message:'logged In Successfully' })*/
}


exports.signUpUser = signUpUser;
exports.logInUser = logInUser;
exports.getAllUser = getAllUser;