import Model from '~/models/Model'
import Project from '~/models/Project';

export default class Smax extends Model {
    name: string = ''
    issues: number | null = null
    project: Project
    static cookie: string = ''

    constructor(project: Project) {
        super();
        this.project = project;
    }

    fetch() {
        if (!this.project.config.smax) {
            return
        }

        const groups = this.project.config.smax.groups.join(',')
        const service = this.project.config.smax.service

        this.$axios.get(`/api/smax/rest/${process.env.SMAX_TENANTID}/ems/Request?filter=(RegisteredForActualService = ${service} and Status != 'RequestStatusComplete' and Active = true and  (ExpertGroup in (${groups})))&layout=Id`)
            .then(response => {
                this.issues = response.data.meta.total_count
            }).catch(e => {
                throw new Error(`Failed on fetching Smax metrics (${e.message})`)
            })
    }
}