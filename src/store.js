import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import router from './router';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'currency-app',
  storage: localStorage,
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    currencies: [],
  },
  mutations: {
    add(state, currency) {
      const { currencies } = state;

      currencies.push(currency);
      state.currencies = currencies;
    },
    edit(state, currency) {
      const { currencies } = state;

      const foundIndex = currencies.findIndex(curr => curr.id === currency.id);
      if (foundIndex === -1) {
        router.push('/add');
      }
      currencies[foundIndex] = currency;

      state.currencies = currencies;
    },
    delete(state, currency) {
      const { currencies } = state;

      state.currencies.splice(currencies.indexOf(currency), 1);
    },
  },
  actions: {
    addNewCurrency({ commit }, currency) {
      commit('add', currency);
    },
    editCurrency({ commit }, currency) {
      commit('edit', currency);
    },
    deleteCurrency({ commit }, currency) {
      commit('delete', currency);
    },
  },
  getters: {
    getCurrencies: state => state.currencies,
    getCurrencyById: state => id => state.currencies.find(c => c.id === id),
  },
});
