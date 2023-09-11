import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { socket } from "../config"
import { snakbar } from "../utils"

const StoreContext = React.createContext([])

export const useStoreContext = () => useContext(StoreContext)

export const StoreProvider = props => {
	const [tasks, setTasks] = useState([])
	const [userData, setUserData] = useState(null)
	const [groupsWithUsers, setGroupsWithUsers] = useState([])

	//login
	const login = email => {
		socket.emit("login", email)
	}

	// create task
	const createTask = task => {
		socket.emit("createTask", task)
	}

	// delete task
	const deleteTask = id => {
		socket.emit("deleteTask", id)
	}

	// mark complete
	const markComplete = (id, value) => {
		socket.emit("markComplete", { taskId: id, value })
	}

	// get tasks
	const getTasks = () => {
		socket.emit("getTasks", userData?.groupId)
	}

	// reordered tasks event
	const reorderedTasks = tasks => {
		socket.emit("reorderedTasks", tasks)
	}

	useEffect(() => {
		// Set up event listeners here
		// login events
		socket.on("loginSuccess", ({ user, tasks }) => {
			setTasks(tasks)
			setUserData(user)
			// show snakbar
			if (user.email === user.email) {
				snakbar("Logged in successfully!", "success")
			}
		})

		// login failed
		socket.on("loginFailed", () => {
			snakbar("User doesn't exists!", "error")
		})

		// create tasks
		socket.on("createTaskSuccess", task => {
			getTasks()
			// show snakbar
			if (userData.groupId === task.groupId) {
				snakbar("Task created successfully!", "success")
			}
		})

		// mark complete
		socket.on("markCompleteSuccess", task => {
			getTasks()
			if (task.groupId !== userData.groupId) return
			// show snackbar
			let message = task.complete ? "completed" : "marked incomplete"
			if (task.complete) {
				snakbar(`Task ${message} successfully!`, "success")
			} else {
				snakbar(`Task ${message} successfully!`, "warning")
			}
		})

		// get tasks
		socket.on("getTasksSuccess", tasks => {
			setTasks(tasks)
		})

		// Delete task
		socket.on("deleteTaskSuccess", task => {
			getTasks()
			if (userData.groupId !== task.groupId) return
			snakbar("Task deleted successfully!", "error")
		})

		// reorderedTasksSuccess
		socket.on("reorderedTasksSuccess", () => {
			getTasks()
		})

		// on join
		socket.on("join", groupsWithUsers => {
			setGroupsWithUsers(groupsWithUsers)
		})

		// Remove event listeners when the component unmounts
		return () => {
			socket.off("loginSuccess")
			socket.off("loginFailed")
			socket.off("createTaskSuccess")
			socket.off("markCompleteSuccess")
			socket.off("getTasksSuccess")
			socket.off("deleteTaskSuccess")
		}
	}, [userData])

	return (
		<StoreContext.Provider
			value={{
				tasks,
				login,
				createTask,
				deleteTask,
				getTasks,
				userData,
				markComplete,
				reorderedTasks,
				groupsWithUsers,
			}}>
			{props.children}
		</StoreContext.Provider>
	)
}
