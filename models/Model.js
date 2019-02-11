export default class Model {
  constructor(...atributtes) {
    Object.assign(this, ...atributtes)
  }

  get $axios() {
    return Model.$axios
  }
}
