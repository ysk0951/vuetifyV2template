<template>
  <div style="display: flex; width: 500px">
    <v-subheader class="my-4" style="width: 130px">{{
      this.label
    }}</v-subheader>
    <v-text-field
      :placeholder="placeholder"
      v-model="inputValue"
      outlined
      dense
      class="signInput"
      :type="inputType"
      :append-icon="appendIcon"
      @click:append="togglePwdShow"
      autocomplete="off"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  props: ["value", "placeholder", "label", "type", "appendIcon"],
  data() {
    return {
      inputValue: "",
      showPwd: false,
      inputType: this.type,
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
