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
    <v-footer color="transparent" class=" pb-3 pl-4 grey--text">
      <span class="title pr-3">
        <v-icon class="grey--text" medium>bug_report</v-icon> Smax issues
      </span>
      <span class="title pr-3">
        <v-icon class="grey--text" medium>toys</v-icon> Smax features
      </span>
      <span class="title pr-3">
        <v-icon class="grey--text" left medium>error</v-icon>Sentry issues
      </span>
      <span class="title pr-3">
        <v-icon class="grey--text" left medium>track_changes</v-icon>Sonar
        issues
      </span>
      <span class="title pr-3">
        <v-icon class="grey--text" left medium>favorite</v-icon>Test coverage
      </span>
      <v-spacer />
      <v-icon left small class="grey--text">explore</v-icon>
      <small><strong>TJDFT</strong>&nbsp; LABS</small>
    </v-footer>
  </v-app>
</template>
