import Vue from 'vue';
import Vuex from 'vuex';

import sharedModule from './modules/shared'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    shared: sharedModule,
  },

  // The state that contains the data
  state: {
    loading: false,
    darkTheme: false,
  },

  // Mutations set/change the state, should ideally need actions to run
  mutations: {
    setDarkTheme(state, darkTheme) {
      state.darkTheme = darkTheme
    },

    changeLoadingState(state, loading) {
      state.loading = loading
    },
  },

  // Actions call a mutation with data as a param, in order to save/change data
  // Can use ...mapActions([])
  actions: {
    setDarkTheme({
      commit,
    }, darkTheme) {
      commit('setDarkTheme', darkTheme)
    },

    setLoadingState({
      commit,
    }, loading) {
      commit('changeLoadingState', loading)
    },
  },

  // Used in the frontend to display the data
  // Can use ...mapGetters([])
  getters: {
    DARKTHEME: state => state.darkTheme,

    LOADING: state => state.loading,
  },
})

export default store