import axios, { AxiosRequestConfig } from "axios"

import router from '@/router'
import { Module } from 'vuex'

const sharedModule: Module<any, any> = {
  namespaced: true,
  // The state that contains the data
  state: {
    drawer: true,
    loggedIn: false,
    footerState: true,
    toolbar: false,
    userId: '',
    userInfo: {
      username: '',
      userId: ''
    },
    currentOrder: 1
  },

  // Mutations set/change the state, should ideally need actions to run
  mutations: {
    setDrawer(state, drawerState) {
      state.drawer = drawerState
    },

    setLoginState(state, loginState) {
      state.loggedIn = loginState
    },

    setFooterState(state, visibility) {
      state.footerState = visibility
    },

    setToolbarState(state, visibility) {
      state.toolbarState = visibility
    },

    setUserIdState(state, userIdState) {
      state.userId = userIdState;
    },

    setUserInfoState(state, userInfoState) {
      state.userInfo = userInfoState;
    },

    setCurrentOrderState(state, currentOrderState) {
      state.currentOrder = currentOrderState;
    }
  },

  // Actions call a mutation with data as a param, in order to save/change data
  // Can use ...mapActions([])
  actions: {
    saveDrawerState({
      commit,
    }, drawerState) {
      commit('setDrawer', drawerState)
    },

    saveUserId({
      commit,
    }, userIdState) {
      commit('setUserIdState', userIdState)
    },

    saveLoginState({
      commit,
    }, loginState) {
      if (localStorage.user_id) {
        commit('setLoginState', true)
        return
      }

      commit('setLoginState', loginState)
    },

    saveToolbarState({
      commit
    }, visibility) {
      if (localStorage.user_id) {
        commit('setToolbarState', visibility)
      }
    },

    saveFooterState({
      commit,
    }, visibility) {
      commit('setFooterState', visibility)
    },

    saveUserInfoState({
      commit,
    }, userInfoState) {
      commit('setUserInfoState', userInfoState);
    },

    saveCurrentOrderState({
      commit,
    }, currentOrderState) {
      commit('setCurrentOrderState', currentOrderState);
    },
  },

  // Used in the frontend to display the data
  // Can use ...mapGetters([])
  getters: {
    DRAWER_STATE: state => state.drawer,

    LOGIN_STATE: state => state.loggedIn,

    TOOLBAR_STATE: state => state.toolbar,

    FOOTER_STATE: state => state.footerState,

    USER_ID: state => state.userId,

    USER_INFO: state => state.userInfo,

    CURRENT_ORDER: state => state.currentOrder
  },
}


export default sharedModule;