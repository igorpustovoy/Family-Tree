import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

class SocketIOService {
  socket: Socket;

  constructor() {
    this.socket = io(
      (import.meta.env.API_URL as string) || "https://localhost:5000/"
    );
  }
}

export const socket = new SocketIOService().socket;
