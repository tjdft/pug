export const state = () => ({
  tv_mode: process.env.TV_MODE,
  tv_dashboards: process.env.TV_DASHBOARDS,
  tv_layout: process.env.TV_LAYOUT,
  tags: {
    sonar: [],
    sentry: [],
    openshift: []
  },
  search: {
    sonar: '',
    sentry: '',
    openshift: ''
  }
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
  },

  // Merge search string into state
  SET_TAGS(state, value) {
    const dashboard = Object.keys(value)[0]
    state.tags[dashboard] = Object.values(value)[0]
  },

  // Merge tags into state
  SET_SEARCH(state, value) {
    const dashboard = Object.keys(value)[0]
    state.search[dashboard] = Object.values(value)[0]
  },

  // Replace url query string
  SET_QUERY_STRING(state) {
    const queryObject = { tags: state.tags, search: {} }

    // provide a clean url if there are no search terms
    Object.keys(state.search).forEach(dashboard => {
      if (state.search[dashboard] === '') return
      queryObject.search[dashboard] = state.search[dashboard]
    })

    this.$router.replace({ path: '/', query: queryObject })
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('SET_TV_MODE', this.$env.TV_MODE === 'true')
    commit('SET_TV_LAYOUT', this.$env.TV_LAYOUT)

    // Convert dashboard comma list into array
    const dashboards = this.$env.TV_DASHBOARDS.replace(/ /g, '').split(',')
    commit('SET_TV_DASHBOARDS', dashboards)

    const query = this.$router.history.current.query

    // Extract payload for each deashboard
    if (query.tags) {
      Object.keys(query.tags).forEach(tag => {
        commit('SET_TAGS', { [tag]: query.tags[`${tag}`] })
      })
    }

    // Extract payload for each deashboard
    if (query.search) {
      Object.keys(query.search).forEach(search => {
        commit('SET_SEARCH', { [search]: query.search[`${search}`] })
      })
    }
  },

  toogle_tv_mode({ commit, state }) {
    commit('SET_TV_MODE', !state.tv_mode)
  },

  set_tv_layout({ commit }, payload) {
    commit('SET_TV_LAYOUT', payload)
  },

  set_tv_dashboards({ commit }, payload) {
    commit('SET_TV_DASHBOARDS', payload)
  },

  set_tags({ commit, dispatch }, payload) {
    commit('SET_TAGS', payload)
    commit('SET_QUERY_STRING')
  },

  set_search({ commit, dispatch }, payload) {
    commit('SET_SEARCH', payload)
    commit('SET_QUERY_STRING')
  }
}
