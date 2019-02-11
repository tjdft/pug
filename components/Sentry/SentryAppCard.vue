<template>
  <v-card :color="color" dark flat :href="`${SENTRY_URL}/sentry/${project.slug}`" target="_blank">
    <v-card-text class="py-2">
      <div class="text-truncate white--text pb-2">
        <strong>{{ project.name }}</strong>
      </div>
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
  data() {
    return {
      SENTRY_URL: process.env.SENTRY_URL
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
