import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

const config = {}

Vue.use(Vuetify, config)

export default ({ app }) => {
    app.vuetify = new Vuetify(config)
}  