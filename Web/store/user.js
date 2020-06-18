
export const state =  () => ({
    user: null,
    is_auth: false
})

export const mutations = {
    login(state, user) {
        state.user = user
        state.is_auth = true
    },
    logout() {
        state.user = user
        state.is_auth = false
    }
}