import Model from '@/models/Model'
import SonarProject from '@/models/SonarProject'
import SentryProject from '@/models/SentryProject'
import SmaxProject from '@/models/SmaxProject'

export default class Project extends Model {
    id: number | null = null
    name: string = ''
    sonar: SonarProject
    smax: SmaxProject
    sentry: SentryProject

    constructor(...attributes) {
        super(...attributes)
        Object.assign(this, ...attributes)

        this.sonar = new SonarProject()
        this.smax = new SmaxProject()
        this.sentry = new SentryProject()
    }

    public resource() {
        return 'projects'
    }

    sonarMetrics() {
        return this.hasMany(SonarProject)
    }

    sentryMetrics() {
        return this.hasMany(SentryProject)
    }

    smaxMetrics() {
        return this.hasMany(SmaxProject)
    }

    public fetchMetrics() {
        this.sonar = this.sonarMetrics().get()
        this.smax = this.smaxMetrics().get()
        this.sentry = this.sentryMetrics().get()
    }
}