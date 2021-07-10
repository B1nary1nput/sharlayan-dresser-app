<template>
  <v-layout row wrap :class="{ hidden: !isLoggedIn }" class="login-page">
    <v-flex xs12 md1 class="filler"> </v-flex>
    <v-flex xs12 md6 class="welcome">
      <h1>Sharlayan Dresser</h1>
      <h2>Your unlimited glam storage</h2>
    </v-flex>

    <v-flex xs10 md4 class="login-form rounded-0">
      <v-alert v-if="error_message" :value="true" type="error" dismissible>{{
        error_message
      }}</v-alert>
      <v-card>
        <v-card-title>
          <form @submit.prevent>
            <v-text-field
              id="username"
              v-model="username"
              name="username"
              type="text"
              label="Username"
              data-vv-name="username"
              required
              solo
              class="rounded-0"
            />

            <v-text-field
              id="password"
              v-model="password"
              name="password"
              label="Password"
              type="password"
              data-vv-name="password"
              required
              solo
              class="rounded-0"
            />
            <span v-if="error_message" style="float:right;">
              <router-link :to="'/forgot-password'"
                >Forgot password?</router-link
              >
            </span>

            <v-checkbox
              v-model="rememberMe"
              label="Remember me"
              class="rounded-0"
            />

            <v-btn
              color="primary"
              type="submit"
              block
              @click="sendForm"
              class="rounded-0"
            >
              Login
            </v-btn>

            <div class="signup__link text-xs-center">
              <p>
                Don't have an account?
                <router-link :to="'/signup'">
                  Register here
                </router-link>
              </p>
            </div>
          </form>
        </v-card-title>
      </v-card>
    </v-flex>

    <v-flex xs12 md1 class="filler"></v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import HelloWorld from '../../components/HelloWorld.vue';
  import userAuthMixin from '@/mixins/userAuthMixin';
  import { mapActions, mapGetters } from 'vuex';
  import { namespace } from 'vuex-class';
  const shared = namespace('shared');

  @Component({
    components: {
      HelloWorld,
    },
    mixins: [userAuthMixin],
    methods: {
      ...mapActions(['setLoadingState']),
    },
  })
  export default class Login extends Mixins(userAuthMixin) {
    @shared.Getter
    public LOGIN_STATE!: boolean;

    @shared.Action
    public saveFooterState!: (newName: boolean) => void;
    public setLoadingState!: (newName: boolean) => void;

    public username = '';
    public password = '';
    public error_message = '';
    public rememberMe = false;

    public isLoggedIn = true;

    beforeCreate(): void {
      // let localStorageLogin = localStorage.getItem('loggedIn') == "1"
      // let storeLoginState = this.LOGIN_STATE ? this.LOGIN_STATE : localStorageLogin
      // if (localStorageLogin) {
      //   this.$router.push('About')
      //   this.$router.push({ path: `/about` });
      // } else {
      //   this.isLoggedIn = false;
      // }
    }

    public sendForm(): void {
      const userInfo = {
        username: this.username,
        password: this.password,
        remember_me: this.rememberMe,
      };

      this.setLoadingState(true);

      setTimeout(() => {
        this.login(userInfo).then((result: any) => {
          if (result) {
            if (result.data.message !== 'Invalid login') {
              localStorage.user_id = result.data.id;

              // this.saveFooterState(true);
              this.$router.push('About');
              this.$router.push({ path: `/about` });
              console.log('sendform: ', this.LOGIN_STATE);
            } else {
              this.error_message = result.data.message;
            }
          } else {
            console.log('nothingfwe');
          }
        });
      }, 2000); // simulate waiting for request
    }
  }
</script>

<style lang="scss" scoped>
  @import './login';
</style>
