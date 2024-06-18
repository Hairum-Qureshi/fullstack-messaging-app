import axios from "axios";
import { useEffect, useState } from "react";

interface MessageTools {
	findUser: (username: string) => void;
	getAllContacts: () => void;
}

interface Contact {
	username: string;
	user_id: string;
	chat_id: string;
}

export default function useMessaging(): MessageTools {
	const [userContacts, setUserContacts] = useState<Contact[]>([]);

	function getAllContacts() {
		try {
			axios
				.get("http://localhost:3000/api/user/get-all-contacts", {
					withCredentials: true
				})
				.then(response => {
					setUserContacts(prev => [...prev, response.data]);
				})
				.catch(error => console.log(error));
		} catch (error) {
			console.log(error);
		}
	}

	function findUser(username: string) {
		if (username) {
			axios
				.get(`http://localhost:3000/api/user/find/${username}`)
				.then(response => {
					setUserContacts(prev => [response.data, ...prev]);
					console.log(response.data);
				})
				.catch(error => console.log(error));
			alert(`You entered: ${username}`);
		} else {
			alert("Please provide a username");
		}
	}

	useEffect(() => {
		getAllContacts();
	}, [userContacts]);

	return { findUser, getAllContacts };
}
