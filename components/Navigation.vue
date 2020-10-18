<template>
  <div class="d-flex align-items-center">
    <b-icon-house-door class="m-0 h5 mr-2"></b-icon-house-door>
    <b-icon-arrow-right class="m-0 mr-2 custom_icon-arrow"></b-icon-arrow-right>
    <span :class="childPage ? 'mr-2' : ''">{{ setCurrentPage(link) ? setCurrentPage(link).title : null }}</span>
    <template v-if="childPage">
      <b-icon-arrow-right class="m-0 mr-2 custom_icon-arrow"></b-icon-arrow-right>
      <span>{{ childPage }}</span>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    props: {
      source: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        menuItems: [
          { page: 'polls-manage', title: 'Опросы' },
          { page: 'users-manage', title: 'Пользователи' },
          { page: 'blacklist-manage', title: 'Черные списки' },
          { page: 'callcenter-manage', title: 'Колл-центр' },
        ],
      }
    },
    computed: {
      link() {
        return this.$route.name
      },
      childPage() {
        let link = null
        switch (this.source) {
          case 'polls_manage':
            link = JSON.parse(JSON.stringify(this.$store.getters['polls/getCurrentTab']))
            break
        }
        return link
      }
    },
    methods: {
      setCurrentPage(link) {
        return this.menuItems.find((menuItem) => menuItem.page === link) || { page: null, title: 'Страница не найдена' }
      },
    }
  }
</script>
