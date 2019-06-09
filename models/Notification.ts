import Model from "./Model";

export default class Notification extends Model {
    message: string
    type: string

    constructor(message: string, type: string) {
        super()
        this.message = message
        this.type = type
    }
}