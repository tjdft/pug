import Model from "./Model";
import Project from "./Project";

export default class Workspace extends Model {
    name: string
    projects: Array<Project>

    constructor(name: string = '', projects: Array<Project> = []) {
        super()
        this.name = name
        this.projects = projects
    }
}