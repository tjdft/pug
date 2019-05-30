import Model from '@/models/Model'
import Project from '@/models/Project';

export default class Smax extends Model {
    name: string = ''
    bugs: number | null = null
    project: Project

    constructor(project: Project) {
        super();
        this.project = project;
    }

    fetch() {

    }
}