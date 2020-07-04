const actions = {
	async nuxtServerInit ({ dispatch }) {
		await dispatch('modules/navigation/initialize');
	}
}

export default {
    actions
}