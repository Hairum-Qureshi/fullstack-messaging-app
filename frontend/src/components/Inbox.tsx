import useAuthContext from "../contexts/authContext";
import Home from "./Home";

export default function Inbox() {
	const { userData } = useAuthContext()!;

	console.log(userData);

	return userData?.message !== "user not logged in" ? <h1>Inbox</h1> : <Home />;
}
