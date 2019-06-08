<template>
  <v-toolbar app flat color="#353535" class=" pr-0">
    <v-toolbar-title class="pr-5">
      <v-icon left color="info">bar_chart</v-icon>
      <small>
        <strong>{{ dashboard.name }}</strong>
      </small>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn large icon color="grey darken-2" @click="$router.push('/')">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn large icon color="grey darken-2" class="mr-3">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn depressed disabled>
        <strong>
          BACKLOG
        </strong>
      </v-btn>
      <smax-issues :issues="dashboard.totalIssues" class="px-3" />
      <smax-features :features="dashboard.totalFeatures" class="px-3" />
    </v-toolbar-items>
  </v-toolbar>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Dashboard from "~/models/Dashboard";
import _ from 'lodash';

@Component({
  components: {
    SonarIssues: () => import("~/components/project/metrics/sonar/SonarIssues.vue"),
    SonarCoverage: () => import("~/components/project/metrics/sonar/SonarCoverage.vue"),
    SentryIssues: () => import("~/components/project/metrics/sentry/SentryIssues.vue"),
    SmaxIssues: () => import("~/components/project/metrics/smax/SmaxIssues.vue"),
    SmaxFeatures: () => import("~/components/project/metrics/smax/SmaxFeatures.vue")
  }
})
export default class DashboardSummary extends Vue {
  @Prop() dashboard!: Dashboard
}
</script>
