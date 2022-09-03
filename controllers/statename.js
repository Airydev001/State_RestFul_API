const httpError = require("../models/http-error");
const State = require("../models/state");
const getData = require("../utils/local")


const createState = async (req,res,next)=>{
const  {stateName,capitalName,motto} = req.body;
let data;
try {
     data= await getData(stateName);
   console.log(data);
}catch(err){
    const error = new httpError("No response from API",402);
    next(error)
}


let existUser = await State.findOne({stateName});
let createdState;
if(existUser===null){
createdState = new State ({
    stateName,
    capitalName,
    localGovernments:data.dataArray,
    NumberOfLGA:data.count,
    SenDistrict:data.senDistrict,
    SerialNumber:data.serialNumber,
    motto


})
} else {
    const error = new httpError("The state already exist",500)
     next();
}


try {
    createdState.save() 
} catch (err){
    const error = new httpError("Creating State failed! try again later",500)
    next(error);
}
res.json({
    State:createdState
})

}
const getByStateName = async (req,res,next)=>{
    const statename = req.params.stateName
let stateData;
try {
    stateData = await State.find({stateName:statename});
} catch (err){
    const error = new httpError("Something went wrond couldn't get State",500);
    next(error);
}

if(!stateData){
    return next(
        new httpError("couldn't find the state name provided", 404)
    )
}
res.json({
    state:stateData.map(s => s.toObject({getters:true}))
})

}
const getByState = async (req,res,next) =>{
 let getAllState;
 try {
    getAllState = await State.find({});
 } catch(err){
    console.log(err);
    const error = new httpError("Couldn't get the list  of state",422);
    next(error)
 }
 res.json({
    listState:getAllState.map(ls => ls.toObject({getters:true}))
 })
}

exports.createState = createState;
exports.getByStateName = getByStateName;

exports.getByState = getByState;