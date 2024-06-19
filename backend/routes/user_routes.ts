import express from "express";
import { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

router.get("/current", async (req: Request, res: Response) => {
	if (req.cookies["auth-session"] !== undefined) {
		const token: string = req.cookies["auth-session"];
		const payloadBase64 = token.split(".")[1];
		const payloadBuffer = Buffer.from(payloadBase64, "base64");
		const payload = JSON.parse(payloadBuffer.toString());
		const current_uid: string = payload.user_id;
		const currentUserData = await User.findOne({
			_id: Object(current_uid)
		});
		if (currentUserData) {
			const {
				_id: user_id,
				username,
				email,
				profile_picture
			} = currentUserData;
			res.json({ user_id, username, email, profile_picture });
		}
	} else {
		res.json({ message: "user not logged in" });
	}
});

export default router;
