import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import '../src/users/initUsers.js';
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js'
import courseRoutes from '../src/course/course.routes.js'
import usersRoutes from '../src/users/user.routes.js'
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/schoolHub/v1/auth'
        this.coursePath = '/schoolHub/v1/course'
        this.usersPath = '/schoolHub/v1/users'

        this.conectarDB(); 
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    
    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use( apiLimiter );
    };

   
    routes() {  
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.coursePath, courseRoutes);
        this.app.use(this.usersPath, usersRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;