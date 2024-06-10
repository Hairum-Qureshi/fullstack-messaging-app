import { StreamChat } from "stream-chat";

export interface ContextData {
	userData: User | null;
	error: string | null;
	signOut: () => void;
	streamChat?: StreamChat;
}

export interface AuthProps {
	children: React.ReactNode;
}

export interface AuthTools {
	registerUser: (username: string, email: string, password: string) => void;
	loginUser: (email: string, password: string) => void;
	loading: boolean;
}

export interface User {
	id: string;
	username: string;
	email: string;
	profile_picture: string;
	token: string;
	message?: string;
}
