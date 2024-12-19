import { User } from "../models/userModel.js";

import argon2 from "argon2";
import jwt from "jsonwebtoken";

//register
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hash = await argon2.hash(password);

    const user = new User({ name, email, password: hash, role });

    if (!name || !email || !password ) {
      console.log("please enter the fields");
    }

    await user.save();

    res.status(201).json({ msg: "user registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ msg: "email or password do not exists" });

    const verify = await argon2.verify(user.password, password);

    if (verify) {
      //   res.status(200).json({ msg: "user logged in but token no generated" });
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
        },
        process.env.jwt_secretKey
        // { expiresIn: "5min" }
      );

      res.status(200).json({ msg: "signed in and token generated", token });
    } else {
      res.status(401).json({ msg: "unauthorised user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export { signup, signin };
