import Course from './course.model.js';
import User from '../users/user.model.js';

export const coursesCreated = async (req, res) => {
    try {
        const { courseName, creationDate, author, modules, diplomas, progress, exams } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);

        const course = new Course({
            courseName, 
            creationDate, 
            author,
            modules,
            diplomas,
            progress,
            exams
        });

        await course.save();

        res.status(200).json({
            course
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "An error occurred while creating the course" });
    }
}

export const coursesGet = async (req, res) => {
    try {
        
        const course = await Course.find();
        res.status(200).json(course);

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "An error occurred while displaying courses" });
    }
}