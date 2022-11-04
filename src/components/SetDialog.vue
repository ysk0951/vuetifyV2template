<template>
  <v-dialog max-width="500" v-model="open">
    <v-form ref="form" lazy-validation>
      <v-card>
        <v-card-title>{{ setDialog.dialogTitle }}</v-card-title>
        <v-card-text>
          {{ setDialog.dialogText }}
        </v-card-text>
        <v-card-actions style="justify-content: center">
          <v-btn class="approve" @click="closeModal">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
export default {
  props: {
    setDialog: {
      type: Object,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {},
  methods: {
    openModal() {
      this.open = true;
    },
    closeModal() {
      this.open = false;
      if (this.setDialog.approveCb) {
        this.setDialog.approveCb();
      }
    },
  },
};
</script>
<style>
.approve {
  background-color: black !important;
}
.approve span {
  color: white;
}
</style>
