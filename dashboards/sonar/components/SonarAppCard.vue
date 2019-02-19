<template>
  <div>
    <v-card
      flat
      height="100%"
      :color="color"
      :href="`${$env.SONAR_URL}/dashboard?id=${project.key}`"
      target="_blank"
    >
      <v-card-text class="py-2">
        <div class="text-truncate white--text pb-2">
          <strong>{{ project.name }}</strong>
        </div>
        <div class="text-truncate sumary">        
          <v-chip disabled class="pa-0 ma-0 transparent white--text" small flat label>
            <v-icon style="font-size: 12pt" small>
              bug_report
            </v-icon>
            <small>{{ project.metrics.bugs || '-' }}</small>
          </v-chip>
          <v-chip disabled class="pa-0 ma-0 transparent white--text" small flat label>
            <v-icon style="font-size: 10pt" small>
              security
            </v-icon>
            <small>{{ project.metrics.vulnerabilities || '-' }}</small>
          </v-chip>
          <v-chip disabled class="pa-0 ma-0 transparent white--text" small flat label>
            <v-icon style="font-size: 10pt" small>
              error
            </v-icon>
            <small>{{ project.metrics.code_smells || '-' }}</small>
          </v-chip>
          <v-chip disabled class="pa-0 ma-0 transparent white--text" small flat label>
            <v-icon style="font-size: 10pt" small>
              donut_large
            </v-icon>
            <small>{{ project.metrics.coverage || '-' }}</small> %
          </v-chip>
          <v-chip disabled class="pa-0 ma-0 transparent white--text" small flat label>
            <v-icon style="font-size: 10pt" small>
              flip_to_front
            </v-icon>
            <small>{{ project.metrics.duplications || '-' }}</small> %
          </v-chip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
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
