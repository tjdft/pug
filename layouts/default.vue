<template>
  <v-app dark>
    <v-content>
      <v-container fill-height fluid class="pa-0">
        <v-layout child-flex>
          <!-- render pages -->
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="transparent" fixed class=" pb-3 pl-4 grey--text">
      <span class="title pr-3">
        <v-icon class="grey--text" medium>bug_report</v-icon> Smax bugs
      </span>
      <span class="title pr-3">
        <v-icon class="grey--text" medium>warning</v-icon> Sentry issues
      </span>
      <span class="title pr-3">
        <v-icon class="grey--text" medium>track_changes</v-icon> Sonar issues
      </span>
      <span class="title pr-3">
        <v-icon class="grey--text" medium>favorite</v-icon> Test coverage
      </span>
      <v-spacer />
      <v-btn
        flat
        icon
        large
        @click="$router.push('settings')"
        class="grey--text"
      >
        <v-icon class="grey--text">settings</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>
