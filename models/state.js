const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema ({
    stateName:{type:String,required:true},
    capitalName:{type:String,required:true},
    localGovernments:{type:Array,required:true},
    NumberOfLGA:{type:Number,required:true},
    SenDistrict:{type:String,required:true},
    SerialNumber:{type:Number,required:true},
    motto: {type:String,required:true},
    
    //location:{type:String,required:true}

})

module.exports = mongoose.model("States",stateSchema);