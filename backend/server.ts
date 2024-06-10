import express from "express";
import cors from "cors";
import auth_routes from "./routes/auth_routes";
import user_routes from "./routes/user_routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT: string = process.env.PORT!;

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

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}!`);
});
