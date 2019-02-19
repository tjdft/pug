<template>
  <div>
    <component :is="component" v-if="component" />
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      component: null
    }
  },
  computed: {
    loader() {
      return () => import(`./${this.type}`)
    }
  },
  mounted() {
    this.loader()
      .then(() => {
        this.component = () => this.loader()
      })
      .catch(e => {
        throw new Error(`Dashboard ${this.type} not found.`)
      })
  }
}
</script>
