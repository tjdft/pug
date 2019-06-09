import Sonar from "~/models/Sonar";
import Smax from "~/models/Smax";
import Sentry from "~/models/Sentry";
import Project from "~/models/Project";
import Model from "~/models/Model";

export default class Metrics extends Model {
    project!: Project
    sonar: Sonar
    smax: Smax
    sentry: Sentry

    constructor(project: Project) {
        super()
        this.project = project
        this.sonar = new Sonar(project)
        this.smax = new Smax(project)
        this.sentry = new Sentry(project)
    }

    public fetch() {
        this.sonar.fetch()
        this.sentry.fetch()
        this.smax.fetch()
    }
}