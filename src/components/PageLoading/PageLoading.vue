<template>
  <div class="page-loading" v-if="loading">
    <v-icon>loop</v-icon>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class PageLoading extends Vue {
    @Prop(Boolean) readonly loading!: boolean;

    // lifecycle

    // methods
  }
</script>

<style lang="scss">
  @import './page-loading.scss';
</style>
