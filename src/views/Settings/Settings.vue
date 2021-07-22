<template>
  <div class="profile-page">
    <page-loading :loading="loading"></page-loading>

    <v-container fluid>
      <v-row v-if="!loading">
        <v-col cols="12" xs="12" md="4" offset-md="4">
          <v-card>
            <v-card-title>
              <h1>Password change</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field id="oldPassword" v-model="passwords.oldPassword" name="oldPassword" label="Old Password" type="password" data-vv-name="oldPassword" solo class="rounded-0" />
              <v-text-field id="newPassword" v-model="passwords.newPassword" name="newPassword" label="New Password" type="password" data-vv-name="newPassword" solo class="rounded-0" />
              <v-btn color="primary" @click="passwordUpdater()">Update password</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import ItemSearchInput from '@/components/ItemSearchInput/ItemSearchInput.vue';
  import LoadingButton from '@/components/LoadingButton/LoadingButton.vue';
  import PageLoading from '@/components/PageLoading/PageLoading.vue';
  import { namespace } from 'vuex-class';
  import userAuthMixin from '@/mixins/userAuthMixin';
  const shared = namespace('shared');

  const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

  @Component({
    components: { ItemSearchInput, LoadingButton, PageLoading },
  })
  export default class Settings extends Mixins(userAuthMixin) {
    @shared.Getter
    public LOGIN_STATE!: boolean;

    @shared.Getter
    public USER_INFO!: any;

    public loading = true;
    public apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

    public passwords = {
      user_id: '',
      oldPassword: '',
      newPassword: '',
    };

    // lifecycle
    created(): void {
      this.redirectIfNotLoggedIn();
      this.passwords.user_id = this.USER_INFO.userId;
    }

    mounted(): void {
      this.loading = false;
    }

    // methods
    public async passwordUpdater(): Promise<void> {
      this.loading = true;
      console.log('this.passwords: ', this.passwords);

      await this.updatePassword(this.passwords)
        .then((res) => {
          console.log('password updated! ', res);
        })
        .catch((err) => {
          console.error('Password is not changed: ', err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
</script>
