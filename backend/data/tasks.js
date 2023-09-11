const { v4: uuidv4 } = require("uuid")

const tasks = [
	{
		id: uuidv4(),
		title: "Task 1",
		description: "This is task 1",
		complete: false,
		groupId: "group1",
		userId: 1,
	},
	{
		id: uuidv4(),
		title: "Task 2",
		description: "This is task 1",
		complete: false,
		groupId: "group1",
		userId: 1,
	},
	{
		id: uuidv4(),
		title: "Task 3",
		description: "This is task 1",
		complete: true,
		groupId: "group1",
		userId: 1,
	},
	{
		id: uuidv4(),
		title: "Task 4",
		description: "This is task 1",
		complete: false,
		groupId: "group1",
		userId: 1,
	},
	{
		id: uuidv4(),
		title: "Task 5",
		description: "This is task 1",
		complete: false,
		groupId: "group2",
		userId: 1,
	},
	{
		id: uuidv4(),
		title: "Task 6",
		description: "This is task 2",
		complete: false,
		groupId: "group2",
		userId: 2,
	},
]

module.exports = tasks
