<template>
  <div>
    Hello, {{ name }}
    <logo />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Logo from "@/components/Logo.vue";

@Component({
  components: {
    Logo
  }
})
export default class IndexPage extends Vue {
  name: String = "haalllo";

  mounted() {
    console.log(11);
    this.$axios.get("abc");
  }
}
</script>

