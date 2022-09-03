const express = require("express");
//const bodyParser = require("body-parser");

const mongoose = require("mongoose");


const getStateRoute = require('./routes/getState')
const userRoutes = require('./routes/userRoute')
const checkAuth = require("./middleware/check-auth")
const app = express()

app.use(express.json());
//set CORS header that allow cross origin two local host interaction
app.use("/api/user/",userRoutes)
app.use(checkAuth);
app.use('/api/states/',getStateRoute)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
  

app.use((error,req,res,next)=>{
if(res.headerSent){
    return next(error)
}
res.status(error.code || 500)
res.json({message:error.message || 'An unknown error occured'})

})


//mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.xj4fbos.mongodb.net/states?retryWrites=true&w=majority`
//mogodb://localhost:27017/states, {useNewUrlParser:true}
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xj4fbos.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then( ()=>{app.listen(process.env.PORT||3500,(req,res)=>{
    console.log("The server is running");
})
}).catch((err)=>{
    console.log(err);
})