<template>
  <div class="profile-page">
    <v-container fluid>
      <v-row>
        <v-col xs="12">
          <h1>Your profile</h1>
        </v-col>
      </v-row>

      <v-row v-if="!loading">
        <v-col xs="12" md="3" v-for="(glam, index) in glams" :key="index">
          <v-card
            :style="{
              backgroundImage:
                glam.screenshots.length >= 1
                  ? `url(http://localhost:3000/${glam.screenshots[0].destination}/${glam.screenshots[0].filename})`
                  : '',
            }"
          >
            <div class="hover">
              <div class="text">
                <h1>{{ glam.name }}</h1>
                <p>{{ glam.description }}</p>
              </div>

              <div class="job-bar" v-if="glam.jobs">
                <p v-if="glam.jobs.length >= 1">Works with:</p>
                <span v-for="(job, index) in glam.jobs" :key="index">
                  <img
                    :src="
                      require(`../../assets/icons/jobs/${generateJobIcon(job)}`)
                    "
                    :alt="`Icon for ${job}`"
                    :title="job"
                  />
                </span>
              </div>
            </div>
            <!-- <v-card-title> {{ glam.name }} {{ index }} </v-card-title> -->

            <!-- <v-card-text> -->
            <!-- {{ glam.screenshots.length }}
              <img
                v-if="glam.screenshots.length >= 1"
                :src="`http://localhost:3000/${glam.screenshots[index].path}`"
                alt=""
              /> -->
            <!-- <span v-if="glam.items.weapon">
                Weapon: {{ glam.items.weapon.Name }}
              </span> -->
            <!-- <br />
              <div v-if="glam.items">
                <span v-if="glam.items.shield">
                  Off-Hand: {{ glam.items.shield.Name }}
                </span>
                <br />
                <span v-if="glam.items.helmet">
                  Helmet: {{ glam.items.helmet.Name }}
                </span>
                <br />
                <span v-if="glam.items.chest">
                  Chest: {{ glam.items.chest.Name }}
                </span>
                <br />
                <span v-if="glam.items.hands">
                  Hands: {{ glam.items.weapon.Name }}
                </span>
                <br />
                <span v-if="glam.items.legs">
                  Legs: {{ glam.items.legs.Name }}
                </span>
                <br />
                <span v-if="glam.items.feet">
                  Feet: {{ glam.items.feet.Name }}
                </span>
              </div>
            </v-card-text> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Mixins, Watch } from 'vue-property-decorator';
  import Axios from 'axios';
  import ItemSearchInput, {
    equipmentSlots,
  } from '@/components/ItemSearchInput/ItemSearchInput.vue';
  import LoadingButton from '@/components/LoadingButton/LoadingButton.vue';
  import EventBus from '@/EventBus';
  import { namespace } from 'vuex-class';
  import userAuthMixin from '@/mixins/userAuthMixin';
  const shared = namespace('shared');

  const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

  @Component({
    components: { ItemSearchInput, LoadingButton },
  })
  export default class Upload extends Mixins(userAuthMixin) {
    @shared.Getter
    public LOGIN_STATE!: boolean;

    @shared.Getter
    public USER_ID!: string;

    public glams: [] = [];
    public loading = true;
    public _timerId: any;

    // lifecycle
    created(): void {
      this.redirectIfNotLoggedIn();
    }

    mounted(): void {
      Axios.get(`${apiEndpoint}/userGlamsGet/${this.USER_ID}`, {
        withCredentials: true,
      }).then((res) => {
        console.log('profile result: ', res);
        this.glams = res.data.glams;
        this.loading = false;
      });
    }

    // methods
    public printObject(glam: any): void {
      Axios.post(`http://localhost:3000/${this.USER_ID}/glams`, glam, {
        withCredentials: true,
      })
        .then((res) => {
          console.log('result: ', res);
        })
        .catch((err) => {
          console.error('Err: ', err);
        });
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
  }
</script>

<style lang="scss">
  @import './profile';
</style>
