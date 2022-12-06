<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.key">
          {{ item.value }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.key === 'userSample'">
            <UserSample @newSample="newSample" />
          </template>
          <template v-if="item.key === 'newSample'">
            <NewSample @newSample="newSample" />
          </template>
          <template v-if="item.key === 'adminSample'">
            <AdminSample @newSample="newSample" />
          </template>
          <template v-if="item.key === 'confirmSample'">
            <ConfirmSample @newSample="newSample" />
          </template>
          <template v-if="item.key === 'sampleRequestDetail'">
            <SampleRequestDetail @newSample="newSample" />
          </template>
          <template v-if="item.key === 'searchProcess'">
            <SearchProcess />
          </template>
          <template v-if="item.key === 'delivaryReport'">
            <DeliveryReport />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import UserSample from "@/views/sample/sampleTab/UserSample";
import NewSample from "@/views/sample/sampleTab/NewSample";
import AdminSample from "@/views/sample/sampleTab/AdminSample";
import ConfirmSample from "@/views/sample/sampleTab/ConfirmSample";
import SampleRequestDetail from "@/views/sample/sampleTab/SampleRequestDetail";
import SearchProcess from "@/views/sample/sampleTab/SearchProcess";
import DeliveryReport from "@/views/sample/sampleTab/DeliveryReport";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      tab: 0,
      items: [
        {
          key: "userSample",
          value: "회원 샘플 요청",
        },
        {
          key: "adminSample",
          value: "관리자 샘플 요청",
        },
        {
          key: "confirmSample",
          value: "샘플 요청 검수",
        },
        {
          key: "sampleRequestDetail",
          value: "샘플 요청 상세",
        },
        {
          key: "searchProcess",
          value: "진행사항 조회",
        },
        {
          key: "delivaryReport",
          value: "납품 일보",
        },
      ],
    };
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
  },
  components: {
    SetDialog,
    UserSample,
    NewSample,
    AdminSample,
    ConfirmSample,
    SampleRequestDetail,
    SearchProcess,
    DeliveryReport,
  },
  async created() {
    this.SET_MENU();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    newSample() {
      const newSampleIdx = _.findIndex(this.items, function (v) {
        return v.key === "newSample";
      });
      if (newSampleIdx === -1) {
        this.items.push({
          key: "newSample",
          value: "신규 샘플 요청",
        });
      }
      this.tab = newSampleIdx;
    },
  },
};
</script>
<style scoped>
.full {
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>
