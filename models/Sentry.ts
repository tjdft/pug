import Model from '~/models/Model'
import Project from '~/models/Project';

export default class Sentry extends Model {
    issues: number | null = null
    project: Project

    constructor(project: Project) {
        super();
        this.project = project;
    }
    fetch() {
        if (!this.project.config.sentry) {
            return
        }

        let rounds = 0;
        let total = 0;

        this.project.config.sentry.forEach(projectID => {
            this.$axios.get(`/api/sentry/api/0/projects/sentry/${projectID}/issues/?query=is:unresolved&limit=1`).then(result => {
                total += parseInt(result.headers['x-hits'])
                rounds++;

                if (this.project.config.sentry.length === rounds) {
                    this.issues = total
                }
            }).catch(e => {
                throw new Error(`Failed on fetching Sentry metrics (${e.message})`)
            })
        });
    }
}