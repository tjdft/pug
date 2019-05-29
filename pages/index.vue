<template>
  <div>
    Hello, {{ name }}
    <logo />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    // TODO se falhar , mover para import padrão
    Logo: () => import("@/components/Logo.vue")
  }
})
export default class IndexPage extends Vue {
  name: String = "haalllo";

  mounted() {
    console.log(11);
    this.name = "Joe";
    this.$axios.get("abc");
  }
}
</script>

