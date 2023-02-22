<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <div class="wrapper">
        <div class="filter">
          <v-row>
            <v-col cols="12" sm="2">
              <v-card elevation="3" @click="newRq"
                >신규요청<span>{{ dash.new }}</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-card elevation="3" @click="progress"
                >제조중<span>{{ dash.progress }}</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-card elevation="3" @click="progressDelay"
                >제조지연<span>{{ dash.new }}</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-card elevation="3" @click="deliveryDelay"
                >출하지연<span>{{ dash.new }}</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="2">
              <v-card elevation="3" @click="delivery"
                >출하예정 <span>{{ dash.outdue }}</span>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="wrapperEnd">
            <a style="margin-right: 15px" @click="more">더보기</a>
          </v-row>
          <h3 class="mt-4 mb-2">{{ tab }}</h3>
          <hr class="mb-4 px-10" />
          <RealGrid
            v-show="key === 'new'"
            domName="new"
            ref="newGrid"
            :settings="newGrid"
            @changeData="newGrid"
          />
          <RealGrid
            v-show="key === 'delivery'"
            domName="delivery"
            ref="deliveryGrid"
            :settings="deliveryGrid"
            @changeData="delivery"
          />
          <RealGrid
            v-show="key === 'progressDelay'"
            domName="progressDelay"
            ref="progressDelayGrid"
            :settings="progressDelayGrid"
            @changeData="progressDelay"
          />
          <RealGrid
            v-show="key === 'deliveryDelay'"
            domName="deliveryDelay"
            ref="deliveryGridDelay"
            :settings="deliveryDelayGrid"
            @changeData="deliveryDelay"
          />
          <RealGrid
            v-show="key === 'progress'"
            domName="progress"
            ref="progressGrid"
            :settings="progressGrid"
            @changeData="progress"
          />
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import RealGrid from "@/components/RealGrid.vue";
import * as newGrid from "@/assets/grid/newGrid";
import * as deliveryGrid from "@/assets/grid/delivery";
import * as progressGrid from "@/assets/grid/progress";
import * as deliveryDelayGrid from "@/assets/grid/delivery";
import * as progressDelayGrid from "@/assets/grid/progress";
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
import { dashcount, dashdelivery, dashnew, progress } from "api/sample/sample";
export default {
  data() {
    return {
      newGrid,
      deliveryGrid,
      progressGrid,
      deliveryDelayGrid,
      progressDelayGrid,
      key: "new",
      set: [
        {
          key: "new",
          value: "신규요청",
        },
        {
          key: "progress",
          value: "제조중",
        },
        {
          key: "progressDelay",
          value: "제조지연",
        },
        {
          key: "deliveryDelay",
          value: "출하지연",
        },
        {
          key: "delivery",
          value: "출하예정",
        },
      ],
      dash: {},
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
    async chageTab(v, key, ref, fun) {
      this.key = key;
      const res = await fun({
        ...this.param,
        currentPage: _.isNumber(v) ? v : 1,
      });
      const data = res.data.data;
      const grid = this.$refs[ref];
      if (grid) {
        grid.loadData(data.items);
        grid.setPage(data.params);
      }
    },
    newRq(v) {
      this.chageTab(v, "new", "newGrid", dashnew);
    },
    progress(v) {
      this.chageTab(v, "progress", "progressGrid", progress);
    },
    deliveryDelay() {},
    delivery(v) {
      this.chageTab(v, "delivery", "deliveryGrid", dashdelivery);
    },
    more() {
      const tab = "";
      this.$router.push({ name: "service", params: { tab } });
    },
    progressDelay() {},
    async loadData() {
      await this.loadDeshCount();
      await this.newRq();
    },
    async loadDeshCount() {
      const res = await dashcount();
      this.dash = res.data.data;
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
  z-index: 1;
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
