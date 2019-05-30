import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {

  constructor(...attributes)
  {    
    super(...attributes)    
  }

  // define a base url for a REST API
  baseURL () {
    return 'http://my-api.com'
  }

  // implement a default request method 
  request (config) {
    return this.$http.request(config)
  }
}