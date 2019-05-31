<template>
  <div class="project-item" :class="color">
    <v-icon>favorite</v-icon>
    {{ coverage !== null ? coverage + "%" : "" }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SonarCoverage extends Vue {
  @Prop({ type: Number, required: false }) coverage;

  get color() {
    if (this.coverage === null || this.coverage === undefined) {
      return "grey";
    }

    return "grey darken-3";
  }
}
</script>

