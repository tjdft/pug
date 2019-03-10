<template>
  <div>
    <no-ssr>
      <grid-layout          
        :layout="layout"
        :col-num="64"        
        :row-height="50"
        :is-draggable="$store.state.tv.editing"
        :is-resizable="$store.state.tv.editing"
        :margin="[30, 30]"     
        @layout-updated="layoutUpdated"        
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"                    
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"        
          :i="item.i"                           
          :class="{itemEditing: $store.state.tv.editing}"            
        >          
          <dashboard :type="item.i" :w="item.w" />
        </grid-item>
      </grid-layout>
    </no-ssr>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import Dashboard from '@/dashboards/dashboard'

export default {
  components: { Dashboard },
  data() {
    return {
      layout: []
    }
  },
  computed: {
    layouts() {
      return this.$store.getters['dashboards/layout']
    }
  },
  watch: {
    layouts() {
      this.layout = cloneDeep(this.layouts)
    }
  },
  mounted() {
    this.layout = cloneDeep(this.layouts)
  },
  methods: {
    layoutUpdated(newLayout) {
      if (this.$store.state.tv.editing) {
        this.$store.dispatch('dashboards/set_layout', cloneDeep(newLayout))
      }
    }
  }
}
</script>
<style>
.itemEditing {
  border: 2px dashed #c0c0c0 !important;
}
</style>
