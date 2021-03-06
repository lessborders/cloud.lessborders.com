import Api from './api'

export default {
  register (credentials) {
    return Api().post('auth/register', credentials)
  },
  login (credentials) {
    return Api().post('auth/login', credentials)
  },
  checkUser (credentials) {
    return Api().post('user', credentials)
  }
}
