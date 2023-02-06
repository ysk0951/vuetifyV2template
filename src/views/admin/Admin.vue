<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <!-- <v-tabs v-model="tab">
        <v-tab v-for="(item, index) in items" :key="item.key">
          {{ item.value }}
          <v-btn
            icon
            @click="removeTab(index)"
            class="ml-2"
            v-if="item.closeable"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </v-tab>
      </v-tabs> -->
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.code === 'IDMGMT'">
            <Accont ref="IDMGMT" />
          </template>
          <template v-if="item.code === 'PWMGMT'">
            <AccontPw ref="PWMGMT" />
          </template>
          <template v-if="item.code === 'login'">
            <LoginMgn ref="login" />
          </template>
          <template v-if="item.code === 'menu'">
            <MenuMgn ref="menu" />
          </template>
          <template v-if="item.code === 'code'">
            <CodeMgn @dbClick="codeDetail" ref="code" />
          </template>
          <template v-if="item.code === 'codeDetail'">
            <CodeDetail :data="codeDetailData" ref="codeDetail" />
          </template>
          <template v-if="item.code === 'lang'">
            <LangCode ref="lang" />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import Accont from "@/views/admin/user/Account.vue";
import AccontPw from "@/views/admin/user/AccountPw.vue";
import MenuMgn from "@/views/admin/user/MenuMng.vue";
import LoginMgn from "@/views/admin/user/LoginMgn.vue";
import CodeMgn from "@/views/admin/user/CodeMgn.vue";
import CodeDetail from "@/views/admin/user/CodeDetail.vue";
import LangCode from "@/views/admin/user/LangCode";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        this.setTab();
      }
    },
  },
  data() {
    return {
      tab: 0,
      codeDetailData: {},
      items: [],
    };
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
  },
  components: {
    SetDialog,
    Accont,
    AccontPw,
    MenuMgn,
    LoginMgn,
    CodeMgn,
    CodeDetail,
    LangCode,
  },
  created() {
    this.SET_MENU();
    this.setTab();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    setTab() {
      const menu = this.$route.query.menu;
      this.items = this.getTab(menu);
      const ref = _.reduce(
        this.items,
        (a, c) => {
          if ((c.menu_eng = menu)) {
            a = c.code;
          }
          return a;
        },
        ""
      );
      setTimeout(() => {
        const component = this.$refs[ref][0];
        if (_.has(component, "loadData")) {
          component.loadData();
        }
      }, 100);
    },
    findTab(key, value, target, closeable, data) {
      let idx = _.findIndex(this.items, function (v) {
        return v.key === key;
      });
      if (idx === -1) {
        this.items.push({
          key,
          value,
          closeable,
        });
        idx = _.findIndex(this.items, function (v) {
          return v.key === key;
        });
      }
      this.tab = idx;
      this[target] = data;
    },
    codeDetail(data) {
      this.findTab(
        "codeDetail",
        "공통 코드 상세",
        "codeDetailData",
        true,
        data
      );
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
