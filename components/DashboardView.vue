<template>
  <v-container fluid grid-list-xl>
    <dashboard-summary :dashboard="dashboard" />
    <notification-popup :notifications="notifications" />
    <v-layout row wrap>
      <v-flex md6 xs12 v-for="project in dashboard.projects" :key="project.id">
        <project-card :project="project" @newNotification="notify" />
      </v-flex>
      <v-flex
        xs12
        text-xs-center
        class="pt-5 mt-5"
        v-if="dashboard.projects.length === 0"
      >
        <h1>
          No projects found for <br />
          <strong>{{ dashboard.name }}</strong>
        </h1>
      </v-flex>
      <!-- TODO mover rodapé pra cá e usar alinhamento do grid bottom (align-end ?) -->
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

import _ from "lodash";
import Project from "~/models/Project";
import Dashboard from "~/models/Dashboard";
import Notification from "~/models/Notification";

@Component({
  components: {
    DashboardSummary: () => import("~/components/DashboardSummary.vue"),
    ProjectCard: () => import("~/components/project/ProjectCard.vue"),
    NotificationPopup: () => import("~/components/notification/NotificationPopup.vue")
  }
})
export default class DashboardView extends Vue {
  @Prop() dashboard?: Dashboard;
  notifications: Array<Notification> = [];

  notify(notification: Notification) {
    this.notifications.push(notification)
  }
}
</script>

