export const state = () => ({
  status: '',
})

export const getters = {
  getStatus: (state) => state.status,
}

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status
  },
}
