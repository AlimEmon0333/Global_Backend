const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User name is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    contact: {
        type: Number,
        required: [false, "Contact number is optional"],
    },
},
    {
        timestamps: true
    })

const userModel = mongoose.model("users", userSchema)
module.exports = userModel