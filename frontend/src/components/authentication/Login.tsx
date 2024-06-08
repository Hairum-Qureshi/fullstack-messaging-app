export default function Login() {
	return (
		<div className="bg-white">
			<h1 className="text-5xl font-semibold text-center lg:text-left">
				Welcome back!
			</h1>
			<p className="font-medium text-lg text-gray-500 mt-4 text-center lg:text-left">
				Welcome back to React Chat, please enter your details to login and
				resume chatting.
			</p>
			<div className="mt-8">
				<div>
					<label htmlFor="email" className="text-lg font-medium ml-2 lg:ml-0">
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Email"
						className="w-full border-2 border-gray-100 rounded-md mt-1 p-4 outline-gray-300"
					/>
				</div>
			</div>
			<div>
				<div className="mt-3">
					<label
						htmlFor="password"
						className="text-lg font-medium ml-2 lg:ml-0"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						placeholder="Password"
						className="w-full border-2 border-gray-100 rounded-md mt-1 p-4 outline-gray-300"
					/>
				</div>
			</div>
			<div>
				<div className="flex">
					<input type="checkbox" id="remember-login" className="ml-3 lg:ml-0" />
					<label htmlFor="remember-login" className="ml-2">
						Remember Me
					</label>
					<button className="ml-auto text-purple-700 font-semibold mr-3 lg:mr-0">
						Forgot Password
					</button>
				</div>
			</div>
		</div>
	);
}
