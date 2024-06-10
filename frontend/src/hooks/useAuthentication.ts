import axios from "axios";
import { useState } from "react";

interface AuthTools {
	registerUser: (username: string, email: string, password: string) => void;
	loginUser: (email: string, password: string) => void;
	loading: boolean;
}

export default function useAuthentication(): AuthTools {
	const [loading, isLoading] = useState(false);

	async function registerUser(
		username: string,
		email: string,
		password: string
	) {
		if (username && email && password) {
			try {
				isLoading(true);

				const response = await axios.post(
					"http://localhost:3000/api/auth/register",
					{
						username,
						email,
						password
					}
				);

				if (response.status === 200) {
					isLoading(false);
					window.location.href = "/messages";
				} else {
					isLoading(false);
				}
			} catch (error) {
				isLoading(false);
				console.log(error);
			}
		} else {
			alert("Please make sure all fields are populated");
		}
	}

	async function loginUser(email: string, password: string) {
		if (email && password) {
			try {
				isLoading(true);

				const response = await axios.post(
					"http://localhost:3000/api/auth/login",
					{
						email,
						password
					}
				);

				if (response.status === 200) {
					isLoading(false);
					window.location.href = "/messages";
				}
			} catch (error) {
				isLoading(false);
				console.log(error);
			}
		} else {
			alert("Please provide and email and password");
		}
	}

	return { registerUser, loginUser, loading };
}
