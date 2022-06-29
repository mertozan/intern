import { io } from "socket.io-client";

const API_URL = "http://localhost:8000";

const socket = io(API_URL, {
  query: { username: "furkan" },
});

export { socket };
