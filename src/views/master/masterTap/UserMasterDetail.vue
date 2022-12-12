<template>
  <div>
    <h3 class="mt-4 mb-2">회원 상세</h3>
    <hr class="mb-4" />
    <Address ref="address" />
    <RealGrid
      domName="gridDetail"
      ref="grid"
      :settings="settingDetail"
      :nonePage="true"
    />
    <h3 class="mt-16 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">
        샘플 요청 내역
        <v-btn depressed color="primary" @click="updateAddress"
          >배송지 변경</v-btn
        >
      </div>
    </h3>
    <hr class="mb-4" />
    <RealGrid domName="gridSample" ref="grid" :settings="settingsSample" />
  </div>
</template>
<script>
import * as detail from "@/assets/grid/userMaster";
import * as sample from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
import Address from "@/components/Address.vue";
export default {
  data() {
    return {
      grid: "userMasterDetail",
      settingsSample: sample,
      settingDetail: { ...detail, height: 100 },
    };
  },
  methods: {
    updateAddress() {
      this.$refs.address.open();
    },
  },
  components: {
    RealGrid,
    Address,
  },
};
</script>
<style lang="scss">
.confirmSample {
  .v-text-field__details {
    display: none;
  }
}
</style>
