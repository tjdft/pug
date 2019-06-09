<template>
  <div class="project-item" :class="color">
    <v-icon>error</v-icon> {{ issues !== null ? issues : "" }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SentryIssues extends Vue {
  @Prop({ type: Number, required: false }) issues

  get color() {
    if (this.issues === null) {
      return 'grey'
    }

    return this.issues === 0 ? 'success' : 'error'
  }
}
</script>