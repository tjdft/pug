<template>
  <div>
    <no-ssr>
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="32"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        :responsive="true"
        :autosize="false"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
        >
          <dashboard :type="item.i" class="mb-5" />
        </grid-item>
      </grid-layout>
    </no-ssr>
  </div>
</template>
<script>
import Dashboard from '@/dashboards/dashboard'

export default {
  components: {
    Dashboard
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 2, h: 2, i: 'sonar' },
        { x: 2, y: 0, w: 2, h: 4, i: 'sentry' },
        { x: 4, y: 0, w: 2, h: 5, i: 'openshift' }
      ]
    }
  }
}
</script>
<style>
.vue-grid-item {
  background: #c0c0c0;
}
</style>
