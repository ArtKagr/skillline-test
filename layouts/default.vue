<template>
  <div class="d-flex vh-100 vw-100 overflow-hidden">
      <Header class="header w-10"/>
      <div class="d-flex flex-column w-90">
        <Search class="w-100 align-self-start"/>
        <nuxt class="align-self-stretch w-100 h-100 overflow-hidden"/>
      </div>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/app.scss';
</style>

<script>
import Header from "../components/Header";
import Search from "../components/Search";
export default {
  components: {Search, Header}
}
</script>
