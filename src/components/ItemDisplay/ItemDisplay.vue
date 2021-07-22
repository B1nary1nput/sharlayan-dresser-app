<template>
  <div class="item-display">
    <img
      v-if="glamObject"
      :src="`${apiEndpoint}/src/images/icons${glamObject.Icon}`"
      alt=""
    />

    <v-text-field
      v-if="glamObject"
      :value="glamObject.Name"
      :label="labelText"
      filled
      dense
      disabled
    ></v-text-field>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

  @Component
  export default class ItemDisplay extends Vue {
    // VUEX getters

    // VUEX actions

    // Props
    @Prop(Object) readonly glamObject!: any;
    @Prop(String) readonly labelText!: string;

    // data
    public loading = true;
    public apiEndpoint = apiEndpoint;

    // lifecycle

    // methods
  }
</script>

<style lang="scss">
  @import './item-display.scss';
</style>
