<template>
  <v-card flat>
    <v-card-title> {{ project.name }} </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs3>
          <smax-bugs :bugs="project.smax.bugs" />
        </v-flex>
        <v-flex xs3>
          <sentry-issues :issues="project.sentry.issues" />
        </v-flex>
        <v-flex xs3>
          <sonar-issues :issues="project.sonar.issues" />
        </v-flex>
        <v-flex xs3>
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

  }
}
</script>

