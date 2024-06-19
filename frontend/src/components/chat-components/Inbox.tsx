import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthContext from "../../contexts/authContext";
import Home from "../Home";
import ContactBlock from "./ContactBlock";
import Conversation from "./Conversation";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useMessaging from "../../hooks/useMessaging";

export default function Inbox() {
	const { userData } = useAuthContext()!;
	const [searchQuery, setSearchQuery] = useState("");

	console.log(userData);

	const { findUser } = useMessaging();

	return userData?.message !== "user not logged in" && userData ? (
		<div className="relative flex w-full box-border">
			<div className="w-full lg:w-1/4 h-screen bg-slate-200 overflow-scroll">
				<div className="w-full border-2 border-slate-400">
					<input
						type="search"
						placeholder="Search username to start chatting"
						className="w-full p-2 outline-none"
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						onKeyDown={e => e.key === "Enter" && findUser(searchQuery)}
					/>
				</div>
				<ContactBlock />
				<div className="bottom-0 p-3 absolute w-72 border-slate-400 border-2 bg-white flex items-center">
					<FontAwesomeIcon icon={faBars} className="text-2xl" />
					<h3 className="text-lg ml-3 font-semibold">
						Hi, {userData?.username}
					</h3>
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
