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
    <v-footer color="transparent" fixed class="footer pb-3 pl-4">
      <span> <v-icon>bug_report</v-icon> Smax bugs </span>
      <span> <v-icon>warning</v-icon> Sentry issues </span>
      <span> <v-icon>track_changes</v-icon> Sonar issues </span>
      <span> <v-icon>favorite</v-icon> Test coverage </span>
    </v-footer>
  </v-app>
</template>
