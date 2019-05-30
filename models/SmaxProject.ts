import Model from '@/models/Model'
import MetricInterface from "@/models/MetricInterface";

export default class SmaxProject extends Model implements MetricInterface {
    name: string = ''
    bugs: number | null = null

    fetchMetrics(): void {
        this.bugs = 3
    }
}