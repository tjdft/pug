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

    public get totalIssues() {
        let total: number | null = null

        this.projects.forEach(project => {
            total = project.metrics.smax.issues === null ? total : (total || 0) + project.metrics.smax.issues
        })

        return total
    }

    public get totalFeatures() {
        let total: number | null = null

        this.projects.forEach(project => {
            total = project.metrics.smax.features === null ? total : (total || 0) + project.metrics.smax.features
        })

        return total
    }
}