import UserModel from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// >>>>>>  function to encrypt a password ============//
const encryptPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10); // generating salt
  // salt given with password to generate encrypted hashed password
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
};

// >>>>>>  API functions ============//

export const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  try {
    let { password, email } = req.body;
    const fetchUser = await UserModel.findOne({ email });

    if (fetchUser) return res.status(400).json({ status: "false", msg: "email id is already registered !!" });

    req.body.password = await encryptPassword(password);
    const user = await UserModel.create(req.body);

    if (!user) {
      return res.status(400).json({ status: "false", msg: "user not created" });
    }
    res.status(200).json({ success: true, data: user });

    // await UserModel.create({
    //   name: req.body.name,
    //   password: req.body.password,
    //   email: req.body.email,
    //   location: req.body.location,
    // }).then(res.json({ success: true }));
  } catch (error) {
    console.log(error.message);
    res.json({ success: false });
  }
};

export const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      return res
        .status(400)
        .json({ status: "false", msg: "user not exist!! invalid email" });
    }
    const validPass = await bcrypt.compare(password, findUser.password);
    if (!validPass) {
      return res.status(400).json({ status: "false", msg: "invalid password" });
    }

    // token generation code
    const payLoad = {
      id: findUser._id.toString(),
      userName: `${findUser.name}`,
      userEmail: findUser["email"],
    };

    const AUTH_TOKEN = JWT.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ success: true, user: findUser, authToken: AUTH_TOKEN });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false });
  }
};
