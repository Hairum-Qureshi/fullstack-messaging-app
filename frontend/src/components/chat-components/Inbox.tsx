import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthContext from "../../contexts/authContext";
import Home from "../Home";
import ContactBlock from "./ContactBlock";
import Conversation from "./Conversation";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Inbox() {
	const { userData } = useAuthContext()!;

	return userData?.message !== "user not logged in" ? (
		<div className="relative flex w-full box-border">
			<div className="w-full lg:w-1/4 h-screen bg-slate-200 overflow-scroll">
				<div className="w-full border-2 border-slate-400">
					<input
						type="search"
						placeholder="Enter username"
						className="w-full p-2 outline-none"
					/>
				</div>
				<ContactBlock />
				<div className="bottom-0 p-3 absolute w-72 border-slate-400 border-2 bg-white">
					<FontAwesomeIcon icon={faBars} className="text-2xl" />
				</div>
			</div>
			<div className="w-full hidden lg:block h-screen">
				<Conversation />
			</div>
		</div>
	) : (
		<Home />
	);
}
