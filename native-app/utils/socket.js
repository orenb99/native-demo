import { io } from "socket.io-client";
export const socket = io("http://10.100.102.10:3001", {
  transports: ["websocket"],
});
