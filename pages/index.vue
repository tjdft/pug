<template>
  <div>
    <dashboard />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    Dashboard: () => import("~/components/Dashboard.vue")
  }
})
export default class IndexPage extends Vue {

}
</script>

