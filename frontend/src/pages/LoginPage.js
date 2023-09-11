import { Login } from "../components"
import { useStoreContext } from "../context-api"
import "../style/loginPage.css"

const LoginPage = () => {
	const { groupsWithUsers } = useStoreContext()

	// render the list of groups with users
	const renderGroups = () => {
		return groupsWithUsers.map(group => {
			return (
				<div key={group.id}>
					<h3>{group.name}</h3>
					{group.users.map(user => {
						return <p key={user.id}>{user.email}</p>
					})}
				</div>
			)
		})
	}
	return (
		<>
			<h2>Groups</h2>
			<section className='groups-users-container'>{renderGroups()}</section>
			<div className='login-container'>
				<Login />
			</div>
		</>
	)
}

export default LoginPage
