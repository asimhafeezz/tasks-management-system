import "./App.css"
import { Route, Routes } from "react-router-dom"
import { DashboardPage, LoginPage } from "./pages"
import { useStoreContext } from "./context-api"

function App() {
	const { userData } = useStoreContext()
	return (
		<div className='App'>
			<h1>Tasks Management System</h1>
			<Routes>
				<Route
					path='/'
					element={userData ? <DashboardPage /> : <LoginPage />}
				/>
			</Routes>
		</div>
	)
}

export default App
