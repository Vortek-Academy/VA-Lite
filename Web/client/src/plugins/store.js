import Vue from "vue";
import Vuex from "vuex";
import persisted from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    persisted({
      storage: window.localStorage,
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
