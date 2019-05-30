<template>
  <div class="project-item" :class="color">
    <v-icon>donut_large</v-icon>
    {{ quality ? quality + "%" : "" }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SonarQuality extends Vue {
  @Prop({ type: Number, required: false }) quality;

  get color() {
    if (this.quality === null) {
      return 'grey'
    }

    return 'grey darken-3'
  }
}
</script>

