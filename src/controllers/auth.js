import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserDetails from "../models/userDetails.js";

export const signup = async (request, response, next) => {
	try {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			const error = new Error("Validation failed.");
			error.statusCode = 422;
			error.data = errors.array();
			throw error;
		}

		const email = request.body.email;
		const name = request.body.name;
		const password = request.body.password;

		const hashedPw = await bcrypt.hash(password, 12);
		const user = new UserDetails({
			email: email,
			password: hashedPw,
			name: name,
		});
		const result = await user.save();

		response.status(201).json({
			message: "User created!",
			userId: result._id,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (request, response, next) => {
	try {
		const { email, password } = request.body;
		let loadedUser;

		const user = await UserDetails.findOne({ email: email });
		if (!user) {
			const error = new Error(
				"A user with this email could not be found."
			);
			error.statusCode = 401;
			throw error;
		}
		loadedUser = user;

		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error("Wrong password!");
			error.statusCode = 401;
			throw error;
		}

		const token = jwt.sign(
			{
				email: loadedUser.email,
				userId: loadedUser._id.toString(),
			},
			"secret",
			{ expiresIn: "1h" }
		);

		response.status(200).json({
			token: token,
			userId: loadedUser._id.toString(),
		});
	} catch (error) {
		next(error);
	}
};
