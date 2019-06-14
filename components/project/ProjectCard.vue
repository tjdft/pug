<template>
  <v-card flat color="transparent" class="pb-1 px-2">
    <v-card-title class="pl-0">
      <h2>
        <strong>{{ project.name }}</strong>
      </h2>
    </v-card-title>
    <v-card-text class="text-xs-center pt-3 mt-3">
      <v-layout row wrap class="project-metrics">
        <v-flex class="pa-0">
          <smax-bugs :bugs="project.metrics.smax.bugs"/>
        </v-flex>
        <v-flex class="pa-0">
          <smax-issues :issues="project.metrics.smax.issues"/>
        </v-flex>
        <v-flex class="pa-0">
          <sentry-issues :issues="project.metrics.sentry.issues"/>
        </v-flex>
        <v-flex class="pa-0">
          <sonar-issues :issues="project.metrics.sonar.issues"/>
        </v-flex>
        <v-flex class="pa-0">
          <sonar-coverage :coverage="project.metrics.sonar.coverage"/>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import Project from "~/models/Project";
import Notification from "~/models/Notification";

@Component({
  components: {
    SonarIssues: () =>
      import("~/components/project/metrics/sonar/SonarIssues.vue"),
    SonarCoverage: () =>
      import("~/components/project/metrics/sonar/SonarCoverage.vue"),
    SentryIssues: () =>
      import("~/components/project/metrics/sentry/SentryIssues.vue"),
    SmaxBugs: () => import("~/components/project/metrics/smax/SmaxBugs.vue"),
    SmaxIssues: () => import("~/components/project/metrics/smax/SmaxIssues.vue")
  }
})
export default class ProjectCard extends Vue {
  @Prop() project!: Project;
  pooling: any;

  mounted() {
    let refreshInterval: any = process.env["REFRESH_INTERVAL"] || 20000;

    this.project.metrics.fetch();

    this.pooling = setInterval(() => {
      this.project.metrics.fetch();
    }, refreshInterval);
  }

  @Watch("project.metrics.smax.bugs", { deep: true })
  watchBugs(newVal, oldVal) {
    if (oldVal === null || newVal <= oldVal || newVal === 0) {
      return;
    }

    let notification = new Notification(
      `${this.project.name} has a new bug!`,
      "bug"
    );
    this.$emit("newNotification", notification);
  }

  @Watch("project.metrics.smax.issues", { deep: true })
  watchIssues(newVal, oldVal) {
    if (oldVal === null || newVal <= oldVal || newVal === 0) {
      return;
    }

    let notification = new Notification(
      `${this.project.name} has a new issue!`,
      "issue"
    );
    this.$emit("newNotification", notification);
  }

  beforeDestroy() {
    clearInterval(this.pooling);
  }
}
</script>

