import React, { useState } from "react"
import { useStoreContext } from "../context-api"

function Login() {
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)

	const { login } = useStoreContext()

	const handleEmailChange = e => {
		setEmail(e.target.value)
	}

	const handleLogin = () => {
		setLoading(true)
		setTimeout(() => {
			login(email)
			setLoading(false)
		}, 500)
	}

	const onSubmit = e => {
		e.preventDefault()
		handleLogin()
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<h2>Login</h2>
				<input
					type='text'
					placeholder="Enter user's email"
					value={email}
					disabled={loading}
					required
					onChange={handleEmailChange}
				/>
				<br />
				<button disabled={loading} type='submit'>
					{loading ? "Logging In..." : "Login"}
				</button>
			</form>
		</div>
	)
}

export default Login
