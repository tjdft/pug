<template>
  <v-content>
    <v-layout row wrap>
      <v-flex>
        <img src="~static/openshift.svg" height="28" class="mb-3">
      </v-flex>
      <v-flex v-if="!$store.state.tv_mode && projects.length > 0" text-xs-right lg2 xs12>
        <v-text-field
          :value="$store.state.search.openshift"
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
        <v-flex v-for="project in projectList" :key="project.metadata.uid" lg3 xl2 xs12>
          <openshift-app-card :project="project" />
        </v-flex>
      </v-layout>
      <v-progress-linear v-if="projects.length === 0 && !error" indeterminate />
      <div v-if="projects.length > 0 && projectList.length === 0" class="display-1 ma-5 text-xs-center">
        Nothing here.
      </div>
    </v-container>
    <div class="pt-2">
      <small class="success--text pr-2">
        <strong>all fine</strong>
      </small>
      <small class="error--text pr-2">
        <strong>something down</strong>
      </small>
      
      <small class="blue-grey--text text--lighten-1 pr-2">
        <strong>something off</strong>
      </small>
      
      <small class="blue-grey--text text--lighten-3">
        <strong>no deployments</strong>
      </small>
    </div>
  </v-content>
</template>

<script>
// MODELS
import Project from '@/dashboards/openshift/models/Project'

// COMPONENTS
import OpenshiftAppCard from '@/dashboards/openshift/components/OpenshiftAppCard'

export default {
  components: { OpenshiftAppCard },
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
      const searchTerms = this.$store.state.search.openshift
        .toLowerCase()
        .split(',')

      return this.projects.filter(project =>
        searchTerms.some(
          term =>
            searchTerms.length === 0 ||
            project.metadata.annotations['openshift.io/display-name']
              .toLowerCase()
              .includes(term.trim())
        )
      )
    }
  },
  mounted() {
    this.refresh()

    setInterval(() => {
      this.refresh()
    }, this.$env.OPENSHIFT_REFRESH_INTERVAL)
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
        msg += `. Retrying again in ${this.$env.OPENSHIFT_REFRESH_INTERVAL /
          1000} seconds (failed retries: ${++this.retries}).`

        this.error = msg
      }
    },
    setSearch(value) {
      this.$store.dispatch('set_search', { openshift: value })
    }
  }
}
</script>
