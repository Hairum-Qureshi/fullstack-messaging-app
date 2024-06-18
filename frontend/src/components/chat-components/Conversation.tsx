import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import "../../css/index.css";

export default function Conversation() {
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [isEmpty, setIsEmpty] = useState(true);
	const contentEditableRef = useRef<HTMLDivElement>(null);

	function handleInput() {
		if (contentEditableRef.current) {
			setIsEmpty(contentEditableRef.current.innerText.trim() === "");
		}
	}

	// TODO - need to make sure the text message bubbles can handle images - if not, need to modify CSS so they're displayed appropriately

	function userPasted(e: any) {
		// TODO - need to change 'any' to an appropriate type for 'e'
		// Function for handling when the user pastes an image into the content-edible div

		const image = e.clipboardData || window.Clipboard;
		const file = image.files[0];
		if (file) {
			var reader = new FileReader();

			reader.onloadend = () => {
				console.log(reader.result);
				const blob = new Blob([file], { type: file.type });
				const imageURL = URL.createObjectURL(blob);
				setUploadedImages(prev => [...prev, imageURL]);
			};

			if (file) {
				reader.readAsDataURL(file);
			}
		}
	}

	return (
		<div className="h-screen flex flex-col">
			<div className="w-full border-b-slate-400 p-1 border-2 flex items-center">
				<div className="inline-flex">
					<div className="relative">
						<img
							src="https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
							alt="User pfp"
							className="w-10 h-10 rounded-full border-2 border-black mr-2"
						/>
						<div className="absolute bottom-0 right-3">
							<div className="rounded-full w-3 h-3 bg-green-500"></div>
						</div>
					</div>
					<div className="flex items-center">
						<p className="text-base font-semibold">John Doe</p>
					</div>
				</div>
			</div>
			<div className="flex-grow overflow-auto border-2 border-blue-700">
				<div className="flex p-2">
					<img
						src="https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
						alt="User pfp"
						className="w-10 h-10 rounded-full border-2 border-black mr-2"
					/>
					<div>
						<p className="text-base bg-blue-300 p-2 rounded-lg rounded-tl">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
							perspiciatis maxime, pariatur aliquid molestias in quidem cumqu.
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
							officiis reprehenderit sunt sapiente vitae, qui voluptate?
							Repudiandae hic, dolorem ipsam deleniti harum beatae eius dolores
							molestias rem error, magnam pariatur?
							<p className="text-xs text-right">
								<i>Jun 17 2024, 8:07 PM</i>
							</p>
						</p>
					</div>
				</div>
				<div className="flex text-right p-2">
					<div className="ml-auto">
						<p className="text-base bg-green-300 p-2 rounded-lg rounded-t ml-auto">
							Hello
							<p className="text-xs text-left">
								<i>Jun 17 2024, 8:07 PM</i>
							</p>
						</p>
					</div>
					<img
						src="https://pbs.twimg.com/media/FegInEPXkAAS1PE.png"
						alt="User pfp"
						className="w-10 h-10 rounded-full border-2 border-black ml-2"
					/>
				</div>
			</div>
			<div className="relative bottom-0 w-full">
				{uploadedImages.length > 0 && (
					<div className="inline-flex overflow-x-auto border-2 border-black w-full">
						{uploadedImages.map((imageURL: string, index: number) => (
							<div key={index} className="p-2">
								<img
									src={imageURL}
									alt="Uploaded Image"
									className="w-44 h-44 bg-cover rounded-md ml-1 mr-1"
								/>
							</div>
						))}
					</div>
				)}
				<div className="w-full border-2 border-black">
					<div className="flex bg-gray-100 p-1 mr-4 w-full">
						{/* <Picker data={data} onEmojiSelect={console.log} /> */}
						<div className="flex items-center">
							<FontAwesomeIcon
								icon={faFaceSmile}
								className="text-2xl ml-2 mr-2"
							/>
						</div>
						<div
							contentEditable="plaintext-only"
							className={`w-11/12 m-1 resize-none appearance-none text-black p-2 ${
								isEmpty ? "placeholder" : ""
							}`}
							data-placeholder="Type a message..."
							onPaste={e => userPasted(e as ClipboardEvent)}
							onInput={handleInput}
							ref={contentEditableRef}
						></div>
						<div className="flex items-center">
							<FontAwesomeIcon icon={faImage} className="text-2xl ml-2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
