import express from "express";

import { login, signup } from "../controllers/auth.js";
import { signupUserValidator } from "../util/validator.js";

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   put:
 *     summary: User signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tom
 *               email:
 *                 type: string
 *                 example: tom@gmail.com
 *               password:
 *                 type: string
 *                 example: tom@123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created!
 *                 userId:
 *                   type: string
 *                   example: 668addac4f823b3cdd2adff5
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation failed.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: field
 *                       value:
 *                         type: string
 *                         example: tom@gmail.com
 *                       msg:
 *                         type: string
 *                         example: E-Mail address already exists!
 *                       path:
 *                         type: string
 *                         example: email
 *                       location:
 *                         type: string
 *                         example: body
 */
router.put("/signup", signupUserValidator, signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: tom@gmail.com
 *               password:
 *                 type: string
 *                 example: tom@123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsIn.GciOiJGciOiJIUzI1NiIsInIUzI1NiIsIn"
 *                 userId:
 *                   type: string
 *                   example: "668aa2206489128665477c29"
 *       401:
 *         description: Authentication failed due to user not found or wrong password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "A user with this email could not be found."
 */
router.post("/login", login);

export default router;
