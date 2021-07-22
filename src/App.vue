<template>
  <v-app dark>
    <v-app-bar app color="test" v-if="loggedIn">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item :to="'/glams'">
            <v-list-item-icon>
              <v-icon>collections</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Glamours</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/upload'">
            <v-list-item-icon>
              <v-icon>backup</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Upload glam</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/settings'">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>

          <v-spacer></v-spacer>
          <v-list-item @click="logout()">
            <v-list-item-icon>
              <v-icon>{{ logoutIcon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
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
    public drawer = false;

    // computed
    get loggedIn(): boolean {
      let localStorageLogin = localStorage.getItem('loggedIn') == '1';
      let storeLoginState = this.LOGIN_STATE ? this.LOGIN_STATE : localStorageLogin;
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

<style lang="scss" scoped>
  @import './styles/global';

  [v-cloak] {
    display: none;
  }
  [hidden],
  .hidden {
    display: none !important;
  }

  .theme--dark.v-application {
    background-image: url('./assets/pattern.png') !important;
    background-position-y: 50% !important;
  }
</style>
