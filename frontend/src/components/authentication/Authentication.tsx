import { useLocation } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import NotFound from "../NotFound";

export default function Authentication() {
	const location = useLocation();

	return (
		<div className="flex w-full h-screen">
			<div>
				{location.pathname.includes("/sign-up") ? (
					<Registration />
				) : location.pathname.includes("/sign-in") ? (
					<Login />
				) : (
					<NotFound />
				)}
			</div>
			<div></div>
		</div>
	);
}
