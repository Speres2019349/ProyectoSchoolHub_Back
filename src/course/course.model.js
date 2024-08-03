import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        require: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        require: true,
    },
    modules: [{
        type: mongoose.Schema.Types.objectId,
        ref: 'Module',
    }],
    certificate: [{
        type: mongoose.Schema.Types.objectId,
        ref: 'Certificate',
    }],
    progress: [{
        type: mongoose.Schema.Types.objectId,
        ref: 'Progress',
    }],
    exams: [{
        type: mongoose.Schema.Types.objectId,
        ref: 'Exams',
    }],
})

export default mongoose.model('Course', CourseSchema);