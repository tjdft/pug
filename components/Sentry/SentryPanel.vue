<template>
  <v-content>
    <v-layout row wrap>
      <v-flex>
        <img src="sentry.png" height="32" class="mb-3">
      </v-flex>
      <v-flex v-if="!$store.state.tv_mode && projects.length > 0" text-xs-right lg2>
        <v-text-field
          v-model="searchTerm"
          label="search"
          hide-details
          prepend-inner-icon="search"
          class="mt-0 pt-0 mb-3"
        />
      </v-flex>
    </v-layout>
    <v-container fluid grid-list-md class="pa-0">
      <v-alert type="error" :value="error" class="mb-4">
        {{ error }}
      </v-alert>
      <v-layout row wrap>
        <v-flex v-for="project in projectList" :key="project.id" lg3 xs12>
          <sentry-app-card :project="project" />
        </v-flex>
      </v-layout>
      <v-progress-linear v-if="projectList.length === 0 && !searchTerm && !error" indeterminate />
      <div v-if="projectList.length === 0 && searchTerm" class="display-1 ma-5 text-xs-center">
        Nothing here.
      </div>
    </v-container>
    <div class="pt-5">
      <v-btn class="ml-0" small flat @click="refresh()">
        <v-icon left small>
          refresh
        </v-icon>
        <small>{{ $moment(last_update).format('DD/MM/YYYY HH:mm:ss') }}</small>
      </v-btn>
      <small class="success--text pr-2">
        <strong>all fine</strong>
      </small>
      <small class="error--text pr-2">
        <strong>has unsolved issues</strong>
      </small>
    </div>
  </v-content>
</template>

<script>
// MODELS
import Project from '@/models/sentry/Project'

// COMPONENTS
import SentryAppCard from '@/components/Sentry/SentryAppCard'

export default {
  components: { SentryAppCard },
  data() {
    return {
      projects: [],
      error: null,
      last_update: new Date(),
      searchTerm: '',
      retries: 0
    }
  },
  computed: {
    projectList() {
      return this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  },
  mounted() {
    this.refresh()

    setInterval(() => {
      this.refresh()
    }, process.env.SENTRY_REFRESH_INTERVAL)
  },
  methods: {
    async refresh() {
      try {
        this.error = ''
        this.projects = await Project.all()
        this.last_update = new Date()
      } catch (error) {
        console.log(error)

        let msg = error.response ? error.response.data : error.message
        msg += `. Retrying again in ${process.env.SENTRY_REFRESH_INTERVAL /
          1000} seconds (failed retries: ${++this.retries}).`

        this.error = msg
      }
    }
  }
}
</script>
