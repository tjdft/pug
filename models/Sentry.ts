import Model from '@/models/Model'
import Project from '@/models/Project';

export default class Sentry extends Model {
    name: string = ''
    issues: number | null = null
    project: Project

    constructor(project: Project) {
        super();
        this.project = project;
    }
    fetch() {
        console.log(this.project)
        if (!this.project.config.sentry) {
            return 
        }

        this.project.config.sentry.forEach(projectID => {
            this.$axios.get(`/sentry/api/0/projects/sentry/${projectID}/issues/?query=is:unresolved&limit=1`).then(result => {
                const total = parseInt(result.headers['x-hits'])
                this.issues = this.issues === null ? total : this.issues + total

            }).catch(e => {
                throw new Error(`Failed on fetching Sonar metrics (${e.message})`)
            })
        });
    }
}