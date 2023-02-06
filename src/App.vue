<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-app-bar dense style="position: absolute">
        <img
          src="../assets/dwel_logo_ko.png"
          class="ci mr-8"
          alt=""
          @click="home"
        />
        <template v-if="accessToken">
          <div v-for="(item, idx) in menu" v-bind:key="idx" class="menu">
            <div class="text-center">
              <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    v-bind="attrs"
                    v-on="on"
                    style="height: 48px"
                  >
                    {{ item.menu }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(it, idx) in item.subMenu" :key="idx">
                    <v-list-item-title
                      @click="routing(it, item.url)"
                      style="cursor: pointer"
                      >{{ it.menu }}</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <!-- <v-btn depressed @click="routing(item)">
              {{ item.menu }}
            </v-btn> -->
          </div>
        </template>
        <div class="langBoxWrapper">
          <v-btn
            v-for="(item, idx) in language"
            depressed
            :key="idx"
            @click="changeLang(item.value)"
          >
            {{ item.text }}
          </v-btn>
        </div>
        <v-avatar tile>
          <v-icon> mdi-account </v-icon>
        </v-avatar>
        <v-btn depressed @click="account">{{
          this.accessToken ? "로그아웃" : "로그인"
        }}</v-btn>
      </v-app-bar>
      <v-container fill-height fluid class="mu-4">
        <v-layout align-center row wrap>
          <v-overlay :value="loading" style="z-index: 999">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular
          ></v-overlay>
          <router-view />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
  },
  data: () => ({
    locale: "ko",
    language: [
      { value: "ko", text: "한국어" },
      { value: "en", text: "English" },
    ],
    dom1: "realgrid1",
    dom2: "realgrid2",
  }),
  components: {},
  async created() {
    await this.SET_ROLE_TYPE();
    await this.SET_ALL_MENU();
    await this.SET_CODE("C");
    await this.SET_CODE("D");
    await this.SET_CODE("P");
    await this.SET_CODE("M");
    await this.SET_CODE("L");
    await this.SET_CODE("N");
    await this.SET_CODE("O");
  },
  methods: {
    ...mapMutations("select", ["SET_ROLE_TYPE"]),
    ...mapMutations("menu", ["SET_ALL_MENU"]),
    ...mapMutations("common", ["SET_CODE"]),
    ...mapMutations("member", ["SET_TOKEN"]),
    ...mapMutations("locale", ["SET_LOCALE"]),
    routing(v, url) {
      this.$router.push(`${url}?menu=${v.menu_eng}`);
    },
    changeLang(v) {
      this.SET_LOCALE(v);
    },
    account() {
      if (this.accessToken) {
        this.SET_TOKEN({});
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
    home() {
      this.$router.push({ name: "main" });
    },
  },
};
</script>
<style lang="scss">
.ci {
  height: 40px;
  cursor: pointer;
}
.wrapper {
  justify-content: center;
  display: flex;
}
.col-12 {
  padding: 4px;
}

.wrapperSpace {
  justify-content: space-between;
  display: flex;
}
.wrapperEnd {
  justify-content: end;
  display: flex;
}
.wrapperFlex {
  display: flex;
}
.flexCol {
  flex-direction: column;
}
.langBox {
  width: 80px;
  justify-content: end;
  font-size: 10px;
}

.langBoxWrapper {
  display: flex;
  justify-content: end;
  width: 100%;
}
.v-btn.v-size--default {
  font-size: 0.95rem !important;
}
.container {
  padding: 0 0 0 0px !important;
}
.v-toolbar__content {
  height: 48px !important;
}
.menu {
  height: 48px !important;
}
div.v-menu__content.theme--light.menuable__content__active > div {
  padding: 0px;
}

.background {
  background-color: rgba(0, 0, 0, 0.02);
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.02) !important;
}

.v-select__selections {
  position: absolute !important;
  top: -2px !important;
}
</style>
