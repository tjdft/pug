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
        <v-switch :input-value="!!$store.state.tv_mode" label="tv" class="pa-2" @change="toggle()" />
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
      last_update: new Date(),
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
    toggle() {
      if (this.$store.state.tv_mode) {
        this.$toast.show('"TV MODE" OFF: Panels will not switch automatically')
      } else {
        this.showToolbar = false
        this.$toast.show('"TV MODE" ON: Panels will switch automatically')
      }

      this.$store.dispatch('toogle_tv_mode')
    }
  }
}
</script>
