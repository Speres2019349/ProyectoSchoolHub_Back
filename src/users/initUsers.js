import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import UserModel from './user.model.js';

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

async function addUser(user) {
  try {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (!existingUser) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(user.password, salt);

      await UserModel.create({
        email: user.email,
        username: user.username,
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        password: user.password,
        roleUser: user.roleUser,
        stateUser: user.stateUser,
      });

      console.log(`Added user: ${user.email}`);
    } else {
      console.log(`exists user: ${user.email}`);
    }
  } catch (error) {
    console.error(`Error adding user with email ${user.email}:`, error.message);
  }
}

async function addUsers() {
  await connectToMongo();

  const usersToInsert = [
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
  ];

  for (const user of usersToInsert) {
    await addUser(user);
  }
}

export default addUsers;