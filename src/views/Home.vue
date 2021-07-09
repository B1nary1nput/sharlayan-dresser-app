<template>
  <v-layout row wrap justify-end align-center :class="{ hidden: !isLoggedIn }">
    <v-flex xs12 lg1 class="filler"> </v-flex>
    <v-flex xs12 lg6 class="welcome">
      <h1>Sharlayan Dresser</h1>
      <h2>Your unlimited glam storage</h2>
    </v-flex>

    <v-flex xs12 lg4 class="login-form rounded-0">
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

            <div class="signup__link text-xs-center" style="display: none;">
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

    <v-flex xs12 lg1 class="filler"></v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import HelloWorld from '../components/HelloWorld.vue';
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
  export default class Home extends Mixins(userAuthMixin) {
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

<style lang="scss">
  form {
    width: 100%;
  }

  .login__form .v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: hsl(0, 0%, 94%) !important;
  }

  .signup__link {
    margin-top: 60px;
    opacity: 0.6;

    a {
      text-decoration: none;
      color: initial;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .layout {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    background-image: url('../assets/loginbackground.png');
    background-size: cover;

    > .login-form {
      position: relative;
      right: -50px;
      backdrop-filter: blur(10px);

      .v-sheet {
        background-color: transparent;
      }
    }

    > .welcome {
      min-height: 400px;
      text-align: center;
      padding: 150px 0;
      color: #fff;
      filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.7));

      h1 {
        font-size: 56px;
      }

      h2 {
        font-size: 20px;
      }
    }
  }

  .v-sheet.v-card {
    border-radius: 0 !important;
  }
</style>
