import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./plugins/store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  validations: {},
  render: (h) => h(App),
}).$mount("#app");
