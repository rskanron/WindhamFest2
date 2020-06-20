const actions = {
	async nuxtServerInit ({ dispatch }) {
		await dispatch('modules/layout/initializeLayout');
	}
}

export default {
    actions
}