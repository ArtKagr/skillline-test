<template>
  <div class=" m-4 w-100 h-100">
    <div class="font-weight-bold h-5">Добавить опрос</div>
    <div class="d-flex flex-column flex-fill px-4 w-100 h-70">
      <div class="overflow-auto h-80 flex-fill align-self-stretch">
        <div class="pb-4 w-100 overflow-auto" v-for="(term, key) in currentTerms" :key="key">
          <div class="d-flex flex-column w-100">
            <div class="d-flex align-items-center w-100 mb-3">
              <span class="w-30">Условие {{ key + 1}}</span>
              <div class="w-70">
                <b-dd
                  :lazy="true"
                  variant="link"
                  boundary="viewport"
                  toggle-class="p-0 text-center mb-0 custom_button"
                >
                  <template v-slot:button-content>
                    {{ term.title }}
                  </template>
                  <template v-for="(term, index) in terms">
                    <b-dd-item-btn
                      :key="index"
                      @click="setCurrentTerm(term, key)"
                    >
                      <div class="flex-fill text-left mr-2">
                        {{ term.title }}
                      </div>
                    </b-dd-item-btn>
                  </template>
                </b-dd>
              </div>
            </div>
            <div v-for="(subType, elem) in term.subType.result" :key="elem" class="mb-2">
              <div class="d-flex align-items-center" v-if="term.subType.target === 'range'">
                <div class="d-flex w-30">
                  <span class="text-capitalize mr-1">{{ term.subType.title }}</span>
                  <span>{{ elem + 1 }}</span>
                </div>
                <div class="w-70">
                  <div class="w-30">
                    <b-input-group>
                      <div class="d-flex">
                        <div class="d-flex align-items-center mr-4">
                          <span class="mr-2">от</span>
                          <b-form-input v-model="subType.from" @change="setCurrentTermRange('from', subType.from, key, elem)"></b-form-input>
                        </div>
                        <div class="d-flex align-items-center">
                          <span class="mr-2">до</span>
                          <b-form-input v-model="subType.to" @change="setCurrentTermRange('to', subType.to, key, elem)"></b-form-input>
                        </div>
                      </div>
                    </b-input-group>
                  </div>
                </div>
              </div>
              <div v-else-if="term.subType.target === 'dropdown'">
                <div class="d-flex align-items-center">
                  <div class="d-flex w-30">
                    <span class="text-capitalize mr-1">{{ term.subType.title }}</span>
                    <span>{{ elem + 1 }}</span>
                  </div>
                  <div class="w-70">
                    <b-dd
                      :lazy="true"
                      variant="link"
                      boundary="viewport"
                      toggle-class="p-0 text-center mb-0 custom_button"
                    >
                      <template v-slot:button-content>
                        {{ term.typeResults.length && term.typeResults[elem] ? term.typeResults[elem] : term.subType.type }}
                      </template>
                      <template v-for="(select, block) in term.subType.item">
                        <b-dd-item-btn
                          :key="block"
                          @click="setCurrentSubTypeItem(select, key, elem)"
                        >
                          <div class="flex-fill text-left mr-2">
                            {{ select.type }}
                          </div>
                        </b-dd-item-btn>
                      </template>
                    </b-dd>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="term && term.subType && term.subType.target" class="d-flex justify-content-end pt-3">
              <div class="d-flex justify-content-between w-70">
                <b-button variant="outline-success">
                  <div class="d-flex align-items-center" @click="setSubTypeItem(term.subType.item, key)">
                    <b-icon-plus class="m-0 mr-1 custom_icon-plus_subtype"></b-icon-plus>
                    <span class="mr-1">Добавить</span>
                    <span>{{ term.subType.title }}</span>
                  </div>
                </b-button>
                <b-button variant="outline-danger" @click="removeCurrentTerm(key)">
                  <div class="d-flex align-items-center">
                    <b-icon-trash class="m-0 mr-1 custom_icon-plus_subtype"></b-icon-trash>
                    <span>Удалить условие</span>
                  </div>
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-25">
        <div class="d-flex flex-column align-items-center justify-content-center pointer add_term p-3" @click="addTerm">
          <b-icon-plus class="m-0 custom_icon-plus" variant="success"></b-icon-plus>
          <span class="add_term-text">Нажмите, чтобы добавить новое условие выборки.</span>
          <span class="add_term-text">Все условия связываются между собой логическим "И"</span>
        </div>
        <div class="d-flex justify-content-between p-4 bg-gray-100">
          <b-button variant="white" :disabled="!allTestDataFilled" @click="fetchRespondentsData">Протестировать опрос</b-button>
          <b-button variant="success" :disabled="true">Далее</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PollsRespondents",
  computed: {
    terms() {
      return this.$store.getters['polls/getRespondents']
    },
    currentTerms() {
      return this.$store.getters['polls/getCurrentRespondents']
    },
    testData() {
      return this.$store.getters['polls/getTestData']
    },
    allTestDataFilled() {
      if (this.testData.length) return this.testData.every(function (term) {
        return term.result.length
          ? term.result.every(function (item) {
            if (typeof item !== 'string') return item.from && item.to
            else return true
          })
          : false
      })
    }
  },
  methods: {
    addTerm() {
      this.$store.commit('polls/ADD_CURRENT_TERM')
    },
    setCurrentTerm(term, index) {
      this.$store.commit('polls/SET_CURRENT_TERM_TYPE', { term, index })
    },
    removeCurrentTerm(index) {
      this.$store.commit('polls/REMOVE_CURRENT_TERM', index)
    },
    setSubTypeItem(item, index) {
      this.$store.commit('polls/SET_SUBTYPE_ITEM', { item, index })
    },
    setCurrentSubTypeItem(select, index, childIndex) {
      this.$store.commit('polls/SET_CURRENT_SUB_TYPE_ITEM', { select, index, childIndex })
    },
    setCurrentTermRange(field, value, index, childIndex) {
      this.$store.commit('polls/SET_CURRENT_TERM_RANGE', { field, value, index, childIndex })
    },
    fetchRespondentsData() {
      this.$store.dispatch('polls/fetchRespondentsData')
    }
  }
}
</script>
