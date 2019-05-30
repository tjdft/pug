import Model from '@/models/Model'

export default class SonarProject extends Model {
    name: string = ''
    issues: number | null = null
    quality: number | null = null

    resource() {
        return 'sonar'
    }
}