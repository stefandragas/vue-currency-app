<template>
  <div class="main-sidebar col-sm-3">
    <div class="row">
      <div class="col-sm-12">
        <input
          type="text"
          v-model="search"
          class="form-control main-sidebar__input"
          :disabled="!getCurrencies.length"
        >
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <p class="main-sidebar__title">Currency List</p>
      </div>
    </div>
    <ul class="nav flex-column">
      <li class="nav__item" v-for="currency in searchCurrencies" :key="currency.id">
        <router-link
          :to="{ name: `EditCurrency`, params: { id: currency.id, currency: currency }}"
          class="nav__link"
          exact
        >
          <span>{{currency.iso}}</span>
        </router-link>
        <button class="btn btn-sm btn-outline nav__button" @click="deleteCurrency(currency)">Delete</button>
      </li>
      <li class="nav__item" v-if="!searchCurrencies.length && search !== ''">
        <span>Currency Not Found</span>
      </li>
      <li class="nav__item" v-if="!getCurrencies.length">
        <span>No Currencies Available</span>
      </li>
      <li class="nav__item">
        <router-link to="/add" class="nav__link">+ Add currency</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      search: ""
    };
  },
  components: {},
  methods: {
    ...mapActions(["deleteCurrency"])
  },
  computed: {
    ...mapGetters(["getCurrencies"]),
    searchCurrencies() {
      return this.getCurrencies.filter(currency =>
        currency.iso.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>
<style lang="scss">
.main-sidebar {
  min-height: calc(100vh - 56px);
  background-color: #eeeeee;

  &__input {
    margin-top: 1rem;
    border-color: #999;

    &:focus {
      outline: none !important;
      border-color: #999 !important;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1) !important;
    }
  }

  &__title {
    padding: 1rem;
    color: #fe660f;
    margin-bottom: 0;
    border-bottom: 1px solid #fe660f;
  }
}

.nav {
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #999;
    padding: 0.5rem 1rem;
    text-transform: uppercase;

    &:last-child {
      text-transform: none;
    }
  }

  &__button {
    &:active,
    &:focus {
      outline: 0 !important;
      box-shadow: none !important;
    }
  }

  &__link {
    color: #555;

    &:hover,
    &:active {
      color: #555;
      text-decoration: none;
    }
  }
}
</style>
