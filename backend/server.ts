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
				origin: ["http://localhost:5174"]
			}
		});

		io.on("connection", socket => {
			console.log(`User with socket ID: ${socket.id} connected`);
		});
	})
	.catch(err => {
		console.log(err);
	});
