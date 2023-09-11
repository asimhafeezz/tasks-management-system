import io from "socket.io-client"
import { snakbar } from "../utils"

const socket = io(process.env.REACT_APP_SOCKETS_URL || "http://localhost:5000")

//check if the socket is connected
socket.on("connect", () => {
	snakbar("Connected to the server!", "success")
})

// error
socket.on("error", () => {
	snakbar("Server not connected, Something went wrong!", "error")
})

//check if the socket is disconnected
socket.on("disconnect", () => {
	snakbar("Disconnected from the server!", "error")
})

export default socket
