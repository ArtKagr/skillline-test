<template>
  <div class="d-flex flex-column px-4">
    <Navigation class="mb-4" source="polls_manage"></Navigation>
    <div>
      <b-tabs>
        <b-tab
          v-for="(tab, key) in pollsTabs"
          :title="tab.title"
          :key="key"
          @click="setCurrentTab(tab.page)"
        >
          <polls-parameters v-if="tab.page === 'parameters'"></polls-parameters>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import PollsParameters from "./parameters";
import Navigation from "../../components/Navigation";
export default {
  name: "Polls",
  components: {Navigation, PollsParameters},
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
  methods: {
    setCurrentTab(currentTab) {
      this.$store.commit('polls/SAVE_CURRENT_TAB', currentTab)
    }
  }
}
</script>
