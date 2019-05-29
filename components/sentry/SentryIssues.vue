<template>
  <div><v-icon>warning</v-icon> {{ issues }}</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SentryIssues extends Vue {
  @Prop({ type: Number, required: true }) issues
}
</script>

