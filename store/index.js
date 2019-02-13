export const state = () => ({
  tv_mode: process.env.TV_MODE
})

export const mutations = {
  SET_TV_MODE(state, value) {
    state.tv_mode = value
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('SET_TV_MODE', this.$env.TV_MODE)
  },

  toogle_tv_mode({ commit, state }) {
    commit('SET_TV_MODE', !state.tv_mode)
  }
}
