<template>
  <div class="project-item" :class="color">
    <v-icon>toys</v-icon>
    {{ features !== null ? features : "" }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SmaxFeatures extends Vue {
  @Prop({ type: Number, required: false }) features;

  get color() {
    if (this.features === null) {
      return 'grey'
    }

    return this.features === 0 ? 'success' : 'error'
  }
}
</script>

