<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        {{ buttonText }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        Delete glam
      </v-card-title>

      <v-card-text>
        <p>
          You're about to delete the glam <b>{{ glam.name }}</b
          >.<br />
          Are you sure you want to delete the glam forever (that's a long time)?
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="danger" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" depressed @click="confirmAction()">
          {{ buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { IGlam } from '@/interface/glam';

  @Component
  export default class ConfirmDialog extends Vue {
    // props
    @Prop(String) readonly buttonText!: string;
    @Prop(Object) readonly glam!: IGlam;

    // data
    public loading = true;
    public dialog = false;

    // lifecycle

    // methods
    public confirmAction(): void {
      this.$emit('confirm-dialog', true);
    }
  }
</script>
