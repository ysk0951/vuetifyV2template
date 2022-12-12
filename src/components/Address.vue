<template>
  <div class="address">
    <SetDialogVue ref="dialog">
      <div class="pa-5">
        <h4>주소록</h4>
        <hr class="mt-3 mb-3" />
        <div class="wrapperSpace mb-3">
          <i></i>
          <v-btn depressed color="primary" @click="addAddress"
            >배송지 추가</v-btn
          >
        </div>
        <div class="pa-5 border mb-3">123</div>
        <div class="wrapper">
          <v-btn depressed color="primary" @click="approve">확인</v-btn>
        </div>
      </div>
    </SetDialogVue>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SetDialogVue from "./SetDialog.vue";
import { addressbookList } from "api/address/address";
export default {
  name: "Address",
  // props: ["domName", "settings", "nonePage"],
  data: function () {
    return {
      param: {},
    };
  },
  watch: {},
  methods: {
    ...mapMutations("modal", ["SET_MODAL"]),
    open() {
      this.SET_MODAL({
        height: 600,
        width: 600,
        closable: true,
        customApprove: true,
      });
      addressbookList()
        .then((res) => {
          const response = res.data;
          console.log(response);
        })
        .catch(() => {});
      this.$refs.dialog.openModal();
    },
    addAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.param.address = data.zonecode;
          this.param.addDetail1 = data.roadAddress + data.buildingName;
        },
      }).open();
    },
    approve() {
      this.$emit("onApprove", this.param);
    },
  },
  mounted() {},
  components: {
    SetDialogVue,
  },
};
</script>
<style>
.border {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15) !important;
}
</style>
