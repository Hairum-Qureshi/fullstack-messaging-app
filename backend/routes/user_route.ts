import express from "express";
import { Request, Response } from "express";
const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
	const { username, email, password } = req.body;
	console.log(username, email, password);
	res.status(200).send("Received!");
});

export default router;
