export const state = () => ({
    layout: null
})

export const mutations = {
	setLayout(state, layout) {
		state.layout = layout
	}
}

export const actions = {
	async init ({ commit }) {
		var layout = JSON.parse(require('fs').readFileSync('./butter_content/allSiteContent.json', 'utf8'));
		
        commit('setLayout', layout)
	}
}