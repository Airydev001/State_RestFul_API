const axios = require("axios");
const httpError = require("../models/http-error");


async function getData (state){
    const response = await axios.get(`http://nigeriastateandlocalgovtarea.herokuapp.com/lgalists?State=${state}`)
const datas = response.data;
let count = 0;
let dataArray = [];
let senDistrict;
let serialNumber;
datas.forEach(data=>{
    count++;
    //console.log(data.LGA);
dataArray.push(data.LGA);
senDistrict= data.SenDistrict;
serialNumber = data.SerialNumber;
})
return {dataArray,count,senDistrict,serialNumber};
}

module.exports = getData;