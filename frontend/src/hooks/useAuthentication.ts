import axios from "axios";

interface AuthTools {
	registerUser: (username: string, email: string, password: string) => void;
}

export default function useAuthentication(): AuthTools {
	async function registerUser(
		username: string,
		email: string,
		password: string
	) {
		if (username && email && password) {
			try {
				const response = await axios.post(
					"http://localhost:3000/api/auth/register",
					{
						username,
						email,
						password
					}
				);

				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return { registerUser };
}
