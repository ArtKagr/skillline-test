<template>
  <div class="d-flex flex-column px-4 h-100">
    <Navigation class="mb-4" source="polls_manage"></Navigation>
    <b-tabs class="h-100" content-class="h-100">
        <b-tab
          v-for="(tab, key) in pollsTabs"
          :title="tab.title"
          :active="tab.title === currentTab"
          :key="key"
          @click="setCurrentTab(tab.title)"
          class="h-100"
        >
          <polls-parameters v-if="tab.page === 'parameters'"></polls-parameters>
          <polls-questions v-else-if="tab.page === 'questions'"></polls-questions>
          <polls-logic v-else-if="tab.page === 'logic'"></polls-logic>
          <polls-terms v-else-if="tab.page === 'terms'"></polls-terms>
          <polls-respondents v-else-if="tab.page === 'respondents'" class="h-100"></polls-respondents>
        </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import PollsParameters from "./parameters";
import Navigation from "../../components/Navigation";
import PollsQuestions from "./questions";
import PollsLogic from "./logic";
import PollsTerms from "./terms";
import PollsRespondents from "./respondents";
export default {
  name: "Polls",
  components: {PollsRespondents, PollsTerms, PollsLogic, PollsQuestions, Navigation, PollsParameters},
  data() {
    return {
      pollsTabs: [
        { page: 'parameters', title: 'Параметры' },
        { page: 'questions', title: 'Вопросы' },
        { page: 'logic', title: 'Логика' },
        { page: 'terms', title: 'Условия' },
        { page: 'respondents', title: 'Респонденты' },
      ]
    }
  },
  computed: {
    currentTab() {
      return this.$store.getters['polls/getCurrentTab']
    },
    errorRespondentsData() {
      return this.$store.getters['polls/getErrorData']
    }
  },
  watch: {
    errorRespondentsData(newValue) {
      if(newValue.length) this.showNotification(
        `Количество условий тестирования: ${newValue.length}`,
        'Ошибка тестирования',
        'danger'
      )
    }
  },
  methods: {
    setCurrentTab(currentTab) {
      this.$store.commit('polls/SAVE_CURRENT_TAB', currentTab)
    },
    showNotification(message, title, variant) {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: 5000,
        toaster: 'b-toaster-bottom-right',
        variant,
        appendToast: false,
      })
    },
  }
}
</script>
