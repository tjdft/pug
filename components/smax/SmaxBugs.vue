<template>
  <div><v-icon>bug_report</v-icon> {{ bugs }}</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class SmaxBugs extends Vue {
  @Prop({ type: Number, required: true }) bugs
}
</script>

