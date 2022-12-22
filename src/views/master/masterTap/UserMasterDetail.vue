<template>
  <div>
    <h3 class="mt-4 mb-2">회원 상세</h3>
    <hr class="mb-4" />
    <SetPopup ref="alert" />
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
      @changePage="getMemberSampleList"
    />
  </div>
</template>
<script>
import * as detail from "@/assets/grid/userMaster";
import * as sample from "@/assets/grid/sampleRequestDetail";
import RealGrid from "@/components/RealGrid.vue";
import Address from "@/components/Address.vue";
import SetPopup from "@/components/SetPopup.vue";
import { memberSampleList } from "api/sample/sample";
import { mapMutations } from "vuex";

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
      settingsSample: {
        ...sample,
        errorMessage: "샘플요청내역이 비었습니다",
        radio: true,
      },
      settingDetail: {
        ...detail,
        height: 100,
        errorMessage: "회원내용이 비었습니다",
        hideCheckBar: true,
      },
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    getMemberSampleList(v) {
      memberSampleList({
        currentPage: v ? v : "1",
        pageSize: "10",
      })
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          this.$refs.gridSample.loadData(items);
          this.$refs.gridSample.setPage(page);
        })
        .catch(() => {});
    },
    updateAddress() {
      const row = this.$refs.gridSample.getCheckedRow();
      if (row.length > 0) {
        this.$refs.address.open();
      } else {
        this.SET_POPUP({
          title: "알림",
          text: "항목을 선택해주세요",
          height: 150,
          width: 300,
        });
        this.$refs.alert.openPopup();
      }
      console.log(row);
    },
    loadData() {
      this.$refs.gridDetail.loadData([this.data]);
    },
  },
  mounted() {
    this.loadData();
    this.getMemberSampleList();
  },
  components: {
    RealGrid,
    Address,
    SetPopup,
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
