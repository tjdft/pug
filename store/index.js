import qs from 'qs'

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

  SET_TAGS(state, value) {
    const dashboard = Object.keys(value)[0]
    state.tags[dashboard] = Object.values(value)[0]
  },

  SET_SEARCH(state, value) {
    const dashboard = Object.keys(value)[0]
    state.search[dashboard] = Object.values(value)[0]
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('SET_TV_MODE', this.$env.TV_MODE === 'true')
    commit('SET_TV_LAYOUT', this.$env.TV_LAYOUT)

    const dashboards = this.$env.TV_DASHBOARDS.replace(/ /g, '').split(',')
    commit('SET_TV_DASHBOARDS', dashboards)

    const query = qs.parse(this.$router.history.current.query)

    if (Object.keys(query).length === 0) return

    Object.keys(query.tags).forEach(tag => {
      commit('SET_TAGS', { [tag]: query.tags[`${tag}`] })
    })

    Object.keys(query.search).forEach(search => {
      commit('SET_SEARCH', { [search]: query.search[`${search}`] })
    })
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

  set_tags({ commit, state }, payload) {
    commit('SET_TAGS', payload)

    this.$router.replace(
      qs.stringify(
        { tags: state.tags, search: state.search },
        { encode: false, addQueryPrefix: true }
      )
    )
  },

  set_search({ commit, state }, payload) {
    commit('SET_SEARCH', payload)

    this.$router.replace(
      qs.stringify(
        { tags: state.tags, search: state.search },
        { encode: false, addQueryPrefix: true }
      )
    )
  }
}
