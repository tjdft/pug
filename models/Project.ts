import Model from '~/models/Model'
import Metrics from '~/models/Metrics';
import Config from '~/models/Config';

export default class Project extends Model {
    id: number | null = null
    name: string = ''
    config: Config
    metrics: Metrics

    constructor(...attributes: any[]) {
        super()
        Object.assign(this, ...attributes)

        this.metrics = new Metrics(this)
        this.config = new Config()
    }
}