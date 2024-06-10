export interface ContextData {
	userData: User | null;
	error: string | null;
	signOut: () => void;
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
	uid: string;
	username: string;
	email: string;
	profile_picture: string;
	token: string;
}
