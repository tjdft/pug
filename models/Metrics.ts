import Sonar from "~/models/Sonar";
import Smax from "~/models/Smax";
import Sentry from "~/models/Sentry";
import Project from "@/models/Project";
import Model from "@/models/Model";

export default class Metrics extends Model {
    project: Project
    sonar: Sonar
    smax: Smax
    sentry: Sentry

    constructor(project: Project) {
        super()
        this.project = project
        this.sonar = new Sonar()
        this.smax = new Smax()
        this.sentry = new Sentry()
    }

    public fetch() {
        this.sonar = this.custom(`${this.project.id}/sonar`).get()
        this.smax = this.custom(`${this.project.id}/smax`).get()
        this.sentry = this.custom(`${this.project.id}/sentry`).get()
    }
}