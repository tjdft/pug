export const state = () => ({
  editing: false,
  fullscreen: false,
  options: {
    dashboards: ['openshift', 'sonar', 'sentry']
  }
})

export const getters = {
  query_string(state) {
    return {
      fullscreen: state.fullscreen
    }
  }
}

export const mutations = {
  SET_EDITING(state, editing) {
    state.editing = editing
  },

  SET_FULLSCREEN(state, fullscreen) {
    state.fullscreen = fullscreen
  }
}

export const actions = {
  init({ commit }, query) {
    if (query === undefined) {
      return false
    }
    const fullscreen = query.fullscreen || false

    commit('SET_FULLSCREEN', fullscreen)
  },

  set_fullscreen({ commit, dispatch, state }) {
    commit('SET_FULLSCREEN', !state.fullscreen)
    dispatch('set_query_string', null, { root: true })
  },

  toogle_editing({ commit, state }) {
    commit('SET_EDITING', !state.editing)
  }
}
