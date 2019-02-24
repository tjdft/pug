<template>
  <v-content>
    <v-layout row wrap>
      <v-flex>
        <img src="sentry.svg" height="50">
      </v-flex>
      <v-flex v-if="!$store.state.tv_mode && projects.length > 0" lg3 xs12>
        <v-select
          :value="$store.state.tags.sentry"
          :items="tags"
          label="tags"
          prepend-inner-icon="label"
          class="mt-0 pt-0 mb-3 mr-2"
          clearable
          hide-details          
          multiple
          single-line
          @input="setTags"
        />
      </v-flex>
      <v-flex v-if="!$store.state.tv_mode && projects.length > 0" text-xs-right lg2 xs12>
        <v-text-field
          :value="$store.state.search.sentry"
          label="search"
          hide-details
          prepend-inner-icon="search"
          class="mt-0 pt-0 mb-3"
          @input="setSearch"
        />
      </v-flex>
    </v-layout>
    <v-container fluid grid-list-md class="pa-0">
      <v-alert type="error" :value="error" class="mb-4">
        {{ error }}
      </v-alert>
      <v-layout row wrap>
        <v-flex v-for="project in projectList" :key="project.id" lg3 xl2 xs12>
          <sentry-app-card :project="project" />
        </v-flex>
      </v-layout>
      <v-progress-linear v-if="projectList.length === 0 && !$store.state.search.sentry && $store.state.tags.sentry.length === 0 && !error" indeterminate />
      <div v-if="projectList.length === 0 && ($store.state.search.sentry || $store.state.tags.sentry.length > 0)" class="display-1 ma-5 text-xs-center">
        Nothing here.
      </div>
    </v-container>
    <div class="pt-2">      
      <small class="success--text pr-2">
        <strong>all fine</strong>
      </small>
      <small class="error--text pr-2">
        <strong>has unsolved issues by 14 days</strong>
      </small>
    </div>
  </v-content>
</template>

<script>
// MODELS
import Project from '@/dashboards/sentry/models/Project'

// COMPONENTS
import SentryAppCard from '@/dashboards/sentry/components/SentryAppCard'

export default {
  components: { SentryAppCard },
  data() {
    return {
      projects: [],
      error: null,
      last_update: new Date(),
      retries: 0
    }
  },
  computed: {
    projectList() {
      const selectedTags = this.$store.state.tags.sentry
      const searchTerms = this.$store.state.search.sentry
        .toLowerCase()
        .split(',')

      return this.projects
        .filter(project =>
          searchTerms.some(
            term =>
              searchTerms.length === 0 ||
              project.slug.toLowerCase().includes(term.trim())
          )
        )
        .filter(project =>
          project.teams
            .map(team => team.slug)
            .some(
              team =>
                selectedTags.length === 0 || selectedTags.indexOf(team) >= 0
            )
        )
    },
    tags() {
      const tags = this.projects
        .map(project => project.teams.map(team => team.slug))
        .filter(teams => teams.length > 0)
        .join(',')
        .split(',')
        .sort((a, b) => (a > b ? 1 : -1))

      return [...new Set(tags)]
    }
  },
  mounted() {
    this.refresh()

    setInterval(() => {
      this.refresh()
    }, this.$env.SENTRY_REFRESH_INTERVAL)
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
        msg += `. Retrying again in ${this.$env.SENTRY_REFRESH_INTERVAL /
          1000} seconds (failed retries: ${++this.retries}).`

        this.error = msg
      }
    },
    setTags(tags) {
      this.$store.dispatch('set_tags', { sentry: tags })
    },
    setSearch(value) {
      this.$store.dispatch('set_search', { sentry: value })
    }
  }
}
</script>
