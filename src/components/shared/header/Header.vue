<template>
  <nav class="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0">
    <router-link class="navbar-brand col-sm-3 mr-0 main-nav__logo" to="/">M</router-link>
    <a class="w-100 mb-0 main-nav__title" to="/">Currencies</a>
  </nav>
</template>

<script>
export default {
  name: "Header",
  components: {}
};
</script>

<style lang="scss">
.main-nav {
  &__logo {
    background-color: #e35b00;
    color: white !important;
  }

  &__title {
    background-color: #fe660f;
    padding: 0.5rem 1.9rem;
    color: white !important;

    &:hover {
      color: white;
      text-decoration: none;
    }
  }
}
</style>
