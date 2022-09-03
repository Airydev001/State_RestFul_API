const express = require("express");
const stateController = require("../controllers/statename")



const router = express.Router();


router.post("/create",stateController.createState);

router.get("/",stateController.getByState)

router.get("/:stateName",stateController.getByStateName)


module.exports =router;