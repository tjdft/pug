import Model from '@/models/Model'

export default function({ $axios }) {
  // inject axios on base model
  Model.$axios = $axios
}
