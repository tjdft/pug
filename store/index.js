export const state = () => ({
  tv_mode: process.env.TV_MODE,
  tv_dashboards: process.env.TV_DASHBOARDS,
  tv_view: process.env.TV_VIEW,
  options: {
    dashboards: ['openshift', 'sonar', 'sentry'],
    views: ['all', 'carousel']
  },
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

  SET_TV_VIEW(state, value) {
    state.tv_view = value
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
    const queryObject = {
      tv_mode: state.tv_mode,
      tv_dashboards: state.tv_dashboards.join(','),
      tv_view: state.tv_view,
      tags: state.tags,
      search: state.search
    }

    this.$router.replace({ path: '/', query: queryObject })
  }
}

export const actions = {
  nuxtServerInit({ commit }, { redirect }) {
    if (this.$env.TV_QUERY) {
      redirect(`/?${this.$env.TV_QUERY}`)
    }

    const query = this.$router.history.current.query
    const tvMode = query.tv_mode === 'true' || this.$env.TV_MODE === 'true'
    const tvView = query.tv_view || this.$env.TV_VIEW

    const tvDashboards = query.tv_dashboards
      ? query.tv_dashboards.split(',')
      : this.$env.TV_DASHBOARDS.split(',')

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

    commit('SET_TV_MODE', tvMode)
    commit('SET_TV_VIEW', tvView)
    commit('SET_TV_DASHBOARDS', tvDashboards)
  },

  set_tv_mode({ commit, state }) {
    commit('SET_TV_MODE', !state.tv_mode)
    commit('SET_QUERY_STRING')
  },

  set_tv_view({ commit }, payload) {
    commit('SET_TV_VIEW', payload)
    commit('SET_QUERY_STRING')
  },

  set_tv_dashboards({ commit }, payload) {
    commit('SET_TV_DASHBOARDS', payload)
    commit('SET_QUERY_STRING')
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
