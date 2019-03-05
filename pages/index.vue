<template>
  <v-content>    
    <no-ssr>
      <grid-layout          
        :layout="layout"
        :col-num="64"        
        :row-height="40"
        :is-draggable="$store.state.tv.editing"
        :is-resizable="$store.state.tv.editing"
        :margin="[30, 10]"     
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
  </v-content>
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
  mounted() {
    this.layout = cloneDeep(this.$store.getters['dashboards/layout'])
  },
  methods: {
    layoutUpdated(newLayout) {
      this.$store.dispatch('dashboards/set_layout', cloneDeep(newLayout))
    }
  }
}
</script>
<style>
.itemEditing {
  border: 2px dashed #c0c0c0 !important;
  padding: 10px !important;
}
</style>
