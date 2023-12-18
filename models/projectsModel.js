const mongoose = require("mongoose")

const projectsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    projectStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
})

const projectsModel = mongoose.model("projects", projectsSchema)
module.exports = projectsModel