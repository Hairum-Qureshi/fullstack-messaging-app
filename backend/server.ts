import express from "express";
import cors from "cors";
import auth_routes from "./routes/auth_routes";
import user_routes from "./routes/user_routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT: string = process.env.PORT! || "3000";
const MONGO_URI: string = process.env.MONGO_URI!;

const corsOptions = {
	origin: "http://localhost:5174",
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", auth_routes);
app.use("/api/user", user_routes);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		const express_server = app.listen(PORT, () => {
			console.log(
				`Successfully connected to MongoDB! Server listening on port ${PORT}`
			);
		});

		const io = new Server(express_server, {
			cors: {
				origin: ["http://localhost:5174"],
				credentials: true
			}
		});

		io.on("connection", socket => {
			console.log("user connected");

			const session_token: string | undefined =
				socket.handshake.headers.cookie?.split("auth-session=")[1];

			if (session_token) {
				const payloadBase64 = session_token.split(".")[1];
				const payloadBuffer = Buffer.from(payloadBase64, "base64");
				const payload = JSON.parse(payloadBuffer.toString());
				const current_uid: string = payload.user_id;
				console.log(current_uid);
			}

			socket.on("disconnect", socket => {
				// console.log("user disconnected");
			});
		});
	})
	.catch(err => {
		console.log(err);
	});
