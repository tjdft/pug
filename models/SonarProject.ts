export default class SonarProject{
    issues: Number
    quality: Number

    constructor(issues: Number, quality: Number)
    {
        this.issues = issues
        this.quality = quality
    }
}