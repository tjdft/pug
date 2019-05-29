import SonarProject from '@/models/SonarProject'
import SentryProject from '@/models/SentryProject'
import SmaxProject from '@/models/SmaxProject'

export default class Project{
    name: String
    sonar: SonarProject
    smax: SmaxProject
    sentry: SentryProject

    constructor(name: String){
        this.name = name;
        this.sonar = new SonarProject(33, 12)
        this.smax = new SmaxProject(3)
        this.sentry = new SentryProject(88)
    }
}