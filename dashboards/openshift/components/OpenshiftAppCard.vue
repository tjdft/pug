<template>
  <v-card
    :color="color"
    dark
    flat
    :href="`${$env.OPENSHIFT_URL}/console/project/${project.metadata.name}`"
    target="_blank"
  >
    <v-card-title>
      <strong>{{ project.metadata.annotations['openshift.io/display-name'] }}</strong>
    </v-card-title>
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
      if (this.project.deploymentconfigs.length === 0)
        return 'blue-grey lighten-3'
      else if (this.project.hasSomethingDown()) return 'error'
      else if (this.project.hasSomethingOff()) return 'blue-grey lighten-1'
      else return 'success'
    }
  }
}
</script>
