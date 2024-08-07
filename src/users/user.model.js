import mongoose, {Schema} from "mongoose";

const roles = ['Profesor', 'Alumno', 'SuperAdmin'];

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
    },
    codeId: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    roleUser: {
        type: String,
        enum: roles,
        default: "Alumno"
    },
    assignedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    coursesCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    stateUser: {
        type: Boolean,
        require: true 
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    diplomas:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diploma'
    }],
    degree:{
        type: String,
    },
    degrees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degrees'
    }],
    subject:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degrees'
    }],
})

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema)