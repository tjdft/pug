<template>
  <div class="project-item" :class="color">
    <v-icon>track_changes</v-icon>
    {{ issues }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SonarStatus extends Vue {
  @Prop({ type: Number, required: true }) issues;

  get color() {
    return this.issues === 0 ? 'success' : 'error'
  }
}
</script>

