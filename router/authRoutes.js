import express from "express";
import { signin, signup } from "../controllers/authControllers.js";

const authRouter = express.Router()
authRouter.post('/register', signup)
authRouter.post('/login',signin)

export default authRouter

