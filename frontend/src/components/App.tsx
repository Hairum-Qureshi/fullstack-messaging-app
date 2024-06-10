import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Authentication from "./authentication/Authentication";
import Inbox from "./Inbox";
import { AuthProvider } from "../contexts/authContext";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				{/* <Navbar /> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-up" element={<Authentication />} />
					<Route path="/sign-in" element={<Authentication />} />
					<Route path="/messages" element={<Inbox />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
