import { useStoreContext } from "../context-api/StoreContext"
import "../style/tasksList.css"
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd"
import Task from "./Task"
import { snakbar } from "../utils"

const TasksList = () => {
	//use store
	const { reorderedTasks, tasks } = useStoreContext()

	// on drag end
	const onDraggingEndHandler = result => {
		if (!result.destination) {
			snakbar("Please drop the task in a valid area", "error")
			return
		}

		// Reorder the tasks in your state array based on the result
		const updatedTasks = Array.from(tasks)
		const [movedTask] = updatedTasks.splice(result.source.index, 1)
		updatedTasks.splice(result.destination.index, 0, movedTask)

		reorderedTasks(updatedTasks)
	}

	if (!tasks.length) {
		return <h2>No tasks found</h2>
	}

	return (
		<DragDropContext onDragEnd={onDraggingEndHandler}>
			<Droppable droppableId='droppable' direction='horizontal'>
				{provided => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className='tasks-container'>
							{tasks.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id} index={index}>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}>
											<Task task={item} />
										</div>
									)}
								</Draggable>
							))}
						</div>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default TasksList
