import Vue from 'vue'
import Vuex from 'vuex' 

// import example from './module-example'

Vue.use(Vuex)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
Vue.prototype.$API_URL = "http://143.198.102.185:8080/api/";
import {
  Quasar,
  QUploader,
  Dialog
} from 'quasar'

Vue.use(Quasar, {
  plugins: {
    Dialog,
    QUploader
  }
})
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
