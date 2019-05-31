<template>
  <v-container fluid grid-list-xl class="pt-0">
    <v-layout row wrap>
      <v-flex md6 xs12 v-for="project in projects" :key="project.id">
        <project-card :project="project" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Project from "@/models/Project";
import pug from '~/pug.json'

@Component({
  components: {
    ProjectCard: () => import("@/components/ProjectCard.vue")
  }
})
export default class Dashboard extends Vue {
  projects: Array<Project> = [];

  async mounted() {
    let project

    pug.projects.forEach(item => {
      project = new Project(item)
      project.config = item.config
      this.projects.push(project)
    });
  }
}
</script>

