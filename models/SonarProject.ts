import Model from '@/models/Model'
import MetricInterface from "@/models/MetricInterface";

export default class SonarProject extends Model implements MetricInterface {
    name: string = ''
    issues: number | null = null
    quality: number | null = null

    fetchMetrics(): void {
        this.issues = 12
        this.quality = 87
    }
}