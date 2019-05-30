import Model from '@/models/Model'
import MetricInterface from "@/models/MetricInterface";

export default class SentryProject extends Model implements MetricInterface {
    name: string = ''
    issues: number | null = null

    fetchMetrics(): void {
        this.issues = 8
    }
}