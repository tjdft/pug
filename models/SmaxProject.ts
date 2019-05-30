import Model from '@/models/Model'

export default class SmaxProject extends Model {
    name: string = ''
    bugs: number | null = null

    fetchMetrics(): void {
        this.bugs = 3
    }

    resource() {
        return 'smax'
    }
}