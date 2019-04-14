<template>
  <div id="app">
    <Header/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar :key="`sidebar_${sidebar_key}`"/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/shared/header/Header.vue";
import Sidebar from "@/components/shared/sidebar/Sidebar.vue";

export default {
  data() {
    return {
      sidebar_key: 0
    };
  },
  components: {
    Header,
    Sidebar
  },
  mounted() {
    this.$store.subscribe(mutation => {
      if (mutation.type === "edit") {
        this.sidebar_key += 1;
      }
    });
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

.active {
  color: #fe660f;
}
</style>
