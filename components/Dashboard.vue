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
    let p1 = new Project({ id: 1, name: "digitômetro" })
    // p1.config.push(new Config({ sonarID: 'digitometro-api' }))
    // p1.config.push(new Config({ sonarID: 'digitometro-web' }))
    console.log(p1)

    let p2 = new Project({ id: 2, name: "ceman" })
    // p1.config.push(new Config({ sonarID: 'ceman-api' }))
    // p1.config.push(new Config({ sonarID: 'ceman-web' }))

    let p3 = new Project({ id: 3, name: "bnmp2" })
    // p1.config.push(new Config({ sonarID: 'bnmp2' }))

    this.projects = [
      p1,
      p2,
      p3
    ];
  }
}
</script>

