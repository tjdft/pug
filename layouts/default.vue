<template>
  <v-app dark>
    <v-content>
      <v-container fill-height fluid class="pa-0">
        <v-layout child-flex>
          <!-- render pages -->
          <nuxt/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="transparent" class="grey--text">
      <v-layout row wrap>
        <v-flex>
          <span class="title pr-3">
            <v-icon class="grey--text" medium left>bug_report</v-icon>Smax bugs
          </span>
          <span class="title pr-3">
            <v-icon class="grey--text" medium left>toys</v-icon>Smax issues
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
        </v-flex>
        <v-flex text-xs-right>
          <span>
            <v-icon left small class="grey--text">explore</v-icon>
            <small>
              <strong>TJDFT</strong>&nbsp; LABS
            </small>
          </span>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>
