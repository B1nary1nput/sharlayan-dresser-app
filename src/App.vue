<template>
  <v-app dark>
    <v-app-bar app color="primary" dark v-if="loggedIn">
      <v-spacer></v-spacer>
      <v-btn depressed color="primary"
        ><v-icon @click="logout()">{{ logoutIcon }}</v-icon></v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import userAuthMixin from '@/mixins/userAuthMixin';

  import { namespace } from 'vuex-class';
  const shared = namespace('shared');

  @Component
  export default class Home extends Mixins(userAuthMixin) {
    @shared.Getter
    public LOGIN_STATE!: boolean;

    @shared.Action
    public saveFooterState!: (newName: boolean) => void;
    public setLoadingState!: (newName: boolean) => void;

    public logoutIcon = 'logout';

    // computed
    get loggedIn() {
      let localStorageLogin = localStorage.getItem('loggedIn') == '1';
      let storeLoginState = this.LOGIN_STATE
        ? this.LOGIN_STATE
        : localStorageLogin;
      return storeLoginState;
    }

    // lifecycle
    created(): void {
      this.$vuetify.theme.dark = true;
      // this.redirectIfNotLoggedIn();
    }

    // methods
    // ...
  }
</script>

<style lang="scss">
  @import './styles/global';

  [v-cloak] {
    display: none;
  }
  [hidden],
  .hidden {
    display: none !important;
  }
</style>
