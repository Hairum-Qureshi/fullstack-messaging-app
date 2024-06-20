import express from "express";
import { Request, Response } from "express";
import User from "../models/user";
import Contact from "../models/contact";

const router = express.Router();

function decodeToken(req: Request): string {
	const token: string = req.cookies["auth-session"];
	const payloadBase64 = token.split(".")[1];
	const payloadBuffer = Buffer.from(payloadBase64, "base64");
	const payload = JSON.parse(payloadBuffer.toString());
	const current_uid: string = payload.user_id;
	return current_uid;
}

router.get("/current", async (req: Request, res: Response) => {
	if (req.cookies["auth-session"] !== undefined) {
		const current_uid: string = decodeToken(req);
		const currentUserData = await User.findOne({
			_id: Object(current_uid)
		});

		const currentUserContactData = await Contact.findOne({
			user_id: current_uid
		});

		if (currentUserData && currentUserContactData) {
			const {
				_id: user_id,
				username,
				email,
				profile_picture
			} = currentUserData;

			const { contacts, num_contacts } = currentUserContactData;

			res.json({
				user_id,
				username,
				email,
				profile_picture,
				contacts,
				num_contacts
			});
		}
	} else {
		res.json({ message: "user not logged in" });
	}
});

router.get("/find/:username", async (req: Request, res: Response) => {
	try {
		const { username } = req.params;

		const found_user = await User.findOne({ username });
		const curr_uid: string = decodeToken(req);
		const curr_user = await User.findOne({ _id: curr_uid });

		if (found_user && curr_user) {
			const currUser_numContacts = await Contact.findOne({
				user_id: curr_user
			});

			// Need to make sure that duplicates are prevented from being added
			// Need to prevent adding your own user ID
			await Contact.updateOne(
				{ user_id: curr_uid },
				{
					$push: {
						contacts: {
							user_id: found_user._id,
							username: found_user.username,
							profile_picture: found_user.profile_picture
						}
					},
					$set: { num_contacts: currUser_numContacts!.num_contacts + 1 }
				}
			);

			res.status(200).send({
				user_id: found_user._id,
				username: found_user.username,
				profile_picture: found_user.profile_picture
			});
		} else {
			res.status(404).send("User not found");
		}
	} catch (error) {
		res.status(500).send("An error occurred");
	}
});

export default router;
