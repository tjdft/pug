import { merge } from 'lodash'

export const state = () => ({
  sonar: {
    tags: [],
    search: '',
    enabled: true,
    summary: true,
    layout: { x: 0, y: 0, w: 64, h: 3, i: 'sonar' }
  },
  sentry: {
    tags: [],
    search: '',
    enabled: true,
    summary: true,
    layout: { x: 2, y: 0, w: 64, h: 3, i: 'sentry' }
  },
  openshift: {
    tags: [],
    search: '',
    enabled: true,
    summary: false,
    layout: { x: 4, y: 0, w: 64, h: 3, i: 'openshift' }
  }
})

export const getters = {
  list(state) {
    return Object.keys(state)
  },
  enabled(state) {
    return Object.keys(state).filter(key => state[key].enabled === true)
  },
  layout(state) {
    return Object.values(state)
      .filter(dashboard => dashboard.enabled)
      .map(dashboard => dashboard.layout)
  },
  query_string(state) {
    return state
  }
}

export const mutations = {
  // Merge search string into state
  SET_TAGS(state, tags) {
    const dashboard = Object.keys(tags)[0]
    state[dashboard].tags = Object.values(tags)[0]
  },

  // Merge tags into state
  SET_SEARCH(state, search) {
    const dashboard = Object.keys(search)[0]
    state[dashboard].search = Object.values(search)[0]
  },

  SET_LAYOUT(state, layouts) {
    layouts.forEach(layout => {
      Object.assign(state[layout.i].layout, {}, layout)
    })
  },

  SET_SUMMARY(state, payload) {
    state[payload.dashboard].summary = payload.summary
  },

  TOGGLE(state, dashboards) {
    Object.keys(state).forEach(key => {
      state[key].enabled = dashboards.includes(key)
    })
  },

  // Mutate entire state
  SET_DASHBOARDS(state, value) {
    merge(state, value)
  }
}

export const actions = {
  init({ commit }, query) {
    if (query === undefined) {
      return false
    }

    commit('SET_DASHBOARDS', query)
  },

  set_tags({ commit, dispatch }, payload) {
    commit('SET_TAGS', payload)
    dispatch('set_query_string', null, { root: true })
  },

  set_search({ commit, dispatch }, payload) {
    commit('SET_SEARCH', payload)
    dispatch('set_query_string', null, { root: true })
  },

  set_layout({ commit, dispatch }, payload) {
    commit('SET_LAYOUT', payload)
    dispatch('set_query_string', null, { root: true })
  },

  set_summary({ commit, dispatch }, payload) {
    commit('SET_SUMMARY', payload)
    dispatch('set_query_string', null, { root: true })
  },

  toggle({ commit, dispatch }, payload) {
    commit('TOGGLE', payload)
    dispatch('set_query_string', null, { root: true })
  }
}
