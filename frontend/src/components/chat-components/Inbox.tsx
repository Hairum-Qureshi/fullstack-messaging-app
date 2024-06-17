import useAuthContext from "../../contexts/authContext";
import Home from "../Home";
import ContactBlock from "./ContactBlock";

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
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
				<ContactBlock />
			</div>
			<div className="w-full hidden lg:block h-screen"></div>
			<div className="bottom-0 p-3 absolute w-72 border-slate-400 border-2 bg-white">
				<p>Settings Here</p>
			</div>
		</div>
	) : (
		<Home />
	);
}
