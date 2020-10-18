<template>
  <div class="d-flex flex-column px-4">
    <Navigation class="mb-4" source="polls_manage"></Navigation>
    <b-tabs>
        <b-tab
          v-for="(tab, key) in pollsTabs"
          :title="tab.title"
          :active="tab.title === currentTab"
          :key="key"
          @click="setCurrentTab(tab.title)"
        >
          <polls-parameters v-if="tab.page === 'parameters'"></polls-parameters>
          <polls-questions v-else-if="tab.page === 'questions'"></polls-questions>
          <polls-logic v-else-if="tab.page === 'logic'"></polls-logic>
          <polls-terms v-else-if="tab.page === 'terms'"></polls-terms>
          <polls-respondents v-else-if="tab.page === 'respondents'"></polls-respondents>
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
    }
  },
  methods: {
    setCurrentTab(currentTab) {
      this.$store.commit('polls/SAVE_CURRENT_TAB', currentTab)
    }
  }
}
</script>
