<template>
  <v-container fluid grid-list-xl class="pt-0">
    <v-layout row wrap>
      <v-flex md6 xs12 v-for="project in projects" :key="project.name">
        <project-card :project="project" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Project from "@/models/Project";

@Component({
  components: {
    ProjectCard: () => import("@/components/ProjectCard.vue")
  }
})
export default class Dashboard extends Vue {
  projects: Array<Project> = [];

  mounted() {
    this.projects = [
      new Project("digitometro-api"),
      new Project("digitometro-web")
    ];
  }
}
</script>

