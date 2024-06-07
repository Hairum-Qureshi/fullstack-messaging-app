import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Authentication from "./authentication/Authentication";

export default function App() {
	return (
		<BrowserRouter>
			{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-up" element={<Authentication />} />
				<Route path="/sign-in" element={<Authentication />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
