import Model from '~/models/Model'

export default function ({ $axios }) {
  Model.$axios = $axios
}