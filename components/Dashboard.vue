<template>
  <v-container fluid grid-list-xl class="pt-0">
    <v-layout row wrap>
      <v-flex md6 xs12 v-for="project in projects" :key="project.id">
        <project-card :project="project" />
      </v-flex>
      <v-flex
        xs12
        text-xs-center
        class="pt-5 mt-5"
        v-if="projects.length === 0 && !loading"
      >
        <h1>No projects found ...</h1>
      </v-flex>
      <!-- TODO mover rodapé pra cá e usar alinhamento do grid bottom (align-end ?) -->
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Project from "~/models/Project";

import _ from 'lodash'
import pug from '~/pug.json'

@Component({
  components: {
    ProjectCard: () => import("~/components/ProjectCard.vue")
  }
})
export default class Dashboard extends Vue {
  projects: Array<Project> = [];
  loading: boolean = true;

  async mounted() {

    try {
      _(pug.projects).forEach((item) => {
        let project = new Project(item)
        project.config = item.config
        this.projects.push(project)
      })

      this.projects = _(this.projects)
        .sortBy('name')
        .value()

    } catch (error) {
      console.log(`Error on fetching projects: ${error.message}`)
    }

    this.loading = false

  }
}
</script>

