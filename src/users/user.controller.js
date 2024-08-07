import User from "./user.model.js";
import bcryptjs from 'bcryptjs';
import Course from '../course/course.model.js'

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.uid !== id) {
            console.log(req.user.uid, id)
            return res.status(403).json({ msg: "You are not authorized to update this user" });
        }

        const { _id, password, email, ...rest } = req.body;

        if (password || email) {
            return res.status(403).json({ msg: "method are not authorized to update password and email" });
        }

        await User.findByIdAndUpdate(id, rest);

        res.status(200).send(`Your account has been update`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error, Your account has not been update');
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user.roleUser == 'Alumno') {
            return res.status(403).send('You are not authorized to delete this user');
        }

        const user = await User.findByIdAndUpdate(id, { state: false });
        res.status(200).send('The user is successfully deleted');

    } catch (error) {
        console.error(error);
        res.status(500).send('Contact the administrator');
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id })

        if (!user) {
            return res.status(404).json({ error: 'user no encontrado' });
        }

        res.status(200).json({
            user
        })

    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la publicación' });
    }
}

export const courseGet = async (req, res) => {
    try {
        const userCreator = req.user.email;

        const courses = await Course.find({ userCreator: userCreator });

        res.status(200).json({
            courses
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error course');
    }
};

export const courseGetAlumno = async ( req, res ) => {
    try {
        const user = await User.findOne({ _id: req.user.uid })
        if ( !user || user.roleUser !== 'Alumno' ) {
            return res.status( 403 ).send( 'Only students can access their assigned courses' );
        }

        // Obtener el usuario con los cursos poblados
        const userWithCourses = await User.findOne( { email: user.email } ).populate( 'courses' );

        if ( !userWithCourses ) {
            return res.status( 404 ).send( 'User not found' );
        }

        const courses = userWithCourses.courses;

        res.status( 200 ).json( {
            courses
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).send( 'Internal Server Error course' );
    }
};