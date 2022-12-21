<template>
  <div>
    <h3 class="mt-4 mb-2">회원 상세</h3>
    <hr class="mb-4" />
    <Address ref="address" />
    <RealGrid
      domName="gridDetail"
      ref="gridDetail"
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
    <RealGrid
      domName="gridSample"
      ref="gridSample"
      :settings="settingsSample"
    />
  </div>
</template>
<script>
import * as detail from "@/assets/grid/userMaster";
import * as sample from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
import Address from "@/components/Address.vue";
export default {
  props: ["data"],
  watch: {
    data: {
      deep: true,
      handler: function (v) {
        this.loadData([v]);
      },
    },
  },
  data() {
    return {
      grid: "userMasterDetail",
      settingsSample: { ...sample, errorMessage: "샘플요청내역이 비었습니다" },
      settingDetail: {
        ...detail,
        height: 100,
        errorMessage: "회원내용이 비었습니다",
      },
    };
  },
  methods: {
    updateAddress() {
      this.$refs.address.open();
    },
    loadData() {
      console.log("loadData");
      this.$refs.gridDetail.loadData([this.data]);
    },
  },
  mounted() {
    this.loadData();
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
