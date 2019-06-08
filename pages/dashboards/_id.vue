<template>
  <div>
    <dashboard-view
      v-if="selectedDashboard.name"
      :dashboard="selectedDashboard"
    />
    <div v-else class="mt-5 pt-5 text-xs-center">
      <h1 v-if="!loading">
        Dashboard not found<br />
        <strong>{{ $route.params.id }}</strong>
      </h1>
      <h1 v-else>Loading ...</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Dashboard from "~/models/Dashboard";
import Project from "~/models/Project";

import _ from "lodash";

@Component({
  components: {
    DashboardView: () => import("~/components/DashboardView.vue")
  }
})
export default class IndexPage extends Vue {
  selectedDashboard: Dashboard = new Dashboard();
  loading: boolean = true

  async mounted() {
    const dashboard = this.$route.params.id || null;

    if (dashboard === null) {
      return;
    }

    try {
      const response = await this.$axios.$get(`/api/dashboards/${dashboard}`);

      this.selectedDashboard = new Dashboard(response.name);

      response.projects.forEach(item => {
        const project = new Project(item);
        project.config = item.config;
        this.selectedDashboard.projects.push(project);
      });
    } catch (error) {
      console.log(error.message)
    }

    this.loading = false
  }
}
</script>

