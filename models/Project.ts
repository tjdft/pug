import Model from '@/models/Model'
import Metrics from '@/models/Metrics';

export default class Project extends Model {
    id: number | null = null
    name: string = ''
    metrics: Metrics

    constructor(...attributes: any[]) {
        super(...attributes)
        Object.assign(this, ...attributes)

        this.metrics = new Metrics(this)
    }

    public resource() {
        return 'projects'
    }

    public fetchMetrics() {
        this.metrics.fetch()
    }
}