<template>
  <v-card :color="color" dark flat :href="`${$env.SENTRY_URL}/sentry/${project.slug}`" target="_blank">
    <v-card-title class="title pb-0">
      <div class="text-truncate white--text">
        <strong>{{ project.slug }}</strong>
      </div>
    </v-card-title>
    <v-card-text>      
      <div class="text-truncate sumary">        
        <v-chip disabled class="py-0 ma-0 transparent white--text" small flat label>
          <v-icon style="font-size: 12pt" small>
            error
          </v-icon>
          <small>{{ project.issues || '-' }}</small>
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
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
      if (this.project.issues === null) {
        return 'blue-grey lighten-1'
      } else if (this.project.hasUnsolvedIssues()) {
        return 'error'
      } else {
        return 'success'
      }
    }
  }
}
</script>
