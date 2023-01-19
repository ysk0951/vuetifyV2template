<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <div class="wrapper">
        <div class="filter">
          <v-row>
            <v-col cols="12" sm="4">
              <v-card elevation="3" @click="newRq"
                >신규요청<span>61건</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="4">
              <v-card elevation="3" @click="making"
                >제조중<span>61건</span></v-card
              >
            </v-col>
            <v-col cols="12" sm="4">
              <v-card elevation="3" @click="shipment"
                >출하예정 <span>61건</span>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="wrapperEnd">
            <a style="margin-right: 15px">더보기</a>
          </v-row>
          <h3 class="mt-4 mb-2">{{ tab }}</h3>
          <hr class="mb-4 px-10" />
          <template v-if="tab === 'newRq'">
            <RealGrid
              domName="main"
              ref="newRqGrid"
              :settings="newRqGrid"
              @changePage="loadData"
            />
          </template>
          <template v-if="tab === 'shipment'">
            <RealGrid
              domName="main"
              ref="shipmentGrid"
              :settings="shipmentGrid"
              @changePage="loadData"
            />
          </template>
          <template v-if="tab === 'making'">
            <RealGrid
              domName="main"
              ref="makingGrid"
              :settings="makingGrid"
              @changePage="loadData"
            />
          </template>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import RealGrid from "@/components/RealGrid.vue";
import * as newRqGrid from "@/assets/grid/sampleRequest";
import _ from "lodash";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      newRqGrid,
      key: "newRq",
      set: [
        {
          key: "newRq",
          value: "신규요청",
        },
        {
          key: "shipment",
          value: "출하예정",
        },
        {
          key: "making",
          value: "제조중",
        },
      ],
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
      this.key = "newRq";
    },
    shipment() {
      this.key = "shipment";
    },
    making() {
      this.key = "making";
    },
    loadData(v) {
      this.search(v);
    },
    search(v) {
      console.log(v);
    },
  },
  mounted() {},
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
