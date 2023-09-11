import React, { useState } from "react"

import "../style/createTask.css"
import { snakbar } from "../utils"
import { useStoreContext } from "../context-api"

const CreateTask = () => {
	const [newTask, setNewTask] = useState({
		title: "",
		description: "",
	})

	// user
	const { userData, createTask } = useStoreContext()

	const handleInputChange = e => {
		const { name, value } = e.target
		setNewTask({
			...newTask,
			[name]: value,
		})
	}

	const handleCreateTask = () => {
		if (!userData) {
			snakbar("Please login first!", "error")
			return
		}
		const task = {
			...newTask,
			userId: userData?.id,
			groupId: userData?.groupId,
			complete: false,
		}
		createTask(task)
		// Clear the form fields after creating the task
		setNewTask({ title: "", description: "" })
	}

	const onSubmit = e => {
		e.preventDefault()
		handleCreateTask()
	}

	return (
		<form onSubmit={onSubmit}>
			<div className='create-task-card'>
				<h2>Create a New Task</h2>
				<div className='form-group'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						name='title'
						required
						placeholder="Enter task's title"
						value={newTask.title}
						onChange={handleInputChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						name='description'
						required
						placeholder="Enter task's description"
						value={newTask.description}
						onChange={handleInputChange}
						rows={5}
					/>
				</div>
				<button type='submit'>Create</button>
			</div>
		</form>
	)
}

export default CreateTask
