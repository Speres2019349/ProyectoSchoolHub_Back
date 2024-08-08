import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Users from './user.model.js';

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.URI_MONGO || 'mongodb+srv://alejandroandbrandon:GBYdZIkq4Lneqjx6@clusterschoolhub.qwsbk3z.mongodb.net/SchoolHub?retryWrites=true&w=majority&appName=ClusterSchoolHub', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado exitosamente.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Termina la aplicación si no se puede conectar a MongoDB
  }
}

const defaultUsers = [
  {
    email: "bmendoza@gmail.com",
    username: "bmendoza",
    id: "2019349",
    name: "Brandon",
    lastname: "Mendoza",
    password: "123456",
    roleUser: "SuperAdmin",
    stateUser: true,
  },
  {
    email: "amax@gmail.com",
    username: "amax",
    id: "2019189",
    name: "Alejandro",
    lastname: "Max",
    password: "123456",
    roleUser: "SuperAdmin",
    stateUser: true,
  },
  {
    email: "prueba@gmail.com",
    username: "prueba",
    id: "0000000",
    name: "Prueba",
    lastname: "Prueba",
    password: "123456",
    roleUser: "SuperAdmin",
    stateUser: true,
  },
];

const createDefaultUsers = async () => {
  try {
    for (const userData of defaultUsers) {
      const existingUser = await Users.findOne({ email: userData.email });
      if (!existingUser) {
        const encryptPassword = bcryptjs.hashSync(userData.password);
        await Users.create({
          ...userData,
          password: encryptPassword,
        });
        console.log(`User ${userData.username} created successfully.`);
      } else {
        console.log(`User ${userData.email} already exists.`);
      }
    }
  } catch (error) {
    console.error.apply("Error creating default users:", error);
  }
}

createDefaultUsers()
  .then(() => {
    console.log("Default users setup completed.");
  })
  .catch((error) => {
    console.error("Error in default users setup:", error);
  })