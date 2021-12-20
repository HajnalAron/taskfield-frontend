import io from "socket.io-client";

export const socket = io(import.meta.env.VITE_APP_SOCKET_URL);

socket.auth = {
  ["Access-Token"]: localStorage.getItem("accessToken")
};

socket.on("connection", () => {
  console.log(socket.id);
});
