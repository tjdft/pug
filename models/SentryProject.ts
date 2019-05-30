import Model from '@/models/Model'

export default class SentryProject extends Model {
    name: string = ''
    issues: number | null = null

    fetchMetrics(): void {
        this.issues = 8
    }

    resource() {
        return 'sentry'
    }
}