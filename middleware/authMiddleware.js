import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "not authorised" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secretKey);
    const user = await User.findById(decoded.id);
    // console.log(user.role)

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    req.user = user;  // Attach user to req object
    next();
  } catch (error) {
    return res.status(401).json({ msg: "invalid credentials",error:error.message });
  }
};

export default authMiddleware;
