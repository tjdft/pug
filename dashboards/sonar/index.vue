<template>
  <v-content>
    <span class="headline">
      <strong>SonarQube</strong>
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
          <v-select
            :value="$store.state.dashboards.sonar.tags"
            :items="tags"
            label="tags"
            prepend-icon="label"   
            persistent-hint    
            hint="Filter by tags"                         
            clearable
            multiple
            chips                
            @input="setTags"
          />
          <v-text-field
            :value="$store.state.dashboards.sonar.search"
            label="search"
            prepend-icon="search"                
            persistent-hint    
            hint="You can search with a comma separated list"
            @input="setSearch"
          />
          <v-switch
            :input-value="$store.state.dashboards.sonar.summary"
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
        <v-flex v-for="project in projectList" :key="project.id" :class="`xs${columnSize}`">
          <sonar-app-card :project="project" />
        </v-flex>
      </v-layout>      
    </v-container>
    <v-progress-linear v-if="projects.length === 0 && !error" indeterminate />
    <div v-if="projects.length > 0 && projectList.length === 0" class="display-1 text-xs-center">
      Nothing here.
    </div>
    <div v-if="projects.length > 0 && projectList.length > 0" class="pt-2">
      <small class="success--text pr-2">
        <strong>excelent</strong>
      </small>
      <small class="error--text pr-2">
        <strong>some bugs</strong>
      </small>
      
      <small class="warning--text pr-2">
        <strong>vulnerabilities/code smells</strong>
      </small>

      <v-icon small>
        bug_report
      </v-icon>
      <small>bugs</small>

      <v-icon small>
        security
      </v-icon>
      <small>vulnerabilities</small>

      <v-icon small>
        error
      </v-icon>
      <small>code smells</small>

      <v-icon small>
        donut_large
      </v-icon>
      <small>coverage</small>

      <v-icon small>
        flip_to_front
      </v-icon>
      <small>duplications</small>
    </div>
  </v-content>
</template>

<script>
// MODELS
import Project from '@/dashboards/sonar/models/Project'

// COMPONENTS
import SonarAppCard from '@/dashboards/sonar/components/SonarAppCard'

export default {
  name: 'DashboardSonar',
  components: { SonarAppCard },
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
      const selectedTags = this.$store.state.dashboards.sonar.tags
      const searchTerms = this.$store.state.dashboards.sonar.search
        .toLowerCase()
        .split(',')

      return this.projects
        .filter(project =>
          searchTerms.some(
            term =>
              searchTerms.length === 0 ||
              project.name.toLowerCase().includes(term.trim())
          )
        )
        .filter(project =>
          project.tags.some(
            tag => selectedTags.length === 0 || selectedTags.indexOf(tag) >= 0
          )
        )
    },
    tags() {
      const tags = this.projects
        .map(project => project.tags)
        .filter(tags => tags.length > 0)
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
    }, this.$env.SONAR_REFRESH_INTERVAL)
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
    setTags(tags) {
      this.$store.dispatch('dashboards/set_tags', { sonar: tags })
    },
    setSearch(search) {
      this.$store.dispatch('dashboards/set_search', { sonar: search })
    },
    setSummary(summary) {
      console.log(summary)
      this.$store.dispatch('dashboards/set_summary', {
        dashboard: 'sonar',
        summary
      })
    }
  }
}
</script>
