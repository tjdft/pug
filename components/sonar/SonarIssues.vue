<template>
  <div class="project-item">
    <v-icon>track_changes</v-icon>
    {{ issues }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SonarStatus extends Vue {
  @Prop({ type: Number, required: true }) issues;
}
</script>

