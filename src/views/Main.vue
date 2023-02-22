<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <div class="wrapper">
        <div class="filter">
          <v-row>
            <v-col cols="12" sm="4">
              <v-card elevation="3" @click="newRq"
                >신규요청<span>{{ dash.new }}</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="4">
              <v-card elevation="3" @click="progress"
                >제조중<span>{{ dash.progress }}</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="4">
              <v-card elevation="3" @click="delivery"
                >출하예정 <span>{{ dash.outdue }}</span>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="wrapperEnd">
            <a style="margin-right: 15px">더보기</a>
          </v-row>
          <h3 class="mt-4 mb-2">{{ tab }}</h3>
          <hr class="mb-4 px-10" />
          <RealGrid
            v-show="key === 'new'"
            domName="new"
            ref="newGrid"
            :settings="newGrid"
          />
          <RealGrid
            v-show="key === 'delivery'"
            domName="delivery"
            ref="deliveryGrid"
            :settings="deliveryGrid"
          />
          <RealGrid
            v-show="key === 'progress'"
            domName="progress"
            ref="progressGrid"
            :settings="progressGrid"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import RealGrid from "@/components/RealGrid.vue";
import * as newGrid from "@/assets/grid/sampleRequest";
import * as deliveryGrid from "@/assets/grid/sampleRequest";
import * as progressGrid from "@/assets/grid/sampleRequest";
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
import { dashcount, dashdelivery, dashnew, progress } from "api/sample/sample";
export default {
  data() {
    return {
      newGrid,
      deliveryGrid,
      progressGrid,
      key: "new",
      set: [
        {
          key: "new",
          value: "신규요청",
        },
        {
          key: "delivery",
          value: "출하예정",
        },
        {
          key: "progress",
          value: "제조중",
        },
      ],
      dash: {},
      gridData: {
        new: [],
        progress: [],
        delivery: [],
      },
      param: { currentPage: 1, pageSize: 10 },
    };
  },
  computed: {
    ...mapState("menu", ["menu"]),
    ...mapState("member", ["accessToken"]),
    tab() {
      return _.reduce(
        this.set,
        (a, v) => {
          if (v.key == this.key) {
            a = v.value;
          }
          return a;
        },
        ""
      );
    },
  },
  components: {
    SetDialog,
    RealGrid,
  },
  created() {
    if (!this.accessToken) {
      this.$router.push({ name: "login" });
    } else {
      this.SET_MENU();
    }
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    newRq() {
      this.key = "new";
      this.$refs.newGrid.loadData(this.gridData.new.items);
      // this.$refs.newGrid.setPage(this.gridData.new.params);
    },
    delivery() {
      this.key = "delivery";
      this.$refs.deliveryGrid.loadData(this.gridData.delivery.items);
      this.$refs.deliveryGrid.setPage(this.gridData.delivery.params);
    },
    progress() {
      this.key = "progress";
      this.$refs.progressGrid.loadData(this.gridData.progress.items);
      this.$refs.progressGrid.setPage(this.gridData.progress.params);
    },
    async loadData() {
      await this.loadDeshCount();
      await this.loadDeashGridData();
      this.newRq();
    },
    async loadDeshCount() {
      const res = await dashcount();
      this.dash = res.data.data;
    },
    async loadDeashGridData() {
      const newDash = await dashnew(this.param);
      const deliveryDash = await dashdelivery(this.param);
      const progressDash = await progress(this.param);
      this.gridData.delivery = deliveryDash.data.data;
      this.gridData.progress = progressDash.data.data;
      this.gridData.new = newDash.data.data;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style scoped lang="scss">
.full {
  height: 100%;
  width: 100%;
  background-color: white;
}
.filter {
  width: 90%;
  padding-top: 15px;
  .v-card {
    height: 50px;
    align-items: center;
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    justify-content: space-between;
  }
}
</style>
