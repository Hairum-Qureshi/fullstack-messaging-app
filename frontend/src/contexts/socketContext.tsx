import { useState, useEffect, createContext, useContext } from "react";
import { Socket, io } from "socket.io-client";

interface ContextData {
	socket: Socket | undefined;
}

interface SocketProps {
	children: React.ReactNode;
}

export const SocketContext = createContext<ContextData | null>(null);

const socket_io = io("http://localhost:3000", { autoConnect: false });

export const SocketProvider = ({ children }: SocketProps) => {
	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		// Connect the socket
		socket_io.connect();

		// Listen for the 'connect' event to log the socket ID
		socket_io.on("connect", () => {
			setSocket(socket_io);
		});

		// Cleanup function to disconnect the socket when the component unmounts
		return () => {
			socket_io.disconnect();
		};
	}, []);

	const value: ContextData = {
		socket
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};

const useSocketContext = () => {
	return useContext(SocketContext);
};

export default useSocketContext;
