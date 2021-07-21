<template>
  <div class="upload">
    <v-container fluid>
      <v-row>
        <v-col xs="12"> </v-col>
      </v-row>

      <v-row>
        <v-col xs="12" md="6" class="offset-md-3">
          <v-card>
            <v-card-title>
              <h1>Submit your glam</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                id="name"
                v-model="glam.name"
                name="name"
                type="text"
                label="Glam Name"
                data-vv-name="name"
                required
                filled
                class="rounded-0"
              />

              <v-textarea
                id="description"
                v-model="glam.description"
                name="description"
                type="text"
                label="Glam Description"
                data-vv-name="description"
                required
                filled
                class="rounded-0"
              />

              <v-select
                v-model="glam.jobs"
                :items="jobs"
                label="Jobs"
                filled
                multiple
              ></v-select>

              <v-select
                v-model="glam.gender"
                :items="genders"
                label="Gender"
                filled
              ></v-select>

              <v-row>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="computedWeapon"
                    :labelText="'Weapon'"
                    :placeholderText="'Search for a weapon'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.SHIELD"
                    :labelText="'Off-hand'"
                    :placeholderText="'Search for an off-hand'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
              </v-row>

              <v-row>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.HELMET"
                    :labelText="'Helmet'"
                    :placeholderText="'Search for a helmet'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>

                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.EARRING"
                    :labelText="'Earring'"
                    :placeholderText="'Search for an earring'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
              </v-row>

              <v-row>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.CHEST"
                    :labelText="'Chest'"
                    :placeholderText="'Search for a chest piece'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.NECKLACE"
                    :labelText="'Necklace'"
                    :placeholderText="'Search for a necklace'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
              </v-row>

              <v-row>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.HANDS"
                    :labelText="'Hands'"
                    :placeholderText="'Search for a pair of gloves'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>

                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.BRACELET"
                    :labelText="'Bracelet'"
                    :placeholderText="'Search for a bracelet'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
              </v-row>

              <v-row>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.LEGS"
                    :labelText="'Legs'"
                    :placeholderText="'Search for a pair of pants'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>

                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.RING"
                    :labelText="'Left ring'"
                    :placeholderText="'Search for a ring'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
              </v-row>

              <v-row>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.BOOTS"
                    :labelText="'Boots'"
                    :placeholderText="'Search for a pair of boots'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
                <v-col xs="12" sm="6">
                  <item-search-input
                    :equipmentSlot="equipmentSlots.RING"
                    :labelText="'Right ring'"
                    :placeholderText="'Search for a ring'"
                    @item-select="updateGlamModel"
                  ></item-search-input>
                </v-col>
              </v-row>

              <v-file-input
                truncate-length="50"
                @change="onSelect($event)"
                multiple
                ref="imageUpload"
                name="multi-files"
              ></v-file-input>

              <button @click="printObject(glam)">Hello</button>

              <loading-button
                :color="'primary'"
                :type="'submit'"
                :buttonText="'SUBMIT'"
                :show="loading"
                :disableButton="loading"
                :waitingMessage="'Waking up server. Please hang on'"
                @click.native="printObject(glam)"
              ></loading-button>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Watch, Ref } from 'vue-property-decorator';
  import Axios from 'axios';
  import ItemSearchInput, {
    equipmentSlots,
  } from '@/components/ItemSearchInput/ItemSearchInput.vue';
  import LoadingButton from '@/components/LoadingButton/LoadingButton.vue';
  import { namespace } from 'vuex-class';
  import userAuthMixin from '@/mixins/userAuthMixin';
  import { IGlam } from '@/interface/glam';
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

    @Ref('imageUpload') readonly imageUpload!: HTMLInputElement;

    public states: [] = [];
    public items: [] = [];
    public loading = false;
    public search = null;
    public select = null;
    public _timerId: any;
    public equipmentSlots = equipmentSlots;

    public formData = new FormData();
    public file: any;

    public glam = {
      user_id: this.USER_ID,
      name: '',
      description: '',
      jobs: [],
      gender: '',
      screenshots: [],
      items: {
        weapon: {},
        shield: {},
        helmet: {},
        chest: {},
        hands: {},
        legs: {},
        feet: {},
        earring: {},
        necklace: {},
        bracelet: {},
        ringOne: {},
        ringTwo: {},
      },
    };

    public jobs = [
      'Paladin',
      'Warrior',
      'Dark Knight',
      'Gunbreaker',
      'White Mage',
      'Scholar',
      'Astrologian',
      'Sage',
      'Monk',
      'Dragoon',
      'Samurai',
      'Ninja',
      'Reaper',
      'Bard',
      'Machinist',
      'Dancer',
      'Black Mage',
      'Red Mage',
      'Summoner',
      'Blue Mage',
      'Miner',
      'Botanist',
      'Fisher',
      'Carpenter',
      'Blacksmith',
      'Armorer',
      'Culinarian',
      'Weaver',
      'Alchemist',
      'Goldsmith',
      'Leatherworker',
    ];

    public genders = ['Male', 'Female', 'Unisex'];

    get computedWeapon(): number {
      if (
        this.glam.jobs.length == 1 &&
        this.glam.jobs.find((item) => item == 'Paladin')
      ) {
        return 1;
      } else if (this.glam.jobs.length > 1) {
        return equipmentSlots.WEAPON;
      } else {
        return equipmentSlots.WEAPON;
      }
    }

    @Watch('search')
    onChildChanged(val: string): void {
      if (!val) {
        return;
      }

      this.fetchEntriesDebounced();
    }

    @Watch('select')
    onChildChangedTwo(val: string): void {
      if (!val) {
        return;
      }
    }

    created(): void {
      this.redirectIfNotLoggedIn();
      this.glam.user_id = this.USER_ID;
    }

    public onSelect(event: any): void {
      const files = event;

      files.forEach((file: any) => {
        this.formData.append('multi-files', file);
      });
    }

    public async printObject(glam: IGlam): Promise<void> {
      try {
        // send the images and return the image paths after upload
        await Axios.post(
          `${apiEndpoint}/userGlamScreenshot/${this.USER_ID}`,
          this.formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: '*/*',
            },
            withCredentials: true,
          }
        )
          .then((res) => {
            console.log('res: ', res);
            // set the screenshot arrays
            this.glam.screenshots = res.data.files;

            // post the glam after the screenshots have been updated

            Axios.post(`${apiEndpoint}/userGlamPost/${this.USER_ID}`, glam, {
              withCredentials: true,
            })
              .then((res) => {
                console.log('result: ', res);
              })
              .catch((err) => {
                console.error('Err: ', err);
              });
          })
          .catch((err) => {
            console.log('axios error: ', err);
          })
          .finally(() => {
            this.$router.push({ path: '/glams' });
          });
      } catch (err) {
        console.error('try/catch error: ', err);
      }
    }

    public updateGlamModel(equipmentSlot: string, payload: any): void {
      switch (equipmentSlot) {
        case 13:
          this.glam.items.weapon = payload;
          break;
        case 1:
          this.glam.items.weapon = payload;
          break;
        case 2:
          this.glam.items.shield = payload;
          break;
        case 3:
          this.glam.items.helmet = payload;
          break;
        case 4:
          this.glam.items.chest = payload;
          break;
        case 5:
          this.glam.items.hands = payload;
          break;
        case 7:
          this.glam.items.legs = payload;
          break;
        case 8:
          this.glam.items.feet = payload;
          break;
        case 9:
          this.glam.items.earring = payload;
          break;
        case 10:
          this.glam.items.necklace = payload;
          break;
        case 11:
          this.glam.items.bracelet = payload;
          break;
        case 12:
          this.glam.items.ringOne = payload;
          this.glam.items.ringTwo = payload;
          break;
        default:
          break;
      }
    }

    public fetch(): void {
      Axios.get(
        `https://xivapi.com/search?pretty=1&indexes=item&columns=ID,Icon,Name,LevelItem,ItemKind.Name,EquipSlotCategory.ID&string=${this.search}&filters=EquipSlotCategory.ID=5`
      ).then((res) => {
        this.items = res.data.Results;
      });
    }

    public fetchEntriesDebounced(): void {
      // cancel pending call
      clearTimeout(this._timerId);

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.fetch();
      }, 500);
    }
  }
</script>

<style lang="scss">
  @import './upload';
</style>
