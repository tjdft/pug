import Model from '@/models/Model'

export default class Sonar extends Model {
    name: string = ''
    issues: number | null = null
    quality: number | null = null
}