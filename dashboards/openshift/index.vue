<template>
  <v-content>
    <v-layout row wrap>
      <v-flex>
        <!-- <img src="~static/openshift.svg" height="28" class="mb-2" style="vertical-align: bottom"> -->
        <span class="headline">
          <strong>Openshift</strong>
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
              <v-text-field
                :value="$store.state.search.openshift"
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
      <div v-if="projects.length > 0 && projectList.length === 0" class="display-1 text-xs-center">
        Nothing here.
      </div>
    </v-container>
    <div v-if="projects.length > 0 && projectList.length > 0" class="pt-2">
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
      menu: false,
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
