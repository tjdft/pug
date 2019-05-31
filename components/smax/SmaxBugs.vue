<template>
  <div class="project-item" :class="color">
    <v-icon>bug_report</v-icon>
    {{ bugs !== null ? bugs : "" }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SmaxBugs extends Vue {
  @Prop({ type: Number, required: false }) bugs;

  get color() {
    if (this.bugs === null || this.bugs === undefined) {
      return 'grey'
    }

    return this.bugs === 0 ? 'success' : 'error'
  }
}
</script>

