const express = require("express")
const http = require("http")
const socketIO = require("socket.io")
const cors = require("cors")
const { tasks, users } = require("./data")
const { getGroupsWithUsers } = require("./utils")
const { v4: uuidv4 } = require("uuid")

const app = express()
const server = http.createServer(app)

// add cors
const corsOptions = {
	// access all origins
	origin: "*",
}

app.use(cors(corsOptions))

const io = socketIO(server, {
	cors: corsOptions,
})

// Handle socket connections
io.on("connection", socket => {
	console.log("new user connected")

	// Emit the list of groups to the client
	socket.emit("join", getGroupsWithUsers)

	// handle user login
	socket.on("login", email => {
		const user = users.find(user => user.email === email)
		if (user) {
			// send the tasks of the group of the user
			const groupTasks = tasks.filter(task => task.groupId === user.groupId)
			// socket.emit("tasks", groupTasks)
			socket.emit("loginSuccess", { user, tasks: groupTasks })
		} else {
			socket.emit("loginFailed")
		}
	})

	// Handle task creation
	socket.on("createTask", task => {
		try {
			const newTask = {
				...task,
				id: uuidv4(),
			}
			tasks.push(newTask)
			io.emit("createTaskSuccess", newTask)
		} catch (error) {
			io.emit("createTaskFailed", error)
		}
	})

	// Handle retrieving tasks for a group
	socket.on("getTasks", groupId => {
		try {
			const groupTasks = tasks.filter(task => task.groupId === groupId)
			socket.emit("getTasksSuccess", groupTasks)
		} catch (error) {
			socket.emit("getTasksFailed", error)
		}
	})

	// mark complete
	socket.on("markComplete", ({ taskId, value }) => {
		try {
			const taskIndex = tasks.findIndex(task => task.id === taskId)
			tasks[taskIndex].complete = value
			io.emit("markCompleteSuccess", tasks[taskIndex])
		} catch (error) {
			io.emit("markCompleteFailed", error)
		}
	})

	// delete task
	socket.on("deleteTask", taskId => {
		try {
			const taskIndex = tasks.findIndex(task => task.id === taskId)
			const deletedTask = tasks[taskIndex]
			tasks.splice(taskIndex, 1)
			io.emit("deleteTaskSuccess", deletedTask)
		} catch (error) {
			io.emit("taskDeleteFailed", error)
		}
	})

	// reordered
	socket.on("reorderedTasks", reorderedTasks => {
		console.log({ reorderedTasks })
		try {
			// set the array of tasks to the new order of tasks, simple = is not working
			// tasks.splice(0, tasks.length, ...reorderedTasks) another way
			tasks.length = 0
			tasks.push(...reorderedTasks)

			io.emit("reorderedTasksSuccess", tasks)
		} catch (error) {
			io.emit("reorderedTasksFailed", error)
		}
	})

	// Handle user disconnection
	socket.on("disconnect", () => {
		console.log("user disconnected")
	})
})

server.listen(5000, () => {
	console.log("Server is running on port 5000")
})
