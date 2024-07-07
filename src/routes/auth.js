import express from "express";

import { login, signup } from "../controllers/auth.js";
import { signupUserValidator } from "../util/validator.js";

const authRouter = express.Router();

// PUT "auth/signup"
authRouter.put("/signup", signupUserValidator, signup);

// POST "auth/login"
authRouter.post("/login", login);

export default authRouter;
