// teamController.js
const userModel = require('../models/authModel');
const Team = require('../models/teamModel');

const TeamController = {
    createTeam: async (req, res) => {
        try {
            // Assuming that the request body contains team name and an array of AuthModel IDs
            const { name, members } = req.body;

            // Create a new team
            const newTeam = await Team.create({
                name,
                members: members || [], // If members array is not provided, default to an empty array
            });

            // Add the team ID to each AuthModel's list of teams
            if (members && members.length > 0) {
                await userModel.updateMany(
                    { _id: { $in: members } },
                    { $push: { teams: newTeam._id } }
                );
            }

            res.status(201).json({
                success: true,
                message: 'Team created successfully',
                team: newTeam,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Team creation failed',
                error: error.message,
            });
        }
    },
};

module.exports = TeamController;