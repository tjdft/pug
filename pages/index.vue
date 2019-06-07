<template>
  <div>
    <div v-for="workspace in workspaces" :key="workspace.name">
      <v-btn @click="$router.push(`/workspaces/${workspace.name}`)">{{ workspace.name }}</v-btn>
    </div>
    <div v-if="workspaces.lenght === 0">
      <h2>No Workspaces found ...</h2>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Workspace from "~/models/Workspace";

@Component
export default class IndexPage extends Vue {
  workspaces: Array<Workspace> = [];

  async mounted() {
    this.workspaces = await this.$axios.$get("/api/workspaces");
  }
}
</script>

