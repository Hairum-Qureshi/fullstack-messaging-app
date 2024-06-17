export default function ContactBlock() {
	return (
		<div className="w-full border-2 border-slate-300 mb-1 p-1 flex items-center bg-slate-100 hover:bg-neutral-100 hover:cursor-pointer">
			<div className="inline-flex">
				<div className="relative">
					<img
						src="https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
						alt="User pfp"
						className="w-12 h-12 rounded-full border-2 border-black mr-2"
					/>
					<div className="absolute bottom-0 right-3">
						<div className="rounded-full w-3 h-3 bg-green-500"></div>
					</div>
				</div>
				<div>
					<p className="text-base font-semibold">John Doe</p>
					<p className="text-gray-400 text-sm hover:text-gray-700">
						<i>Last message here...</i>
					</p>
				</div>
			</div>
		</div>
	);
}
