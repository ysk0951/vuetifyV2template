<template>
  <div
    :style="
      'display: flex; width: 500px; position: relative; height : ' +
      height +
      'px'
    "
  >
    <v-subheader class="my-4" style="width: 130px">{{
      this.label
    }}</v-subheader>
    <v-text-field
      :placeholder="placeholder"
      :value="value"
      @input="input"
      outlined
      dense
      :class="sideBtn ? 'signInputWithBtn' : 'signInput'"
      :type="inputType"
      :append-icon="appendIcon"
      @click:append="togglePwdShow"
      autocomplete="off"
      :disabled="disabled"
      :filled="disabled"
    ></v-text-field>
    <v-btn
      v-if="sideBtn"
      dense
      depressedd
      color="primary"
      @click="btnClick"
      class="signBtn"
      >{{ btnText }}</v-btn
    >
  </div>
</template>
<script>
import _ from "lodash";
export default {
  props: [
    "value",
    "placeholder",
    "label",
    "type",
    "appendIcon",
    "width",
    "height",
    "sideBtn",
    "btnText",
    "click",
    "disabled",
  ],
  name: "SignupInput",
  data() {
    return {
      showPwd: false,
      inputType: this.type,
      inputWidth: this.width ? this.width : 500,
      btnClick: _.isFunction(this.click) ? this.click : () => {},
    };
  },
  watch: {
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
    input(v) {
      this.$emit("input", v);
    },
  },
};
</script>
