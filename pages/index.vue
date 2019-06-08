<template>
  <div class="text-xs-center mt-5 pt-5">
    <div v-for="dashboard in dashboards" :key="dashboard.name" class="ma-4">
      <v-btn
        large
        outlined
        @click="$router.push(`/dashboards/${dashboard.name}`)"
      >
        <h2>
          <strong>
            <v-icon large left color="info">bar_chart</v-icon>
            {{ dashboard.name }}
          </strong>
        </h2>
      </v-btn>
    </div>
    <div v-if="dashboards.lenght === 0">
      <h2>No Dashboards found ...</h2>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Dashboard from "~/models/Dashboard";

@Component
export default class IndexPage extends Vue {
  dashboards: Array<Dashboard> = [];

  async mounted() {
    this.dashboards = await this.$axios.$get("/api/dashboards");
  }
}
</script>

