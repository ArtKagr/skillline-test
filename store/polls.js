export const state = () => ({
  status: '',
  currentTab: 'parameters'
})

export const getters = {
  getStatus: (state) => state.status,
  getCurrentTab: (state) => state.currentTab,
}

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status
  },
  SAVE_CURRENT_TAB(state, currentTab) {
    state.currentTab = currentTab
  }
}
