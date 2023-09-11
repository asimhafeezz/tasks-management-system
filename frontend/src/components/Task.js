import { useStoreContext } from "../context-api"

const Task = ({ task }) => {
	const { deleteTask, markComplete } = useStoreContext()

	return (
		<div className='task-card'>
			<h2>{task.title}</h2>
			<p>{task.description}</p>
			<div className='task-actions'>
				<p
					className={
						task.complete
							? "complete check-complete-text"
							: "check-pending-text"
					}
					onClick={() => markComplete(task.id, !task.complete)}>
					{task.complete ? "completed" : "incomplete"}
				</p>
				<button onClick={() => deleteTask(task.id)}>Delete</button>
			</div>
		</div>
	)
}

export default Task
