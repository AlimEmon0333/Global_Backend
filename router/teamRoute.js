const express = require("express")
const route = express.Router();
const TeamController = require("../controller/teamController")

route.post("/create" , TeamController.createTeam);

module.exports = route