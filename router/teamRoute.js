const express = require("express")
const route = express.Router();
const TeamController = require("../controller/teamController")

route.post("/create", TeamController.createTeam);
route.get("/", TeamController.getTeams)
route.get('/:teamId/members', TeamController.getTeamMembers);

module.exports = route