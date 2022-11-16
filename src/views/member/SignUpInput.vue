<template>
  <div style="display: flex; width: 500px; position: relative">
    <v-subheader class="my-4" style="width: 130px">{{
      this.label
    }}</v-subheader>
    <v-text-field
      :placeholder="placeholder"
      v-model="inputValue"
      outlined
      dense
      :class="sideBtn ? 'signInputWithBtn' : 'signInput'"
      :type="inputType"
      :append-icon="appendIcon"
      @click:append="togglePwdShow"
      autocomplete="off"
    ></v-text-field>
    <v-btn
      v-if="sideBtn"
      dense
      depressedd
      color="primary"
      @click="click"
      class="signBtn"
      >{{ btnText }}</v-btn
    >
  </div>
</template>
<script>
export default {
  props: [
    "value",
    "placeholder",
    "label",
    "type",
    "appendIcon",
    "width",
    "sideBtn",
    "btnText",
    "click",
  ],
  data() {
    return {
      inputValue: "",
      showPwd: false,
      inputType: this.type,
      inputWidth: this.width ? this.width : 500,
    };
  },
  watch: {
    inputValue: function (v) {
      this.$emit("input", v);
    },
    showPwd: function (v) {
      if (v) {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
  },
  methods: {
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
  },
};
</script>
