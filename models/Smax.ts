import Model from '~/models/Model'
import Project from '~/models/Project';

export default class Smax extends Model {
    bugs: number | null = null
    issues: number | null = null
    project: Project

    constructor(project: Project) {
        super();
        this.project = project;
    }

    fetch() {
        if (!this.project.config.smax) {
            return
        }

        const groups = this.project.config.smax.groups.join(',')
        const services = this.project.config.smax.services.join(',')
        const bugs = this.project.config.smax.bugs

        this.$axios.get(`/api/smax/rest/ems/Request?filter=(RegisteredForActualService in (${services}) and Active = true and  (ExpertGroup in (${groups})))&layout=Id,Category`)
            .then(response => {
                this.bugs = response.data.entities.filter(entity => bugs.includes(parseInt(entity.properties.Category))).length
                this.issues = response.data.entities.filter(entity => !bugs.includes(parseInt(entity.properties.Category))).length
            }).catch(e => {
                throw new Error(`Failed on fetching Smax metrics (${e.message})`)
            })
    }
}