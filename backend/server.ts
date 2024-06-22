import express from "express";
import cors from "cors";
import auth_routes from "./routes/auth_routes";
import user_routes from "./routes/user_routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { Server } from "socket.io";
import User from "././models/user";
import * as Redis from "redis";

// const redis_client = Redis.createClient();

const redis_client = Redis.createClient({
	url: "redis://localhost:6379"
});

redis_client.on("error", err => {
	console.error("Redis error:", err);
});

// Ensure the Redis client is connected
redis_client.connect().then(() => {
	console.log("Successfully connected to Redis!");
});

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

function getUID(session_token: string): string {
	const payloadBase64 = session_token.split(".")[1];
	const payloadBuffer = Buffer.from(payloadBase64, "base64");
	const payload = JSON.parse(payloadBuffer.toString());
	const current_uid: string = payload.user_id;
	return current_uid;
}

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

		io.on("connection", async socket => {
			// console.log("user connected");

			const session_token: string | undefined =
				socket.handshake.headers.cookie?.split("auth-session=")[1];

			if (session_token) {
				const current_uid: string = getUID(session_token);

				try {
					// Get the list of active users
					const activeUsers = await redis_client.lRange(
						"activeUsersList",
						0,
						-1
					);

					// Check if the user ID is already in the list
					if (activeUsers.includes(current_uid)) {
						console.log(`User ${current_uid} is already in the list.`);
					} else {
						// Add user ID to the end of the list
						await redis_client.rPush("activeUsersList", current_uid);
						console.log(`User ${current_uid} added to list in Redis.`);
					}
				} catch (err) {
					console.error("Error handling user ID in Redis:", err);
				}

				socket.on("add-connected-uid", async uid => {
					const user = await User.findById({ _id: uid });

					// socket.emit("active-users", UIDs);
					// console.log(`${user.username} is now active`);
				});

				// if (user) {
				// 	socket.emit("active-users", user._id);
				// 	console.log(`${user.username} is now active`);
				// }
			}

			socket.on("disconnect", async socket => {
				// Updating the user's activity status to false is already handled when they sign out.
				// console.log("user disconnected");
				if (session_token) {
					const current_uid: string = getUID(session_token);
					const user = await User.findByIdAndUpdate(
						{ _id: current_uid },
						{
							active: true
						},
						{ new: true }
					);

					console.log(`${user?.username} is no longer active`);
				}
			});
		});
	})
	.catch(err => {
		console.log(err);
	});
