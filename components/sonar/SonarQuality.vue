<template>
  <div class="project-item">
    <v-icon>donut_large</v-icon>
    {{ quality }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SonarQuality extends Vue {
  @Prop({ type: Number, required: true }) quality;
}
</script>

