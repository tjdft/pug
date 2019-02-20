export const state = () => ({
  tv_mode: process.env.TV_MODE,
  tv_dashboards: process.env.TV_DASHBOARDS,
  tv_layout: process.env.TV_LAYOUT
})

export const mutations = {
  SET_TV_MODE(state, value) {
    state.tv_mode = value
  },

  SET_TV_DASHBOARDS(state, value) {
    state.tv_dashboards = value
  },

  SET_TV_LAYOUT(state, value) {
    state.tv_layout = value
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('SET_TV_MODE', this.$env.TV_MODE === 'true')
    commit('SET_TV_DASHBOARDS', this.$env.TV_DASHBOARDS)
    commit('SET_TV_LAYOUT', this.$env.TV_LAYOUT)
  },

  toogle_tv_mode({ commit, state }) {
    commit('SET_TV_MODE', !state.tv_mode)
  },

  set_tv_layout({ commit, state }) {
    commit('SET_TV_LAYOUT', !state.tv_layout)
  },

  toogle_tv_dashboards({ commit, state }) {
    commit('SET_TV_DASHBOARDS', !state.tv_dashboards)
  }
}
