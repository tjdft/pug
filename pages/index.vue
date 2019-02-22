<template>
  <v-content>
    <v-layout v-if="$store.state.tv_view === 'all'" row wrap>
      <v-flex v-for="dashboard in dashboards" :key="dashboard" xs12>
        <dashboard :type="dashboard" class="mb-5" />
      </v-flex>
    </v-layout>

    <v-layout v-if="$store.state.tv_view === 'carousel'">
      <v-item-group

        v-show="!$store.state.tv_mode && $vuetify.breakpoint.lgAndUp"
        v-model="window"
        class="shrink mr-4"
        mandatory
        tag="v-flex"
      >
        <v-item v-for="dashboard in dashboards" :key="dashboard">
          <div slot-scope="{ active, toggle }">
            <v-btn :input-value="active" icon class="mt-0" @click="toggle">
              <v-icon>fiber_manual_record</v-icon>
            </v-btn>
          </div>
        </v-item>      
      </v-item-group>
      <v-flex>
        <v-window v-model="window">
          <v-window-item v-for="dashboard in dashboards" :key="dashboard">
            <dashboard :type="dashboard" />
          </v-window-item>        
        </v-window>
      </v-flex>
    </v-layout>   
  </v-content>
</template>

<script>
// COMPONENTS
import Dashboard from '@/dashboards/dashboard'

export default {
  components: { Dashboard },
  data() {
    return {
      window: 0
    }
  },
  computed: {
    dashboards() {
      return this.$store.state.tv_dashboards
    }
  },
  mounted() {
    setInterval(() => {
      if (this.$store.state.tv_mode) {
        this.next()
      }
    }, this.$env.TV_TRANSITION_INTERVAL)
  },
  methods: {
    next() {
      this.window++
    }
  }
}
</script>
