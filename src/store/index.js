import { createStore } from 'vuex';
import getters from './getters.js';
import createPersistedState from "vuex-persistedstate";

// https://vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.js');

//console.log(modulesFiles, 'modulesFiles');
let modules = {};
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
  modules[moduleName] = modulesFiles[path].default;
}

Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true;
});
//const PERSIST_PATHS = ['routes','setting','tabsBar', 'user'];
const PERSIST_PATHS = ['setting']
const store = new createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,
  getters,
  plugins: [createPersistedState({
    key: "__vue3Admin",
    storage: window.localStorage,
    paths: PERSIST_PATHS // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c 
  })]
});

export default store;