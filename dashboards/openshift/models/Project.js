import Model from '@/models/Model'

export default class Project extends Model {
  deploymentconfigs = []

  /**
   * List of all projects
   */
  static all() {
    return this.$axios.$get('openshift/oapi/v1/projects').then(response => {
      return response.items.map(project => {
        const p = new this(project)

        p._deploymentConfigs().then(response => {
          p.deploymentconfigs = response
        })

        return p
      })
    })
  }

  /**
   * Load project's deployment configs
   */
  _deploymentConfigs() {
    return this.$axios
      .$get(
        `openshift/oapi/v1/namespaces/${this.metadata.name}/deploymentconfigs`
      )
      .then(response => {
        return response.items
      })
  }

  /**
   * Check if project has deployment configs with "red" pods
   */
  hasSomethingDown() {
    return !!this.deploymentconfigs.find(
      deploymentconfig =>
        deploymentconfig.status.availableReplicas !==
        deploymentconfig.status.replicas
    )
  }

  /**
   * Check if project has deployment configs with "0" pods,  powered off pods
   */
  hasSomethingOff() {
    return !!this.deploymentconfigs.find(
      deploymentconfig => deploymentconfig.status.availableReplicas === 0
    )
  }
}
