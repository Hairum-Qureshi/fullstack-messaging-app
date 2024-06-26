import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import User from "../models/user";
import Contact from "../models/contact";
import validator from "email-validator";
import vd from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { decodeToken } from "./user_routes";

dotenv.config();

const router = express.Router();

function createCookie(user_id: mongoose.Types.ObjectId, res: Response) {
	const payload = {
		user_id
	};
	const secretKey: string = Math.floor(
		Math.random() * Number(new Date())
	).toString();
	const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });
	res.cookie("auth-session", token, { httpOnly: true, maxAge: 259200000 }); // 3 days in milliseconds
}

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

router.post("/register", async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	// TODO: check if an email already exists and/or username already exists
	// TODO - make sure to blacklist usernames like "admin"
	// TODO - need to add a filter to prevent users from adding swear words and inappropriate usernames

	try {
		const containsValidCharacters: boolean = emailRegex.test(email);
		const checkDuplicateUsernames = await User.findOne({ username });
		const checkExistingEmails = await User.findOne({ email });

		if (!checkDuplicateUsernames) {
			if (checkExistingEmails) {
				res.status(409).send("Email already registered");
			} else {
				if (containsValidCharacters) {
					const isValidEmail = validator.validate(email);
					if (isValidEmail) {
						if (!vd.matches(username, "^[a-zA-Z0-9_.-]*$")) {
							res
								.status(400)
								.send(
									"Username can only contain alphanumeric characters, underscores, periods, and dashes"
								);
						} else {
							const hashedPassword = await bcrypt.hash(password, 10);

							const user = await User.create({
								username,
								date_joined: new Date().toLocaleDateString("en-US"),
								email,
								password: hashedPassword
							});

							await Contact.create({
								user_id: user._id,
								contacts: []
							});

							createCookie(user._id, res);

							res.status(200).send("Successfully registered!");
						}
					} else {
						res.status(400).send("Email is not valid");
					}
				} else {
					res
						.status(400)
						.send("Please make sure your email contains valid characters");
				}
			}
		} else {
			res.status(409).send("Username taken");
		}
	} catch (error) {
		console.log("There was an error", error);
		res.status(500).send(error);
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const containsValidCharacters: boolean = emailRegex.test(email);
	const checkExistingEmails = await User.findOne({ email });
	try {
		if (!checkExistingEmails) {
			res.status(404).send("No email corresponds with this email");
		} else {
			if (containsValidCharacters) {
				const isValidEmail = validator.validate(email);
				if (isValidEmail) {
					const check_password = await bcrypt.compare(
						password,
						checkExistingEmails.password
					);
					if (check_password) {
						createCookie(checkExistingEmails._id, res);
						res.status(200).send("Successfully logged in!");
					} else {
						res.status(401).send("Incorrect password");
					}
				} else {
					res.status(400).send("Email is not in valid format");
				}
			} else {
				res
					.status(400)
					.send("Please make sure your email contains valid characters");
			}
		}
	} catch (error) {
		console.log(error);
	}
});

router.get("/logout", async (req: Request, res: Response) => {
	try {
		const user_id: string = decodeToken(req);

		await User.findByIdAndUpdate(
			{ _id: user_id },
			{
				active: false
			}
		);

		res.clearCookie("auth-session");
		res.status(200).send("Success");
	} catch (error) {
		console.log(error);
		res.status(500).send("Error destroying session");
	}
});

export default router;
