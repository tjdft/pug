<template>
  <v-content>
    <v-layout row wrap>
      <v-flex>
        <img src="sonarqube.png" height="32" class="mb-3">
      </v-flex>
      <v-flex v-if="!$store.state.tv_mode && projects.length > 0" lg3>
        <v-select
          :value="$store.state.tags.sonar"
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
      <v-flex v-if="!$store.state.tv_mode && projects.length > 0" text-xs-right lg2>
        <v-text-field
          :value="$store.state.search.sonar"
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
        <sonar-data-table v-if="false" :projects="projectList" />
        <v-flex v-for="project in projectList" :key="project.id" lg3 xl2 xs12>
          <sonar-app-card :project="project" />
        </v-flex>
      </v-layout>
      <v-progress-linear
        v-if="projectList.length === 0 && !$store.state.search.sonar && $store.state.tags.sonar.length === 0 && !error"
        indeterminate
      />
      <div
        v-if="projectList.length === 0 && ($store.state.search.sonar || $store.state.tags.sonar.length > 0)"
        class="display-1 ma-5 text-xs-center"
      >
        Nothing here.
      </div>
    </v-container>
    <div class="pt-2">
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
  components: { SonarAppCard },
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
      return this.projects.filter(
        project =>
          project.tags.join(',').includes(this.$store.state.tags.sonar) &&
          project.name
            .toLowerCase()
            .includes(this.$store.state.search.sonar.toLowerCase())
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
      this.$store.dispatch('set_tags', { sonar: tags })
    },
    setSearch(value) {
      this.$store.dispatch('set_search', { sonar: value })
    }
  }
}
</script>
