<template>
  <v-app>
    <!-- toolbar -->
    <v-toolbar v-if="showToolbar" color="white" flat dense>
      <!-- toolbar title -->
      <v-toolbar-title>
        <img src="~static/pug.png" height="30" title="pug" style="vertical-align: bottom">
        <strong>PUG</strong>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>        
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          left
          offset-x
        >
          <v-btn slot="activator" icon>
            <v-icon>settings</v-icon>
          </v-btn>
          <v-card>
            <v-card-text>              
              <v-select
                :items="$store.state.options.dashboards"
                :value="$store.state.tv_dashboards"
                prepend-icon="dashboard"
                hint="Dashboards to be displayed"
                persistent-hint
                multiple
                @change="setTvDashboards"
              />

              <v-select
                :items="$store.state.options.views"
                :value="$store.state.tv_view"
                prepend-icon="view_carousel"
                hint="View mode"
                persistent-hint                
                @change="setTvView"
              />
              <v-switch
                :input-value="!!$store.state.tv_mode"
                hint="Full screen mode"
                persistent-hint
                prepend-icon="live_tv"
                @change="setTvMode"
              />
            </v-card-text>           
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <!-- content -->
    <v-content class="grey lighten-3">
      <v-container fill-height fluid>
        <v-layout child-flex>
          <!-- render pages -->
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
    <v-footer fixed color="transparent" class="pb-4 pr-4">
      <v-layout>
        <v-flex text-xs-right>
          <v-icon style="font-size: 20px;">
            explore
          </v-icon> <strong>TJDFT</strong> LABS
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      mouse_moved_at: new Date(),
      showToolbar: !this.$store.state.tv_mode
    }
  },
  mounted() {
    window.addEventListener('mousemove', () => {
      this.showToolbar = true
      setTimeout(() => {
        const now = this.$moment()
        const movedAt = this.$moment(this.mouse_moved_at)

        if (now.diff(movedAt) > 3000 && this.$store.state.tv_mode) {
          this.showToolbar = false
        }
      }, 3000)

      this.mouse_moved_at = new Date()
    })
  },
  methods: {
    setTvMode(mode) {
      let message

      if (mode) {
        message = '"TV MODE" ON: Panels will switch automatically'
        this.showToolbar = false
      } else {
        message = '"TV MODE" OFF: Panels will not switch automatically'
      }

      if (this.$store.state.tv_view === 'carousel') {
        this.$toast.show(message)
      }

      this.$store.dispatch('set_tv_mode', mode)
    },
    setTvDashboards(value) {
      this.$store.dispatch('set_tv_dashboards', value)
    },
    setTvView(value) {
      this.$store.dispatch('set_tv_view', value)
    }
  }
}
</script>
