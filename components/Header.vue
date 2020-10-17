<template>
  <b-navbar toggleable="lg" type="light" class="bg-white d-flex flex-column align-items-center">
    <b-navbar-brand href="#" class="m-0 mb-4">
      <b-icon-circle-fill class="m-0 h1" variant="info"></b-icon-circle-fill>
    </b-navbar-brand>
    <b-collapse id="nav-collapse" class="d-flex flex-column align-items-center" is-nav>
      <b-navbar-nav class="d-flex flex-column">
        <b-nav-item
          v-for="(link, key) in menuItems"
          :key="key"
          :to="{ name: `${link.page}-manage` }"
          class="mb-2"
        >
          <div class="d-flex flex-column align-items-center w-100">
            <b-icon-file-earmark-text v-if="link.page === 'polls'" class="m-0 custom_icon-header"></b-icon-file-earmark-text>
            <b-icon-person v-else-if="link.page === 'users'" class="m-0 custom_icon-header"></b-icon-person>
            <b-icon-flag v-else-if="link.page === 'blacklist'" class="m-0 custom_icon-header"></b-icon-flag>
            <b-icon-telephone v-else-if="link.page === 'callcenter'" class="m-0 custom_icon-header"></b-icon-telephone>
            <span class="mt-1">{{ link.title }}</span>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
name: "Header",
  data() {
    return {
      menuItems: [
        { page: 'polls', title: 'Опросы' },
        { page: 'users', title: 'Пользователи' },
        { page: 'blacklist', title: 'Черные списки' },
        { page: 'callcenter', title: 'Колл-центр' },
      ],
    }
  },
}
</script>
