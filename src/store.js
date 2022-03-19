import { createStore } from "vuex";


function initialState () {
  return {
    token: null,
    user: null,
    isUserLoggedIn: false,
    savedItems: []
  }
}

// Create Vuex.Store using a strict mode
const store = createStore({
  strict: true,
  // Create state variables that we're going to use entire our application
  state: initialState,
  // Create mutations to change state variables
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    reset (state) {
      // acquire initial state
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },
  // Create actions to change state variables
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    clearAll ({commit}) {
      commit('reset')
    }
  }
})

export default store;