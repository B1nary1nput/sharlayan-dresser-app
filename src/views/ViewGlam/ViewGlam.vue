<template>
  <div class="view-glam">
    <page-loading :loading="loading"></page-loading>

    <v-container fluid v-if="glam">
      <v-carousel v-if="glam.screenshots" hide-delimiters cycle interval="15000">
        <v-carousel-item v-for="(item, i) in glam.screenshots" :key="i" :src="item.location" eager />
      </v-carousel>

      <v-row
        class="glam"
        v-if="!loading"
        :style="{
          top: `-${scrollPosition}px`,
        }"
      >
        <v-col cols="12" xs="12" md="6" offset-md="3" lg="4" offset-lg="4">
          <v-card class="rounded-0" :class="{ 'no-carousel': !glam.screenshots }">
            <v-card-text>
              <v-row>
                <v-col order="1" order-md="2" cols="12" xs="12" md="5">
                  <div class="job-bar" v-if="glam.jobs">
                    <!-- <p v-if="glam.jobs.length >= 1">Works with:</p> -->
                    <span v-for="(job, index) in glam.jobs" :key="index">
                      <img :src="require(`../../assets/icons/jobs/${generateJobIcon(job)}`)" :alt="`Icon for ${job}`" :title="job" />
                    </span>
                  </div>
                </v-col>

                <v-col order="2" order-md="1" cols="12" md="7">
                  <h1>{{ glam.name }}</h1>
                  <p>{{ glam.description }}</p>
                </v-col>
              </v-row>

              <v-row no-gutter v-if="glam.items">
                <v-col cols="12" xs="12" v-if="glam.items.weapon">
                  <item-display :glamObject="glam.items.weapon" :labelText="'Weapon'"></item-display>
                </v-col>

                <v-col cols="12" xs="12" v-if="glam.items.shield">
                  <item-display :glamObject="glam.items.shield" :labelText="'Off-hand'"></item-display>
                </v-col>

                <v-col cols="12" xs="12" v-if="glam.items.helmet">
                  <item-display :glamObject="glam.items.helmet" :labelText="'Head'"></item-display>
                </v-col>

                <v-col cols="12" xs="12" v-if="glam.items.chest">
                  <item-display :glamObject="glam.items.chest" :labelText="'Chest'"></item-display>
                </v-col>

                <v-col cols="12" xs="12" v-if="glam.items.hands">
                  <item-display :glamObject="glam.items.hands" :labelText="'Hands'"></item-display>
                </v-col>

                <v-col cols="12" xs="12" v-if="glam.items.legs">
                  <item-display :glamObject="glam.items.legs" :labelText="'Legs'"></item-display>
                </v-col>

                <v-col cols="12" xs="12" v-if="glam.items.feet">
                  <item-display :glamObject="glam.items.feet" :labelText="'Feet'"></item-display>
                </v-col>
              </v-row>

              <v-row v-if="rightSideCheck()">
                <v-col cols="12" xs="12" v-if="glam.items.earring">
                  <item-display :glamObject="glam.items.earring" :labelText="'Earring'"></item-display>
                </v-col>

                <v-col cols="12" xs="12">
                  <item-display :glamObject="glam.items.necklace" :labelText="'Necklace'"></item-display>
                </v-col>

                <v-col cols="12" xs="12">
                  <item-display :glamObject="glam.items.bracelet" :labelText="'Bracelet'"></item-display>
                </v-col>

                <v-col cols="12" xs="12">
                  <item-display :glamObject="glam.items.ringTwo" :labelText="'Ring'"></item-display>
                </v-col>

                <v-col cols="12" xs="12">
                  <item-display :glamObject="glam.items.ringOne" :labelText="'Ring'"></item-display>
                </v-col>
              </v-row>

              <v-row class="delete-button">
                <v-col cols="12" xs="12">
                  <confirm-dialog :buttonText="'Delete'" :glam="glam" @confirm-dialog="test(glam)"></confirm-dialog>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import Axios from 'axios';
  import PageLoading from '@/components/PageLoading/PageLoading.vue';
  import { namespace } from 'vuex-class';
  import userAuthMixin from '@/mixins/userAuthMixin';
  import apiMethods from '@/mixins/apiMethods';
  import ItemDisplay from '@/components/ItemDisplay/ItemDisplay.vue';
  import ConfirmDialog from '@/components/organisms/ConfirmDialog/ConfirmDialog.vue';
  import { IGlam } from '@/interface/glam';
  const shared = namespace('shared');

  const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

  @Component({
    components: { ItemDisplay, PageLoading, ConfirmDialog },
  })
  export default class ViewGlam extends Mixins(userAuthMixin, apiMethods) {
    @shared.Getter
    public LOGIN_STATE!: boolean;

    @shared.Getter
    public USER_ID!: string;

    public glam: any = {};
    public loading = true;
    public _timerId: any;
    public scrollPosition = 0;
    public apiEndpoint = apiEndpoint;

    // lifecycle
    created(): void {
      window.addEventListener('scroll', this.handleScroll);
    }

    mounted(): void {
      // check if user is logged in
      this.redirectIfNotLoggedIn();

      const { id } = this.$router.currentRoute.params;

      Axios.get(`${apiEndpoint}/userGlamGet/${this.USER_ID}/${id}`, {
        withCredentials: true,
      })
        .then((res) => {
          this.glam = res.data.glams;
        })
        .catch((err) => {
          console.error('Error: ', err);
        })
        .finally(() => {
          this.loading = false;
        });

      // this.handleScroll();
    }

    destroyed(): void {
      window.removeEventListener('scroll', this.handleScroll);
    }

    // methods
    // translate the job to which icon to show
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

    // for making a cheap parallax, scroll down, the item card goes up
    public handleScroll(): void {
      // Any code to be executed when the window is scrolled
      if (window.innerWidth > 600) {
        this.scrollPosition = window.scrollY / 3;
      } else {
        this.scrollPosition = window.scrollY / 4;
      }
    }

    // if there are no right-side items, don't display that section
    public rightSideCheck(): boolean {
      if (!this.glam.items || (!this.glam.items.earring && !this.glam.items.necklace && !this.glam.items.bracelets && !this.glam.items.ringOne && !this.glam.items.ringTwo)) {
        return false;
      } else {
        return true;
      }
    }

    public test(glam: IGlam): void {
      this.loading = true;

      this.deleteGlam(glam)
        .then((response) => {
          this.$router.push({ path: '/glams' });
        })
        .catch((err) => {
          console.error('Error: ', err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
</script>

<style lang="scss" scoped>
  @import './view-glam.scss';
</style>
