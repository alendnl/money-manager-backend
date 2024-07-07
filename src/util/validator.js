import { body } from "express-validator";

import UserDetails from "../models/userDetails.js";

export const signupUserValidator = [
	body("email")
		.isEmail()
		.withMessage("Please enter a valid email.")
		.custom((value, { request }) => {
			return UserDetails.findOne({ email: value }).then((userDoc) => {
				if (userDoc) {
					return Promise.reject("E-Mail address already exists!");
				}
			});
		})
		.normalizeEmail(),
	body("password").trim().isLength({ min: 5 }),
	body("name").trim().not().isEmpty(),
];
