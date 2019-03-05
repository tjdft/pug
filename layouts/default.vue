<template>
  <v-app>
    <!-- toolbar -->
    <v-toolbar v-show="showToolbar" color="white" flat dense>
      <!-- toolbar title -->
      <v-toolbar-title>
        <img src="~static/pug.png" height="30" title="pug" style="vertical-align: bottom">
        <strong>PUG</strong>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>      
        <v-btn flat @click="$store.dispatch('tv/toogle_editing')">
          <span v-if="!$store.state.tv.editing">
            <v-icon>
              dashboard
            </v-icon>
            layout 
          </span>
          <span v-else>
            <v-icon color="success">
              check
            </v-icon>
            apply
          </span>
        </v-btn>  
          
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
                :items="$store.getters['dashboards/list']"
                :value="$store.getters['dashboards/enabled']"
                prepend-icon="dashboard"
                hint="Dashboards to be displayed"
                persistent-hint
                multiple
                @change="setDashboards"
              />

              <v-switch
                :input-value="!!$store.state.tv.fullscreen"
                hint="Full screen mode"
                persistent-hint
                prepend-icon="live_tv"
                @change="setTvFullscreen"
              />
            </v-card-text>           
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <!-- content -->
    <v-content class="grey lighten-3">
      <v-container fill-height fluid class="px-0">
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
      showToolbar: !this.$store.state.tv.fullscreen
    }
  },
  mounted() {
    window.addEventListener('mousemove', () => {
      this.showToolbar = true
      setTimeout(() => {
        const now = this.$moment()
        const movedAt = this.$moment(this.mouse_moved_at)

        if (now.diff(movedAt) > 3000 && this.$store.state.tv.fullscreen) {
          this.showToolbar = false
        }
      }, 3000)

      this.mouse_moved_at = new Date()
    })
  },
  methods: {
    setTvFullscreen(mode) {
      this.showToolbar = mode

      this.$store.dispatch('tv/set_fullscreen', mode)
    },
    setDashboards(dashboards) {
      this.$store.dispatch('dashboards/toggle', dashboards)
    }
  }
}
</script>
