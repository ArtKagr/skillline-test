export const state = () => ({
  status: '',
  currentTab: 'Параметры',
  terms: [
    {
      type: null,
      title: 'Выберите условие',
      subType: {
        target: null,
        title: null,
        type: null,
        typeResults: null,
        item: null,
        result: null,
      },
    },
    {
      type: 'age',
      title: 'Возраст респондента',
      subType: {
        target: 'range',
        title: 'диапазон',
        type: null,
        typeResults: null,
        item: { from: null, to: null },
        result: [],
      },
    },
    {
      type: 'card_type',
      title: 'Тип карты лояльности',
      subType: {
        target: 'dropdown',
        title: 'тип',
        type: 'Выберите тип',
        typeResults: [],
        item: [
          { type: 'Silver' },
          { type: 'Gold' },
          { type: 'Platinum' }
        ],
        result: [],
      },
    },
    {
      type: 'card_status',
      title: 'Статус карты лояльности',
      subType: {
        target: 'dropdown',
        title: 'статус',
        type: 'Выберите статус',
        typeResults: [],
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
  getCurrentTab: (state) => state.currentTab,
  getCurrentRespondents: (state) => JSON.parse(JSON.stringify(state.currentRespondents)),
  getRespondents: (state) => state.terms
}

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status
  },
  SAVE_CURRENT_TAB(state, currentTab) {
    state.currentTab = currentTab
  },
  ADD_CURRENT_TERM(state) {
    state.currentRespondents.push({
      type: null,
      title: 'Выберите условие',
      subType: {
        target: null,
        title: null,
        type: null,
        typeResults: null,
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
    state.currentRespondents[query.index].subType.typeResults = []
    state.currentRespondents[query.index].subType.item = query.term.subType.item
    state.currentRespondents[query.index].subType.result = []
  },
  REMOVE_CURRENT_TERM(state, currentIndex) {
    state.currentRespondents = state.currentRespondents.filter((term, index) => index !== currentIndex)
  },
  SET_SUBTYPE_ITEM(state, query) {
    state.currentRespondents[query.index].subType.result.push(query.item)
  },
  SET_CURRENT_SUB_TYPE_ITEM(state, query) {
    state.currentRespondents[query.index].subType.typeResults.push(query.select.type)
    state.currentRespondents[query.index].subType.result[query.childIndex].type = query.select.type
  },
  SET_CURRENT_TERM_RANGE(state, query) {
    state.currentRespondents[query.index].subType.result[query.childIndex][query.field] = query.value
  }
}
