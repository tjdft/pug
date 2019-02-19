import Model from '@/models/Model'

export default class Project extends Model {
  issues = null

  static all() {
    return this.$axios
      .$get(`/sentry/api/0/organizations/sentry/`)
      .then(response => {
        return response.projects.map(project => {
          const p = new this(project)

          p._issues().then(response => {
            p.issues = response
          })

          return p
        })
      })
  }

  /**
   *  Total project's issues
   */
  _issues() {
    return this.$axios
      .get(
        `/sentry/api/0/projects/sentry/${
          this.slug
        }/issues/?query=is:unresolved+level:error&limit=1&statsPeriod=14d`
      )
      .then(response => {
        return response.headers['x-hits']
      })
  }

  /**
   *  Project has unsolved issues
   */
  hasUnsolvedIssues() {
    return !!this.issues
  }
}
