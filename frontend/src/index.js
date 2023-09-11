import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { StoreProvider } from "./context-api"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<>
		<BrowserRouter>
			<SnackbarProvider>
				<StoreProvider>
					<App />
				</StoreProvider>
			</SnackbarProvider>
		</BrowserRouter>
	</>
)
