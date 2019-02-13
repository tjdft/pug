<template>
  <v-layout>
    <v-item-group
      v-show="!$store.state.tv_mode && $vuetify.breakpoint.lgAndUp"
      v-model="window"
      class="shrink mr-4"
      mandatory
      tag="v-flex"
    >
      <v-item>
        <div slot-scope="{ active, toggle }">
          <v-btn :input-value="active" icon class="mt-0" @click="toggle">
            <v-icon>fiber_manual_record</v-icon>
          </v-btn>
        </div>
      </v-item>
      <v-item>
        <div slot-scope="{ active, toggle }">
          <v-btn :input-value="active" icon class="mt-0" @click="toggle">
            <v-icon>fiber_manual_record</v-icon>
          </v-btn>
        </div>
      </v-item>
      <v-item>
        <div slot-scope="{ active, toggle }">
          <v-btn :input-value="active" icon class="mt-0" @click="toggle">
            <v-icon>fiber_manual_record</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group>
    <v-flex>
      <v-window v-model="window">
        <v-window-item>
          <sonar-panel />
        </v-window-item>
        <v-window-item>
          <sentry-panel />
        </v-window-item>
        <v-window-item>
          <openshift-panel />
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</template>

<script>
// COMPONENTS
import OpenshiftPanel from '@/components/Openshift/OpenshiftPanel'
import SonarPanel from '@/components/Sonar/SonarPanel'
import SentryPanel from '@/components/Sentry/SentryPanel'

export default {
  components: { OpenshiftPanel, SonarPanel, SentryPanel },
  data() {
    return {
      window: 0
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
