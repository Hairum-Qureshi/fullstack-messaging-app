import useAuthContext from "../contexts/authContext";
import Home from "./Home";

export default function Inbox() {
	const { userData } = useAuthContext()!;

	return userData?.message !== "user not logged in" ? (
		<div className="flex w-full box-border">
			<div className="w-full lg:w-1/4 h-screen bg-slate-200"></div>
			<div className="w-full border-2 hidden border-blue-600 lg:block h-screen"></div>
		</div>
	) : (
		<Home />
	);
}
