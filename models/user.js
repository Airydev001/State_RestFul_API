const mongoose = require("mongoose");
const Schema = mongoose.Schema
//use mongose-unique-validator to set unique if possible
const UserSchema = new Schema ({
    name : {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,minlength:6}
})

module.exports = mongoose.model("Users",UserSchema);
