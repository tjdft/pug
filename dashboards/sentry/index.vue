<template>
  <v-content>    
    <span class="headline">
      <strong>Sentry</strong>
    </span>

    <v-menu
      v-if="!$store.state.tv_mode && projects.length > 0"
      v-model="menu"
      :close-on-content-click="false"       
      :bottom="true"             
    >
      <v-btn slot="activator" icon class="mt-0">
        <v-icon color="grey lighten-1">
          toc
        </v-icon>
      </v-btn>
      <v-card :width="400">
        <v-card-text>
          <v-select
            :value="$store.state.tags.sentry"
            :items="tags"
            label="tags"
            prepend-inner-icon="label"                            
            clearable
            multiple
            chips                
            @input="setTags"
          />
          <v-text-field
            :value="$store.state.search.sentry"
            label="search"
            prepend-inner-icon="search"                
            persistent-hint    
            hint="You can search with a comma separated list"
            @input="setSearch"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn flat color="primary" @click="menu = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>    
    <v-container fluid grid-list-md class="pa-0 mt-2">
      <v-alert type="error" :value="error" class="mb-4">
        {{ error }}
      </v-alert>
      <v-layout row wrap>
        <v-flex v-for="project in projectList" :key="project.id" lg3 xl2 xs12>
          <sentry-app-card :project="project" />
        </v-flex>
      </v-layout>
      <v-progress-linear v-if="projects.length === 0 && !error" indeterminate />
      <div v-if="projects.length > 0 && projectList.length === 0" class="display-1 text-xs-center">
        Nothing here.
      </div>
    </v-container>
    <div v-if="projects.length > 0 && projectList.length > 0" class="pt-2">
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
      menu: false,
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
