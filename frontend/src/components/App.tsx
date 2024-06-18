import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Authentication from "./authentication/Authentication";
import Inbox from "./chat-components/Inbox";
import { AuthProvider } from "../contexts/authContext";
import { SocketProvider } from "../contexts/socketContext";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<SocketProvider>
					{/* <Navbar /> */}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sign-up" element={<Authentication />} />
						<Route path="/sign-in" element={<Authentication />} />
						<Route path="/messages" element={<Inbox />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</SocketProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}
