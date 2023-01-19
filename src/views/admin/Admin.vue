<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-tabs v-model="tab">
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
      </v-tabs>
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.key === 'id'">
            <Accont ref="id" />
          </template>
          <template v-if="item.key === 'pw'">
            <AccontPw ref="pw" />
          </template>
          <template v-if="item.key === 'login'">
            <LoginMgn ref="login" />
          </template>
          <template v-if="item.key === 'menu'">
            <MenuMgn ref="menu" />
          </template>
          <template v-if="item.key === 'code'">
            <CodeMgn @dbClick="codeDetail" ref="code" />
          </template>
          <template v-if="item.key === 'codeDetail'">
            <CodeDetail :data="codeDetailData" ref="codeDetail" />
          </template>
          <template v-if="item.key === 'lang'">
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
    tab: function (v) {
      setTimeout(() => {
        const ref = this.items[v].key;
        const component = this.$refs[ref][0];
        if (_.has(component, "loadData")) {
          component.loadData();
        }
      }, 100);
    },
  },
  data() {
    return {
      tab: 0,
      codeDetailData: {},
      items: [
        {
          key: "id",
          value: "아이디 관리",
        },
        {
          key: "pw",
          value: "비밀번호 관리",
        },
        {
          key: "login",
          value: "로그인 관리",
        },
        {
          key: "menu",
          value: "메뉴권한 관리",
        },
        {
          key: "code",
          value: "공통코드 관리",
        },
        {
          key: "lang",
          value: "다국어 지원관리",
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
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    removeTab(index) {
      this.items.splice(index, 1);
      this.tab = 0;
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
