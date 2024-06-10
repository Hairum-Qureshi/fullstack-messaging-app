import express from "express";
import { Request, Response } from "express";
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
import validator from "email-validator";
import vd from "validator";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();

export const streamChat = StreamChat.getInstance(
	process.env.STREAM_API_KEY!,
	process.env.STREAM_SECRET_KEY!
);

function createCookie(uid: string, res: Response) {
	const token: string = streamChat.createToken(uid);
	res.cookie("auth-session", token, { httpOnly: true, maxAge: 259200000 }); // 3 days in milliseconds
}

router.post("/register", async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	// TODO: check if an email already exists and/or username already exists
	// TODO - make sure to blacklist usernames like "admin"
	// TODO - need to add a filter to prevent users from adding swear words and inappropriate usernames

	try {
		const emailRegex: RegExp =
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		const containsValidCharacters = emailRegex.test(email);

		const checkDuplicateUsernames = await streamChat.queryUsers({ username });
		if (checkDuplicateUsernames.users.length === 0) {
			const checkDuplicateEmails = await streamChat.queryUsers({ email });
			if (checkDuplicateEmails.users.length > 0) {
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
							const uid = randomUUID().replace(/-/g, "");

							const hashedPassword = await bcrypt.hash(password, 10);

							streamChat.upsertUser({
								id: uid,
								username,
								email,
								image:
									"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
								password: hashedPassword
							});

							createCookie(uid, res);

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
	// TODO - need to connect to MongoDB and create a User model to handle authentication better. This does not check if the user's password is correct; only their email
	const { email, password } = req.body;

	const checkExistingEmail = await streamChat.queryUsers({ email });
	try {
		if (checkExistingEmail.users.length > 0) {
			const uid: string = checkExistingEmail.users[0].id;
			createCookie(uid, res);
			res.status(200).send("FOUND");
		} else {
			res.status(404).send("NOT FOUND");
		}
	} catch (error) {
		console.log(error);
	}
});

export default router;
