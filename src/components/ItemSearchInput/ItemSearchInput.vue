<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    :label="labelText"
    class="item-search-input"
    :placeholder="placeholderText"
    no-filter
    filled
    hide-no-data
    hide-details
    return-object
    clearable
    @input="itemSelect(select)"
  >
    <template slot="selection" slot-scope="data">
      {{ data.item.Name }}
    </template>
    <template slot="item" slot-scope="data">
      {{ data.item.Name }}
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import Axios from 'axios';
  import EventBus from '@/EventBus';

  export enum equipmentSlots {
    WEAPON = 13,
    SHIELD = 2,
    HELMET = 3,
    CHEST = 4,
    HANDS = 5,
    BELT = 6,
    LEGS = 7,
    BOOTS = 8,
    EARRING = 9,
    NECKLACE = 10,
    BRACELET = 11,
    RING = 12,
  }

  @Component({
    name: 'item-search-input',
  })
  export default class ItemSearchInput extends Vue {
    public items: [] = [];
    public loading = false;
    public search = null;
    public select = null;
    public _timerId: any;

    @Prop(Number) readonly equipmentSlot!: number;
    @Prop(String) readonly labelText!: string;
    @Prop(String) readonly placeholderText!: string;

    @Watch('search')
    onChildChanged(val: string, oldVal: string) {
      if (!val) {
        return;
      }

      this.fetchEntriesDebounced();
    }

    // @Watch('select')
    // onChildChangedTwo(val: string, oldVal: string) {
    //   if (!val) {
    //     return;
    //   }

    //   this.returnValue(val, this.equipmentSlot);
    // }

    public fetch(): void {
      Axios.get(
        `https://xivapi.com/search?pretty=1&indexes=item&columns=ID,Icon,Name,LevelItem,ItemKind.Name,EquipSlotCategory.ID&string=${this.search}&filters=EquipSlotCategory.ID=${this.equipmentSlot}`
      )
        .then((res) => {
          this.items = res.data.Results;
        })
        .catch((err) => {
          console.error('Error: ', err);
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

    public itemSelect(payload: any): void {
      this.$emit('item-select', this.equipmentSlot, payload);
    }
  }
</script>

<style lang="scss">
  @import './item-search-input.scss';
</style>
