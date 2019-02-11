import Model from '@/models/Model'

export default class Project extends Model {
  metrics = {}

  static all() {
    return this.$axios
      .$get(
        '/sonar/components/search_projects?ps=100&facets=reliability_rating,security_rating,coverage,duplicated_lines_density,alert_status'
      )
      .then(response => {
        const projects = response.components.map(project => {
          return new this(project)
        })

        const projectKeys = projects.map(project => project.key).join()

        return Project._metrics(projectKeys).then(response => {
          return projects.map(project => {
            const metrics = response.measures.filter(
              metric => metric.component === project.key
            )

            const bugs = metrics.find(metric => metric.metric === 'bugs')
            project.metrics.bugs = bugs ? bugs.value : null

            const vulnerabilities = metrics.find(
              metric => metric.metric === 'vulnerabilities'
            )
            project.metrics.vulnerabilities = vulnerabilities
              ? vulnerabilities.value
              : null

            const codeSmells = metrics.find(
              metric => metric.metric === 'code_smells'
            )
            project.metrics.code_smells = codeSmells ? codeSmells.value : null

            const coverage = metrics.find(
              metric => metric.metric === 'coverage'
            )
            project.metrics.coverage = coverage ? coverage.value : null

            const duplications = metrics.find(
              metric => metric.metric === 'duplicated_lines_density'
            )
            project.metrics.duplications = duplications
              ? duplications.value
              : null

            return project
          })
        })
      })
  }

  static _metrics(projectKeys) {
    return this.$axios.$get(
      `sonar/measures/search?projectKeys=${projectKeys}&metricKeys=alert_status,bugs,reliability_rating,vulnerabilities,security_rating,code_smells,sqale_rating,duplicated_lines_density,coverage,ncloc,ncloc_language_distribution`
    )
  }
}
