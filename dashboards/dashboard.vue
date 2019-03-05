<template>
  <div>
    <strong v-show="$store.state.tv.editing">
      {{ type }}
    </strong>  
    <component :is="component" v-if="component && !$store.state.tv.editing" :column-size="columnSize" @updated="autoSize" />
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: null
    },
    w: {
      type: Number,
      default: 1200
    }
  },
  data() {
    return {
      component: null,
      columnSize: 12
    }
  },
  computed: {
    loader() {
      return () => import(`./${this.type}`)
    }
  },
  watch: {
    w() {
      this.calcColumnSize()
    }
  },
  updated() {
    // When childs re-renders just autosize vue-grid-layout
    this.$nextTick(() => this.$parent.autoSize())
  },
  mounted() {
    this.loader()
      .then(() => {
        this.component = () => this.loader()
      })
      .catch(e => {
        throw new Error(`Dashboard ${this.type} not found.`)
      })
  },
  methods: {
    calcColumnSize() {
      let size
      const clientWidth = this.$parent.$el.clientWidth

      if (clientWidth > 1264) {
        size = 2
      } else if (clientWidth > 960 && clientWidth < 1264) {
        size = 3
      } else if (clientWidth > 600 && clientWidth < 960) {
        size = 4
      } else if (clientWidth > 414 && clientWidth < 600) {
        size = 6
      } else if (clientWidth < 414) {
        size = 12
      }

      this.columnSize = size
    },
    autoSize() {
      this.calcColumnSize()
      this.$parent.autoSize()
    }
  }
}
</script>
