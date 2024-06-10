import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { User, ContextData, AuthProps } from "../interfaces";
import { StreamChat } from "stream-chat";

export const AuthContext = createContext<ContextData | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
	const [userData, setUserData] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [streamChat, setStreamChat] = useState<StreamChat>();

	useEffect(() => {
		const getCurrUserData = async () => {
			try {
				const userDataResponse = await axios.get(
					"http://localhost:3000/api/user/current",
					{
						withCredentials: true
					}
				);
				if (userDataResponse.data.message === "user is not logged in") {
					setUserData(null);
				} else {
					setUserData(userDataResponse.data);
					setToken(userDataResponse.data.token);
				}
			} catch (error) {
				console.error("There was an error", error);
			}
		};

		getCurrUserData();
	}, []);

	const signOut = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3000/api/auth/logout",
				{
					withCredentials: true
				}
			);
			if (response.status === 200) {
				setUserData(null);
			}
		} catch (error) {
			console.error("There was an error", error);
		}
	};

	useEffect(() => {
		if (!userData) {
			return;
		}
		const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY);

		if (chat.tokenManager.token === token && chat.userID === userData.id)
			return;

		const userResponse = {
			id: userData.id,
			username: userData.username,
			email: userData.email,
			profile_picture: userData.profile_picture
		};

		let isInterrupted = false;
		const connectPromise = chat.connectUser(userResponse, token).then(() => {
			if (isInterrupted) return;
			setStreamChat(chat);
		});

		return () => {
			isInterrupted = true;
			setStreamChat(undefined);

			connectPromise.then(() => {
				chat.disconnectUser();
			});
		};
	}, [token, userData]);

	const value: ContextData = {
		userData,
		error,
		signOut,
		streamChat
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
	return useContext(AuthContext);
};

export default useAuthContext;
