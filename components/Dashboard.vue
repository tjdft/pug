<template>
  <v-container fluid grid-list-xl class="pt-0">
    <v-layout row wrap>
      <v-flex md6 xs12 v-for="project in workspace.projects" :key="project.id">
        <project-card :project="project"/>
      </v-flex>
      <v-flex xs12 text-xs-center class="pt-5 mt-5" v-if="workspace.projects.length === 0">
        <h1>No projects found ...</h1>
      </v-flex>
      <!-- TODO mover rodapé pra cá e usar alinhamento do grid bottom (align-end ?) -->
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Project from "~/models/Project";
import Workspace from "~/models/Workspace";

import _ from "lodash";

@Component({
  components: {
    ProjectCard: () => import("~/components/ProjectCard.vue")
  }
})
export default class Dashboard extends Vue {
  @Prop({ type: Workspace, required: true }) workspace?: Workspace;

  async mounted() {
    // try {
    //   const response = await this.$axios.$get(`/api/workspaces`);
    //   let projects: Array<any> = [];
    //   _(response).forEach(item => {
    //     let project = new Project(item);
    //     project.config = item.config;
    //     projects.push(project);
    //   });
    //   this.projects = _(projects)
    //     .sortBy("name")
    //     .value();
    // } catch (error) {
    //   console.log(`Error on fetching projects: ${error.message}`);
    // }
  }
}
</script>

