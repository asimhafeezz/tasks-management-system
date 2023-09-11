const { groups, users } = require("../data")

const getGroupsWithUsers = groups.map(group => {
	const groupUsers = users.filter(user => user.groupId === group.id)
	return {
		...group,
		users: groupUsers,
	}
})

module.exports = { getGroupsWithUsers }
