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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }],
    diplomas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diploma',
    }],
    progress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Progress',
    }],
    exams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exams',
    }],
})

export default mongoose.model('Course', CourseSchema);