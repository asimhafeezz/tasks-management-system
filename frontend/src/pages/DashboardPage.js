import { CreateTask, TasksList } from "../components"
import "../style/dashboardPage.css"
const DashboardPage = () => {
	return (
		<div className='home-container'>
			<CreateTask />
			<h1>Tasks</h1>
			<TasksList />
		</div>
	)
}

export default DashboardPage
