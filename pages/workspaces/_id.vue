<template>
  <div>
    <dashboard v-if="selectedWorkspace.name" :workspace="selectedWorkspace"/>
    <div v-else>
      <h2>Workspace {{ $route.params.workspace }} found ...</h2>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Workspace from "~/models/Workspace";
import Project from "~/models/Project";

import _ from "lodash";

@Component({
  components: {
    Dashboard: () => import("~/components/Dashboard.vue")
  }
})
export default class IndexPage extends Vue {
  selectedWorkspace: Workspace = new Workspace();

  async mounted() {
    const workspace = this.$route.params.id || null;

    if (workspace === null) {
      return;
    }

    const response = await this.$axios.$get(`/api/workspaces/${workspace}`);

    this.selectedWorkspace = new Workspace(response.name);

    response.projects.forEach(item => {
      const project = new Project(item);
      project.config = item.config;
      this.selectedWorkspace.projects.push(project);
    });
  }
}
</script>

