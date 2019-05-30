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

    // public static all(): Array<Project>
    // {
      
    // }

    public fetchMetrics() {
        this.sonar.fetchMetrics()
        this.sentry.fetchMetrics()
        this.smax.fetchMetrics()
    }
}