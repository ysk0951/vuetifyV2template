<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <div class="wrapper">
        <div class="filter">
          <v-row :class="userInfo.admincheck == 2 ? 'fiveCol mt-4' : 'mt-4'">
            <v-col cols="12" :sm="userInfo.admincheck === 2 ? 2 : 4">
              <v-card elevation="3" @click="newRq"
                >신규요청
                <div>
                  <span style="color: crimson">{{ dash.new }}</span
                  ><span>건</span>
                </div></v-card
              >
            </v-col>
            <v-col cols="12" :sm="userInfo.admincheck === 2 ? 2 : 4">
              <v-card elevation="3" @click="progress"
                >제조중
                <div>
                  <span style="color: #60ab41">{{ dash.progress }}</span>
                  <span>건</span>
                </div></v-card
              >
            </v-col>
            <template v-if="userInfo.admincheck === 2">
              <v-col cols="12" sm="2">
                <v-card elevation="3" @click="progressDelay"
                  >제조지연
                  <div>
                    <span style="color: brown">{{ dash.produceduedelay }}</span>
                    <span>건</span>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="2">
                <v-card elevation="3" @click="deliveryDelay"
                  >출하지연
                  <div>
                    <span style="color: darkblue">{{ dash.outduedelay }}</span>
                    <span>건</span>
                  </div></v-card
                >
              </v-col>
            </template>
            <v-col cols="12" :sm="userInfo.admincheck === 2 ? 2 : 4">
              <v-card elevation="3" @click="delivery"
                >출하예정
                <div>
                  <span style="color: tomato">{{ dash.outdue }}</span>
                  <span>건</span>
                </div>
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
            @changePage="newRq"
          />
          <RealGrid
            v-show="key === 'delivery'"
            domName="delivery"
            ref="deliveryGrid"
            :settings="deliveryGrid"
            @changePage="delivery"
          />
          <RealGrid
            v-show="key === 'progressDelay'"
            domName="progressDelay"
            ref="progressDelayGrid"
            :settings="progressDelayGrid"
            @changePage="progressDelay"
          />
          <RealGrid
            v-show="key === 'deliveryDelay'"
            domName="deliveryDelay"
            ref="deliveryDelayGrid"
            :settings="deliveryDelayGrid"
            @changePage="deliveryDelay"
          />
          <RealGrid
            v-show="key === 'progress'"
            domName="progress"
            ref="progressGrid"
            :settings="progressGrid"
            @changePage="progress"
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
import {
  dashcount,
  dashdelivery,
  dashnew,
  progress,
  dashdeliverydelay,
  dashproducedelay,
} from "api/sample/sample";
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
    ...mapState("member", ["accessToken", "userInfo"]),
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
  watch: {
    param: {
      deep: true,
      handler: function () {
        this.currentPage = 1;
      },
    },
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    async chageTab(v, key, ref, fun) {
      this.key = key;
      if (_.isNumber(v)) {
        this.currentPage = v;
      }
      const res = await fun({
        ...this.param,
        currentPage: this.currentPage,
        pageSize: 10,
      });
      const data = res.data.data;
      const grid = this.$refs[ref];
      if (grid) {
        if (data.items) {
          grid.loadData(data.items, ["delivery_date"]);
        } else {
          grid.loadData([]);
        }
        grid.setPage(data.params);
      }
    },
    newRq(v) {
      this.chageTab(v, "new", "newGrid", dashnew);
    },
    progress(v) {
      this.chageTab(v, "progress", "progressGrid", progress);
    },
    progressDelay(v) {
      this.chageTab(v, "progressDelay", "progressDelayGrid", dashproducedelay);
    },
    deliveryDelay(v) {
      this.chageTab(v, "deliveryDelay", "deliveryDelayGrid", dashdeliverydelay);
    },
    delivery(v) {
      this.chageTab(v, "delivery", "deliveryGrid", dashdelivery);
    },
    more() {
      let tab;
      if (this.userInfo.admincheck == 1) {
        tab = "MMGMT";
      } else if (this.userInfo.admincheck == 2) {
        tab = "MMGMTM";
      }
      this.$router.push({ name: "service", params: { tab } });
    },
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
.fiveCol {
  width: 120%;
}
</style>
