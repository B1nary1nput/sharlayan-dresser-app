<template>
  <div class="profile-page">
    <page-loading :loading="loading"></page-loading>

    <v-container fluid>
      <v-row>
        <v-col cols="12" xs="12">
          <h1>Your dresser</h1>
        </v-col>
      </v-row>

      <draggable v-if="!loading" v-model="glams" group="people" @start="drag = true" @end="drag = false" class="row" @change="log($event)">
        <v-col cols="12" xs="12" md="3" v-for="(glam, index) in glams" :key="index">
          <v-card
            @click="viewGlam(glam)"
            :style="{
              backgroundImage: glam.screenshots && glam.screenshots.length >= 1 ? `url(${glam.screenshots[0].location})` : '',
            }"
          >
            <div class="hover">
              <div class="text">
                <h1>{{ glam.order }}</h1>
                <h1>{{ glam.name }}</h1>
                <p>{{ glam.description }}</p>
              </div>

              <div class="job-bar" v-if="glam.jobs">
                <p v-if="glam.jobs.length >= 1">Works with:</p>
                <span v-for="(job, index) in glam.jobs" :key="index">
                  <img :src="require(`../../assets/icons/jobs/${generateJobIcon(job)}`)" :alt="`Icon for ${job}`" :title="job" />
                </span>
              </div>
            </div>
          </v-card>
        </v-col>
      </draggable>

      <v-btn class="upload-button mx-2" fab dark large color="primary" :to="'/upload'">
        <v-icon dark>
          backup
        </v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import Axios from 'axios';
  import ItemSearchInput from '@/components/ItemSearchInput/ItemSearchInput.vue';
  import LoadingButton from '@/components/LoadingButton/LoadingButton.vue';
  import PageLoading from '@/components/PageLoading/PageLoading.vue';
  import { namespace, Action } from 'vuex-class';
  import userAuthMixin from '@/mixins/userAuthMixin';
  import { IGlam } from '@/interface/glam';
  import draggable from 'vuedraggable';
  import apiMethods from '@/mixins/apiMethods';

  const shared = namespace('shared');

  const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

  @Component({
    components: { ItemSearchInput, LoadingButton, PageLoading, draggable },
  })
  export default class Upload extends Mixins(userAuthMixin, apiMethods) {
    @shared.Getter
    public LOGIN_STATE!: boolean;

    @shared.Getter
    public USER_INFO!: any;
    // public CURRENT_ORDER!: any;

    @shared.Action
    public saveCurrentOrderState!: (currentOrder: number) => void;

    public glams: [] = [];
    public loading = true;
    public _timerId: any;
    public apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

    // lifecycle
    mounted(): void {
      this.redirectIfNotLoggedIn();

      Axios.get(`${apiEndpoint}/userGlamsGet/${this.USER_INFO.userId}`, {
        withCredentials: true,
      })
        .then((res) => {
          // sort the glams based on order
          let glams: [] = res.data.glams;
          let sortedGlams = glams.sort((a, b) => a.order - b.order);

          // save and add 1 to current length to find the correct order
          this.saveCurrentOrderState(sortedGlams.length + 1);

          this.glams = sortedGlams;
        })
        .catch((err) => {
          console.error('Error: ', err);
        })
        .finally(() => {
          this.loading = false;
        });
    }

    // methods
    public viewGlam(glam: IGlam): void {
      this.$router.push({ path: `/view-glam/${glam._id}` });
    }

    public generateJobIcon(job: string): string {
      let jobLowerCase = job.toLowerCase();
      let folderId = '062000';

      switch (jobLowerCase) {
        case 'paladin':
          return folderId + '/062119.png';
        case 'warrior':
          return folderId + '/062121.png';
        case 'dark knight':
          return folderId + '/062132.png';
        case 'gunbreaker':
          return folderId + '/062137.png';
        case 'white mage':
          return folderId + '/062124.png';
        case 'scholar':
          return folderId + '/062128.png';
        case 'astrologian':
          return folderId + '/062133.png';
        case 'sage':
          return folderId + '/062128.png';
        case 'monk':
          return folderId + '/062120.png';
        case 'dragoon':
          return folderId + '/062122.png';
        case 'samurai':
          return folderId + '/062134.png';
        case 'ninja':
          return folderId + '/062130.png';
        case 'reaper':
          return folderId + '/062122.png';
        case 'bard':
          return folderId + '/062123.png';
        case 'machinist':
          return folderId + '/062131.png';
        case 'dancer':
          return folderId + '/062138.png';
        case 'black mage':
          return folderId + '/062125.png';
        case 'red mage':
          return folderId + '/062135.png';
        case 'summoner':
          return folderId + '/062127.png';
        case 'blue mage':
          return folderId + '/062136.png';
        case 'miner':
          return folderId + '/062116.png';
        case 'botanist':
          return folderId + '/062117.png';
        case 'fisher':
          return folderId + '/062118.png';
        case 'carpenter':
          return folderId + '/062108.png';
        case 'blacksmith':
          return folderId + '/062109.png';
        case 'armorer':
          return folderId + '/062110.png';
        case 'culinarian':
          return folderId + '/062115.png';
        case 'weaver':
          return folderId + '/062113.png';
        case 'alechemist':
          return folderId + '/062114.png';
        case 'goldsmith':
          return folderId + '/062111.png';
        case 'leatherworker':
          return folderId + '/062112.png';

        default:
          return folderId + '/062142.png';
      }
    }

    public async log(input: any): void {
      const glam = input.moved.element;

      for (let index = 0; index < this.glams.length; index++) {
        const element = this.glams[index];

        element.order = index + 1;

        await Axios.post(`${apiEndpoint}/userGlamUpdate/${this.USER_ID}`, element, {
          withCredentials: true,
        }).catch((err) => {
          console.error('Error: ', err);
        });
      }

      // let toUpdate = this.glams.find((glamElement) => glamElement._id == glam._id);
      // console.log('toUpdate: ', toUpdate);

      // this.updateGlams(this.glams)
      //   .catch((err) => {
      //     console.error('Error: ', err);
      //   })
      //   .finally(() => {
      //     this.loading = false;
      // });
    }
  }
</script>

<style lang="scss">
  @import './profile';
</style>
