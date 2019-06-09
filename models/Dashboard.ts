import Model from "./Model";
import Project from "./Project";

export default class Dashboard extends Model {
    name: string
    projects: Array<Project>

    constructor(name: string = '', projects: Array<Project> = []) {
        super()
        this.name = name
        this.projects = projects
    }

    public totalOf(type: string, metric: string) {
        let total: number | null = null

        this.projects.forEach(project => {
            total = project.metrics[type][metric] === null ? total : (total || 0) + project.metrics[type][metric]
        })

        return total
    }
}