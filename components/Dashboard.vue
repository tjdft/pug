<template>
  <v-container fluid grid-list-xl class="pt-0">
    <v-layout row wrap>
      <v-flex md6 xs12 v-for="project in projects" :key="project.id">
        <project-card :project="project"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Project from "@/models/Project";
import Config from "@/models/Config";

@Component({
  components: {
    ProjectCard: () => import("@/components/ProjectCard.vue")
  }
})
export default class Dashboard extends Vue {
  projects: Array<Project> = [];

  async mounted() {
    // this.projects = await Project
    //   .where('preset', 1)
    //   .get()

    let p1 = new Project({ id: 1, name: "digitômetro" });
    p1.config.sonar.push("digitometro-web");
    p1.config.sonar.push("digitometro-api");
    p1.config.sentry.push("digitometro-api");

    console.log(p1);

    let p2 = new Project({ id: 2, name: "ceman" });
    p2.config.sonar.push("ceman-frontend");
    p2.config.sonar.push("br.jus.tjdft.sudes:ceman-service");
    p2.config.sentry.push("ceman-service");

    this.projects = [p1, p2];
  }
}
</script>

