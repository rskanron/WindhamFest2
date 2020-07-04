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
		const butter = Butter('b3c9a561dcfeb322516598e4f037b0ffa65a3ef1');
		let navResponse = await butter.content.retrieve(['main_nav'], {"test": 0});

		let navigation = navResponse.data.data.main_nav;
		console.log("NAV :::::::")
		console.log(navigation)

		commit('setNavigation', navigation)
	}
}