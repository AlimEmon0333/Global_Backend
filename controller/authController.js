const sendResponse = require("../helper/helper")
const userModel = require("../models/authModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const authController = {

    signup: async (req, res) => {
        try {
            let { userName, password, contact } = req.body
            let obj = { userName, password, contact }
            let errorArray = []

            if (!obj.userName) {
                errorArray.push("Username is required")
            }
            if (!obj.password) {
                errorArray.push("password is required")
            }
            if (errorArray.length > 0) {
                res
                    .status(400).send(sendResponse(false, null, "Validation error !", errorArray))
                return
            }
            let userExist = await userModel.findOne({ userName: obj.userName })
            if (userExist) {
                res
                    .status(400)
                    .send(sendResponse(false, null, null, "User is already exist with this userName"))
                return
            }
            obj.password = await bcrypt.hash(obj.password, 10)
            let user = await new userModel(obj);
            let result = await user.save();
            if (result) {
                res
                    .status(200)
                    .send(sendResponse(true, "User created !", result))
                return
            }
        } catch (error) {
            res.status(500).send(sendResponse(false, null, error, "Internal server error"))
        }
    },
    login: async (req, res) => {
        try {
            let { userName, password } = req.body
            let obj = { userName, password }
            let existingUser = await userModel.findOne({ userName: obj.userName })
            if (existingUser) {
                let correctPassword = await bcrypt.compare(obj.password, existingUser.password)
                if (correctPassword) {
                    let token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY)
                    let respon = res.send(sendResponse(true, "User login successfully", { token: token, user: existingUser }, null))
                } else {
                    res.send(sendResponse(true, "Password not matched", null, null))
                }
            } else {
                res.send(sendResponse(false, "User is not exist"))
            }

        } catch (error) {
            res.send(sendResponse(false, "Internal server error", null, error))
        }
    },
    checkAuth: async (req, res) => {
        let token = req.headers.authorization.replace("Bearer ", "");
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                res.status(401).send(sendResponse(false, "Un Authorized"));
            } else {
                res.status(200).send(sendResponse(true, "", decode._doc));
            }
        });
    },
}

module.exports = authController