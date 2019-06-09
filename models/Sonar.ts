import _ from 'lodash'
import Model from '~/models/Model'
import Project from '~/models/Project';

export default class Sonar extends Model {
    issues: number | null = null
    coverage: number | null = null
    project: Project

    constructor(project: Project) {
        super();
        this.project = project;
    }

    fetch() {
        if (!this.project.config.sonar) {
            return
        }

        const projectKeys = this.project.config.sonar.join(',')
        const metricKeys = 'code_smells,coverage,vulnerabilities,bugs'

        this.$axios.$get(`/api/sonar/measures/search?projectKeys=${projectKeys}&metricKeys=${metricKeys}`).then(result => {

            const code_smells = this.sumByMetric(result.measures, 'code_smells')
            const coverage = this.sumByMetric(result.measures, 'coverage')
            const vulnerabilities = this.sumByMetric(result.measures, 'vulnerabilities')
            const bugs = this.sumByMetric(result.measures, 'bugs')
            const totalConfigs = this.project.config.sonar.length || 1

            this.coverage = Math.floor(coverage / totalConfigs)
            this.issues = code_smells + bugs + vulnerabilities
        }).catch(e => {
            throw new Error(`Failed on fetching Sonar metrics (${e.message})`)
        })
    }

    private sumByMetric(items: Array<any>, metric: string) {
        return _(items)
            .filter({ metric })
            .sumBy((item) => parseInt(item.value))
    }
}