<template>
  <v-content>    
    <span class="headline">
      <strong>Openshift</strong>
    </span>
    <v-menu
      v-if="!$store.state.tv.fullscreen && projects.length > 0"
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
            :value="$store.state.dashboards.openshift.search"
            label="search"
            prepend-inner-icon="search"                
            persistent-hint    
            hint="You can search with a comma separated list"
            @input="setSearch"
          />
          <v-switch
            :input-value="$store.state.dashboards.openshift.summary"
            :false-value="false"
            :true-value="true"
            hint="Display summary"
            persistent-hint
            prepend-icon="line_style"
            @change="setSummary"
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
    <v-alert type="error" :value="error" class="mb-4">
      {{ error }}
    </v-alert>
    <v-container fluid grid-list-md class="pa-0 mt-2">      
      <v-layout row wrap>
        <v-flex v-for="project in projectList" :key="project.metadata.uid" :class="`xs${columnSize}`">
          <openshift-app-card :project="project" />
        </v-flex>
      </v-layout>      
    </v-container>
    <v-progress-linear v-if="projects.length === 0 && !error" indeterminate />
    <div v-if="projects.length > 0 && projectList.length === 0" class="display-1 text-xs-center">
      Nothing here.
    </div>
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
  name: 'DashboardOpenshift',
  components: { OpenshiftAppCard },
  props: {
    columnSize: {
      type: Number,
      default: 3
    }
  },
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
      const searchTerms = this.$store.state.dashboards.openshift.search
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
  updated() {
    this.$nextTick(() => this.$emit('updated'))
  },
  methods: {
    async refresh() {
      try {
        this.error = ''
        this.projects = await Project.all()
        this.last_update = new Date()
      } catch (error) {
        let msg = error.response ? error.response.data : error.message
        msg += `. Retrying again in ${this.$env.OPENSHIFT_REFRESH_INTERVAL /
          1000} seconds (failed retries: ${++this.retries}).`

        this.error = msg
      }
    },
    setSearch(search) {
      this.$store.dispatch('dashboards/set_search', { openshift: search })
    },
    setSummary(summary) {
      console.log(summary)
      this.$store.dispatch('dashboards/set_summary', {
        dashboard: 'openshift',
        summary
      })
    }
  }
}
</script>
