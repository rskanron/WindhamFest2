import Butter from 'buttercms';

export const state = () => ({
	navigation: {}
})

export const mutations = {
	setNavigation(state, navigationFields) {
		state.navigation = navigationFields
	}
}

export const actions = {
	async initialize ({ commit }) {
		const butter = Butter(process.env.VUE_APP_BUTTER_API_KEY);
		let navResponse = await butter.content.retrieve(['main_nav'], {"test": 0});
		let navigation = navResponse.data.data.main_nav;

		commit('setNavigation', navigation)
	}
}