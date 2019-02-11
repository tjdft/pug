<template>
  <div>
    <v-data-table :headers="headers" :items="projects" hide-actions hide-headers>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.metrics.vulnerabilities || '-' }}</td>
        <td>{{ props.item.metrics.code_smells || '-' }}</td>
        <td>{{ props.item.metrics.coverage || '-' }} %</td>
        <td>{{ props.item.metrics.duplications || '-' }} %</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Project'
        },
        {
          text: ''
        },
        {
          text: ''
        }
      ]
    }
  },
  computed: {
    bugs() {
      return this.project.metrics.find(metric => metric.metric === 'bugs') || {}
    },
    vulnerabilities() {
      return (
        this.project.metrics.find(
          metric => metric.metric === 'vulnerabilities'
        ) || {}
      )
    },
    code_smells() {
      return (
        this.project.metrics.find(metric => metric.metric === 'code_smells') ||
        {}
      )
    },
    coverage() {
      return (
        this.project.metrics.find(metric => metric.metric === 'coverage') || {}
      )
    },
    duplications() {
      return (
        this.project.metrics.find(
          metric => metric.metric === 'duplicated_lines_density'
        ) || {}
      )
    }
  }
}
</script>
