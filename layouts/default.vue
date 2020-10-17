<template>
  <div class="d-flex overflow-hidden">
    <Header class="header"/>
    <nuxt/>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/app.scss';
</style>

<script>
import Header from "../components/Header";
export default {
  components: {Header}
}
</script>
