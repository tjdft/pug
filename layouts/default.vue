<template>
  <v-app>
    <!-- toolbar -->
    <v-toolbar v-if="showToolbar" color="white" flat dense>
      <!-- toolbar title -->
      <v-toolbar-title>
        <img src="pug.png" height="30" title="pug" style="vertical-align: bottom">
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
              <v-switch :input-value="!!$store.state.tv_mode" hint="Full screen mode" persistent-hint prepend-icon="live_tv" @change="toggle" />
              <v-select
                :items="$store.state.options.dashboards"
                :value="$store.state.tv_dashboards"
                prepend-icon="dashboard"
                hint="Panels to be displayed"
                persistent-hint
                multiple
                @change="setDashboards"
              />

              <v-select
                :items="$store.state.options.layouts"
                :value="$store.state.tv_layout"
                prepend-icon="view_carousel"
                hint="Main layout"
                persistent-hint                
                @change="setLayout"
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
    <v-footer class="grey lighten-3 pa-4">
      <v-layout>
        <v-flex text-xs-right>
          <strong>TJDFT</strong> LABS
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
    toggle(stat) {
      if (stat) {
        this.$toast.show('"TV MODE" ON: Panels will switch automatically')
        this.showToolbar = false
      } else {
        this.$toast.show('"TV MODE" OFF: Panels will not switch automatically')
      }

      this.$store.dispatch('set_tv_mode', stat)
    },
    setDashboards(value) {
      this.$store.dispatch('set_tv_dashboards', value)
    },
    setLayout(value) {
      this.$store.dispatch('set_tv_layout', value)
    }
  }
}
</script>
