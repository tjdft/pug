<template>
  <div class="project-item" :class="color">
    <v-icon>warning</v-icon> {{ issues }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SentryIssues extends Vue {
  @Prop({ type: Number, required: true }) issues

  get color() {
    return this.issues === 0 ? 'success' : 'error'
  }
}
</script>