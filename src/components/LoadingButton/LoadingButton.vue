<template>
  <div>
    <v-btn
      :color="color"
      :type="type"
      block
      class="rounded-0 loading-button"
      :disabled="disableButton"
    >
      <v-icon :class="{ loading: show }">loop</v-icon>
      {{ buttonText }}
    </v-btn>

    <v-alert outlined type="info" v-if="showWaitingMessage">{{
      waitingMessage
    }}</v-alert>
  </div>
</template>

<script lang="ts">
  import EventBus from '@/EventBus';
  import { Component, Vue, Mixins, Ref, Prop } from 'vue-property-decorator';
  import userAuthMixin from '@/mixins/userAuthMixin';

  @Component({
    name: 'LoadingButton',
  })
  export default class LoadingButton extends Mixins(userAuthMixin) {
    // variables
    private showWaitingMessage = false;
    private cancelTimeout = false;

    // props
    @Prop(String) readonly buttonText!: string;
    @Prop(Boolean) readonly show!: boolean;
    @Prop(Boolean) readonly disableButton!: boolean;
    @Prop(String) readonly color!: string;
    @Prop(String) readonly type!: string;
    @Prop(String) readonly waitingMessage!: string;

    // methods
    mounted(): void {
      // When the user clicks the login button, set in motion, showing the slow server alert
      EventBus.$on('LoginEvent', (payload: any) => {
        this.someMethod();
      });

      // In case of error, we don't want to show the notice of a slow server
      EventBus.$on('CancelTimeout', (payload: any) => {
        this.cancelTimeout = true;
      });
    }

    // run method 7 seconds after the login button has been clicked
    public someMethod(): void {
      setTimeout(() => {
        // if the event for cancelling the timeout happens before the end of the timeout, don't run the code, showing the info box
        if (!this.cancelTimeout) {
          this.showWaitingMessage = true;
        }
      }, 7000);
    }
  }
</script>

<style lang="scss">
  @import './loading-button.scss';

  .loading-button.v-btn {
    > .v-btn__content {
      i.v-icon {
        margin-right: 7px;
        display: none;

        &.loading {
          display: block;
          -webkit-animation: spin 2s linear infinite;
          -moz-animation: spin 2s linear infinite;
          animation: spin 2s linear infinite;
        }
      }
    }
  }

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
