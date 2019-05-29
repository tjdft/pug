<template>
  <div>
    <v-card flat height="100%" color="transparent" :href="`${$env.SONAR_URL}/dashboard?id=${project.key}`" class="px-5 mb-5">
      <v-card-title class="title">
        <div class="text-truncate white--text">
          <strong style="font-size: 40pt; font-weight: 800">{{ project.name.toUpperCase() }}</strong>
        </div>
      </v-card-title>
      <v-card-text v-if="$store.state.dashboards.sonar.summary" >
        <v-layout row wrap >
          <v-flex xs3 text-xs-center :class="project.metrics.bugs == 0 ? 'success' : 'error'" >
        <p style="font-size: 50pt; margin: 0; font-weight: 800" >
          <v-icon style="font-size: 50pt; margin-bottom: 5px" large>bug_report</v-icon>
          {{ project.metrics.bugs }}</p>            
          </v-flex>          
          <v-flex xs3 text-xs-center :class="project.metrics.vulnerabilities == 0 ? 'success' : 'error'"  >
            <p style="font-size: 50pt; margin: 0; font-weight: 800">
              <v-icon style="font-size: 50pt; margin-bottom: 5px; margin-right: 20px" >warning</v-icon>{{ project.metrics.vulnerabilities  }}
              </p>            
          </v-flex>
          <v-flex xs3 text-xs-center :class="project.metrics.code_smells == 0 ? 'success' : 'error'" >
            <p style="font-size: 50pt; margin: 0; font-weight: 800">
              <v-icon style="font-size: 50pt; margin-bottom: 5px; margin-right: 20px" >track_changes</v-icon>{{ project.metrics.code_smells }}
              </p>            
          </v-flex>
          <v-flex xs3 text-xs-center class="grey darken-3" >
            <p style="font-size: 50pt; margin: 0; font-weight: 800">
              <v-icon style="font-size: 50pt; margin-bottom: 5px; margin-right: 20px" >donut_large</v-icon>{{ Math.floor(project.metrics.coverage) }}%
              </p>            
          </v-flex>
        </v-layout>
            
                  
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'SonarAppCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    color() {
      if (this.project.metrics.bugs === null) return 'blue-grey lighten-1'

      if (this.project.metrics.bugs > 0) return 'error'

      if (
        this.project.metrics.vulnerabilities > 0 ||
        this.project.metrics.code_smells > 0
      ) {
        return 'warning'
      }

      return 'success'
    }
  }
}
</script>
<style>
</style>
