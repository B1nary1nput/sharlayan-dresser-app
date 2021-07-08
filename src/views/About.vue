<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
const shared = namespace('shared');

@Component
export default class Home extends Vue {
  @shared.Getter
  public LOGIN_STATE!: boolean;
  

  created(): void {
    console.log('sbout: ', this.LOGIN_STATE);
  }
}
</script>