import axios from "axios";
import { useState } from "react";

export default function Registration() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerUser(e: React.FormEvent) {
		e.preventDefault();
		if (username && email && password) {
			try {
				const response = await axios.post(
					"http://localhost:3000/api/auth/register",
					{
						username,
						email,
						password
					},
					{
						withCredentials: true
					}
				);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<div>
			<form onSubmit={registerUser}>
				<input
					type="text"
					placeholder="username"
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type="email"
					placeholder="email"
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					onChange={e => setPassword(e.target.value)}
				/>
				<button type="submit">Create Account</button>
			</form>
		</div>
	);
}
