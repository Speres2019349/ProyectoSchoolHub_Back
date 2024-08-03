import bcryptjs from 'bcryptjs';
import Users from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-JWT.js';

export const register = async (req, res) => {
  const { email, username, password, name, lastname, roleUser } = req.body;
  const encryptPassword = bcryptjs.hashSync(password);

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new Users({
      email,
      username,
      password: encryptPassword,
      name,
      lastname,
      roleUser
    });

    await newUser.save();

    res.status(201).json({ msg: 'Registered user successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res
             .status(400)
             .send(`Wrong credentials, ${email} doesn't exists en database`);
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        console.log(password);

        if (!validPassword) {
          return res.status(400).send("wrong password");
        }
    
        const token = await generarJWT(user.id, user.email);
    
        res.status(200).json({
          msg: "Login Successfully",
          userDetails: {
            username: user.username,
            token: token,
          },
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send("User cannot be added to database");   
    }
}