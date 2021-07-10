<template>
  <v-layout row wrap :class="{ hidden: !isLoggedIn }" class="signup-page">
    <v-flex xs12 md7 class="filler"> </v-flex>

    <v-flex xs10 md4 class="login-form rounded-0">
      <v-alert v-if="error_message" :value="true" type="error" dismissible>{{
        error_message
      }}</v-alert>
      <v-card>
        <v-card-title>
          <h1 :class="{ hidden: signupComplete }">Signup</h1>
          <h1 :class="{ hidden: !signupComplete }">Signup complete</h1>
        </v-card-title>

        <v-card-text>
          <form
            @submit.prevent
            ref="”form”"
            lazy-validation
            :class="{ hidden: signupComplete }"
          >
            <v-text-field
              id="username"
              ref="usernameInput"
              v-model="username"
              name="username"
              type="text"
              label="Username*"
              :rules="usernameRules"
              @keyup="onSave"
              required
              filled
              autocomplete="off"
              class="rounded-0 white-bg"
            />

            <v-text-field
              id="email"
              ref="emailInput"
              v-model="email"
              name="email"
              type="email"
              label="Email*"
              :rules="emailRules"
              @keyup="onSave"
              required
              filled
              class="rounded-0"
            />

            <v-text-field
              id="firstName"
              ref="firstName"
              v-model="firstName"
              name="firstName"
              type="text"
              label="First name"
              filled
              class="rounded-0"
            />

            <v-text-field
              id="lastName"
              ref="lastName"
              v-model="lastName"
              name="lastName"
              type="text"
              label="Last name"
              filled
              class="rounded-0"
            />

            <v-text-field
              id="password"
              ref="passwordInput"
              v-model="password"
              name="password"
              label="Password*"
              type="password"
              :rules="passwordRules"
              @keyup="onSave"
              required
              filled
              class="rounded-0"
            />

            <v-btn
              :disabled="!valid"
              color="primary"
              type="submit"
              block
              @click="sendForm()"
              class="rounded-0"
            >
              Signup
            </v-btn>
          </form>

          <div :class="{ hidden: !signupComplete }">
            <h2>Congratulations!</h2>
            <p>
              Your account for 'Sharlayan Dresser' has now been registered!
              We're happy that you are interested in checking out this tool.
            </p>
            <br />
            <h2>Next steps</h2>
            <p>
              To finalize your registration, an email has been sent to you, with
              a link for verifying your account. It might take a couple of
              minutes before you receive it. Remember to double-check the spam
              folder hasn't yoinked it.<br />
              Once your account is verified, you can click the button to go to
              the login page.
            </p>

            <p>Thanks for signing up to the <b>Sharlayan Dresser!</b></p>

            <v-btn
              color="primary"
              type="submit"
              block
              @click="loginNavigation()"
              class="rounded-0"
            >
              GO TO LOGIN
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 md1 class="filler"></v-flex>
  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Ref } from 'vue-property-decorator';
  import { VForm } from '@/types/VForm';
  import { VInput } from '@/types/VInput';
  import userAuthMixin from '@/mixins/userAuthMixin';
  import { mapActions, mapGetters } from 'vuex';

  import { namespace, Action } from 'vuex-class';
  const shared = namespace('shared');

  @Component
  export default class Signup extends Mixins(userAuthMixin) {
    @shared.Getter
    public LOGIN_STATE!: boolean;

    @shared.Action
    public saveFooterState!: (newName: boolean) => void;
    @Action('setLoadingState') setLoadingState!: (newName: boolean) => void;

    @Ref('form') readonly form!: VForm;
    @Ref('emailInput') readonly emailInput!: VInput;
    @Ref('usernameInput') readonly usernameInput!: VInput;
    @Ref('passwordInput') readonly passwordInput!: VInput;

    // variables
    public valid = false;
    public username = '';
    public email = '';
    public firstName = '';
    public lastName = '';
    public password = '';
    public error_message = '';
    public rememberMe = false;
    public isLoggedIn = true;
    public signupComplete = false;

    // Validation rules
    public emailRules = [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ];
    public usernameRules = [(v: string) => !!v || 'Username is required'];
    public passwordRules = [
      (v: string) => !!v || 'Password is required',
      (v: string) =>
        (v && v.length >= 10) || 'Password must be more than 10 characters',
    ];

    public onSave(): void {
      if (
        this.emailInput.validate() &&
        this.usernameInput.validate() &&
        this.passwordInput.validate()
      ) {
        this.valid = true;
      }
    }

    public sendForm(): void {
      const userInfo = {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        rememberMe: false,
      };

      this.setLoadingState(true);

      setTimeout(() => {
        this.signup(userInfo).then((result: any) => {
          if (result) {
            if (result.status !== 500) {
              this.signupComplete = true;
            } else {
              this.error_message = result.data.message;
            }
          } else {
            this.signupComplete = true;
          }
        });
      }, 2000); // simulate waiting for request
    }

    public loginNavigation() {
      this.$router.push('/login');
    }
  }
</script>

<style lang="scss">
  @import './signup';

  .theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
    background: hsl(0, 0%, 94%) !important;
  }

  .hidden {
    display: none !important;
  }
</style>
