import { enqueueSnackbar } from "notistack"

// snakbar
const snakbar = (message, variant) => {
	enqueueSnackbar(message, {
		preventDuplicate: true,
		variant,
	})
}

export default snakbar
