<template>
  <v-card flat color="transparent" class="pa-3">
    <v-card-title class="pl-0">
      <h2>{{ project.name }}</h2>
    </v-card-title>
    <v-card-text class="text-xs-center pt-3 mt-3">
      <v-layout row wrap>
        <v-flex xs3 class="pa-0">
          <smax-bugs :bugs="project.smax.bugs" />
        </v-flex>
        <v-flex xs3 class="pa-0">
          <sentry-issues :issues="project.sentry.issues" />
        </v-flex>
        <v-flex xs3 class="pa-0">
          <sonar-issues :issues="project.sonar.issues" />
        </v-flex>
        <v-flex xs3 class="pa-0">
          <sonar-quality :quality="project.sonar.quality" />
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Project from "@/models/Project";

@Component({
  components: {
    SonarIssues: () => import("@/components/sonar/SonarIssues.vue"),
    SonarQuality: () => import("@/components/sonar/SonarQuality.vue"),
    SentryIssues: () => import("@/components/sentry/SentryIssues.vue"),
    SmaxBugs: () => import("@/components/smax/SmaxBugs.vue")
  }
})
export default class ProjectCard extends Vue {
  @Prop({ type: Project, required: true }) project

  mounted() {
    this.project.fetchMetrics()
  }
}
</script>

