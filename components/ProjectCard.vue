<template>
  <v-card flat color="transparent" class="pb-1 px-2">
    <v-card-title class="pl-0">
      <h2>
        <strong>{{ project.name }}</strong>
      </h2>
    </v-card-title>
    <v-card-text class="text-xs-center pt-3 mt-3">
      <v-layout row wrap>
        <v-flex xs3 class="pa-0">
          <smax-issues :issues="project.metrics.smax.issues"/>
        </v-flex>
        <v-flex xs3 class="pa-0">
          <sentry-issues :issues="project.metrics.sentry.issues"/>
        </v-flex>
        <v-flex xs3 class="pa-0">
          <sonar-issues :issues="project.metrics.sonar.issues"/>
        </v-flex>
        <v-flex xs3 class="pa-0">
          <sonar-coverage :coverage="project.metrics.sonar.coverage"/>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Project from "~/models/Project";

@Component({
  components: {
    SonarIssues: () => import("~/components/sonar/SonarIssues.vue"),
    SonarCoverage: () => import("~/components/sonar/SonarCoverage.vue"),
    SentryIssues: () => import("~/components/sentry/SentryIssues.vue"),
    SmaxIssues: () => import("~/components/smax/SmaxIssues.vue")
  }
})
export default class ProjectCard extends Vue {
  @Prop({ type: Project, required: true }) project!: Project;

  mounted() {
    let refreshInterval: any = process.env["REFRESH_INTERVAL"] || 20000;

    this.project.metrics.fetch();

    setInterval(() => {
      this.project.metrics.fetch();
    }, refreshInterval);
  }
}
</script>

