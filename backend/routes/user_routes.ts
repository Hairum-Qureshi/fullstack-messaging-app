import express from "express";
import { Request, Response } from "express";
import { streamChat } from "./auth_routes";

const router = express.Router();

router.get("/current", async (req: Request, res: Response) => {
	// TODO - safety concern: if a user goes to this route, they will see the current user's session token
	if (req.cookies["auth-session"] !== undefined) {
		const token: string = req.cookies["auth-session"];
		const payloadBase64 = token.split(".")[1];
		const payloadBuffer = Buffer.from(payloadBase64, "base64");
		const payload = JSON.parse(payloadBuffer.toString());
		const current_uid: string = payload.user_id;
		const current_userData = await streamChat.queryUsers({ id: current_uid });
		const { id, username, email, image } = current_userData.users[0];
		res.json({ id, username, email, profile_picture: image, token });
	} else {
		res.json({ message: "user not logged in" });
	}
});

export default router;
