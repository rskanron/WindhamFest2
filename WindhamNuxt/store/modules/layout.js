export const state = () => ({
	layout: {}
})

export const mutations = {
	setLayout(state, layoutPageFields) {
		state.layout = layoutPageFields
	}
}

export const actions = {
	async initializeLayout ({ commit }) {
		// TODO: make a "layout" page type and look for that specific one
		var result = await fetch('https://api.buttercms.com/v2/pages/simple?auth_token=b3c9a561dcfeb322516598e4f037b0ffa65a3ef1').then(response => response.json());
		var layoutPage = result.data.find(x => x.page_type === "simple");

        commit('setLayout', layoutPage.fields)
	}
}