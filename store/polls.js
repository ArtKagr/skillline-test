export const state = () => ({
  status: '',
  errorData: [],
  currentTab: 'Параметры',
  terms: [
    {
      type: null,
      title: 'Выберите условие',
      typeResults: null,
      subType: {
        target: null,
        title: null,
        type: null,
        item: null,
        result: null,
      },
    },
    {
      type: 'age',
      title: 'Возраст респондента',
      typeResults: null,
      subType: {
        target: 'range',
        title: 'диапазон',
        type: null,
        item: { from: null, to: null },
        result: [],
      },
    },
    {
      type: 'card_type',
      title: 'Тип карты лояльности',
      typeResults: [],
      subType: {
        target: 'dropdown',
        title: 'тип',
        type: 'Выберите тип',
        item: [
          { type: 'Silver' },
          { type: 'Gold' },
          { type: 'Platinum' },
        ],
        result: [],
      },
    },
    {
      type: 'card_status',
      title: 'Статус карты лояльности',
      typeResults: [],
      subType: {
        target: 'dropdown',
        title: 'статус',
        type: 'Выберите статус',
        item: [
          { type: 'Активна' },
          { type: 'Неактивна' }
        ],
        result: [],
      },
    },
  ],
  currentRespondents: [],
})

export const getters = {
  getStatus: (state) => state.status,
  getErrorData: (state) => state.errorData,
  getCurrentTab: (state) => state.currentTab,
  getCurrentRespondents: (state) => JSON.parse(JSON.stringify(state.currentRespondents)),
  getRespondents: (state) => state.terms,
  getTestData(state) {
    return state.currentRespondents.map(function(term) {
      if(term.subType.target === 'range') return {
        type: term.type,
        result: term.subType.result
      }
      else if(term.subType.target === 'dropdown') return {
        type: term.type,
        result: term.typeResults.filter(result => result)
      }
      else return { type: null, result: [] }
    })
  }
}

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status
  },
  SET_ERROR_DATA(state, errorData) {
    state.errorData = errorData
  },
  SAVE_CURRENT_TAB(state, currentTab) {
    state.currentTab = currentTab
  },
  ADD_CURRENT_TERM(state) {
    state.currentRespondents.push({
      type: null,
      title: 'Выберите условие',
      typeResults: null,
      subType: {
        target: null,
        title: null,
        type: null,
        item: null,
        result: [],
      }
    })
  },
  SET_CURRENT_TERM_TYPE(state, query) {
    state.currentRespondents[query.index].type = query.term.type
    state.currentRespondents[query.index].title = query.term.title
    state.currentRespondents[query.index].subType.target = query.term.subType.target
    state.currentRespondents[query.index].subType.title = query.term.subType.title
    state.currentRespondents[query.index].subType.type = query.term.subType.type
    state.currentRespondents[query.index].typeResults = []
    state.currentRespondents[query.index].subType.item = query.term.subType.item
    state.currentRespondents[query.index].subType.result = []
  },
  REMOVE_CURRENT_TERM(state, currentIndex) {
    state.currentRespondents = state.currentRespondents.filter((term, index) => index !== currentIndex)
  },
  SET_SUBTYPE_ITEM(state, query) {
    state.currentRespondents[query.index].subType.result.push(query.item)
    state.currentRespondents[query.index].typeResults.push(null)
  },
  SET_CURRENT_SUB_TYPE_ITEM(state, query) {
    let currentRespondentsCopy = JSON.parse(JSON.stringify(state.currentRespondents))
    currentRespondentsCopy[query.index].subType.result[query.childIndex].type = query.select.type
    currentRespondentsCopy[query.index].typeResults[query.childIndex] = query.select.type
    state.currentRespondents = currentRespondentsCopy
  },
  SET_CURRENT_TERM_RANGE(state, query) {
    state.currentRespondents[query.index].subType.result[query.childIndex][query.field] = query.value
  }
}

  export const actions = {
    async fetchRespondentsData({ commit, getters }) {
      commit('SET_STATUS', 'calculation')
      commit('SET_ERROR_DATA', [])
      try {
        await this.$axios.$get(`/api/respondents`, { params: getters.getTestData })
        commit('SET_STATUS', 'data-received')
      } catch {
        commit('SET_STATUS', 'error')
        commit('SET_ERROR_DATA', getters.getTestData)
      }
    },
  }
