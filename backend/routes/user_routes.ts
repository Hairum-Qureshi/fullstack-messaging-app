import express from "express";
import { Request, Response } from "express";
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/current", (req: Request, res: Response) => {
	console.log(req.cookies);
	console.log(
		JSON.parse(
			Buffer.from(
				req.cookies["auth-session"].split(".")[1],
				"base64"
			).toString()
		)
	);
	res.send("Current user route");
});

export default router;
