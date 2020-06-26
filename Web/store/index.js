export const state = () => ({
    user: null,
    loggedIn: false
})

export const mutations = {
    login(state, user) {
        state.loggedIn = true
        state.user = user
    },
    logout(state, user) {
        state.user = null,
        state.loggedIn = false
    }
}

export const getters = {
  isAuthenticated: state => state.loggedIn,

  loggedInUser: state => state.user
}