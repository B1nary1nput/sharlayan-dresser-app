<template>
  <v-layout row wrap class="confirm-page">
    <v-flex xs12 md7 class="filler"> </v-flex>

    <v-flex xs10 md4 class="login-form rounded-0">
      <v-alert v-if="error_message" :value="true" type="error" dismissible>{{
        error_message
      }}</v-alert>
      <v-card>
        <v-card-title>
          <h1>Confirmation</h1>
        </v-card-title>

        <v-card-text>
          <div v-if="!error_message">
            <h2>Congratulations!</h2>
            <p>
              Your account for 'Sharlayan Dresser' has now been confirmed! We're
              happy that you are interested in checking out this tool.
            </p>
            <br />
            <h2>Next steps</h2>
            <p>
              You can now login and start uploading the glams you wish to save
              indefinitely! (or until the server is no longer maintained)
            </p>

            <p>To log in you can click the button to go to the login page.</p>

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

          <div v-else>
            <h2>Uh oh....</h2>
            <p>
              It seems like the account you're trying to confirm, already has
              been confirmed.
            </p>
            <br />
            <h2>Next steps</h2>
            <p>
              You can now login and start uploading the glams you wish to save
              indefinitely! (or until the server is no longer maintained)
            </p>

            <p>To log in you can click the button to go to the login page.</p>

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
  import { Component, Vue, Mixins } from 'vue-property-decorator';
  import userAuthMixin from '@/mixins/userAuthMixin';

  @Component
  export default class Confirm extends Mixins(userAuthMixin) {
    public routerParams: any;
    public error_message = '';

    mounted(): void {
      if (this.$router.currentRoute.params) {
        this.routerParams = this.$router.currentRoute.params;
      }

      this.confirmUser(this.routerParams.id).then((response: any) => {
        console.log('response: ', response);
        if (response.status !== 500) {
          console.log('it went through: ', response);
        } else {
          this.error_message = response.data.message;
        }
      });
    }

    public loginNavigation() {
      this.$router.push('/login');
    }
  }
</script>

<style lang="scss" scoped>
  @import './confirm';
</style>
