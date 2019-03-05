export const actions = {
  nuxtServerInit({ commit, dispatch }, { redirect }) {
    if (this.$env.TV_QUERY) {
      redirect(`/?${this.$env.TV_QUERY}`)
    }

    const query = this.$router.history.current.query

    dispatch('tv/init', query.tv)
    dispatch('dashboards/init', query.dashboards)
  },

  set_query_string({ getters }) {
    const tv = getters['tv/query_string']
    const dashboards = getters['dashboards/query_string']

    this.$router.replace({ path: '/', query: { tv, dashboards } })
  }
}
