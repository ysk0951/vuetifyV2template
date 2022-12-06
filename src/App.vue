<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-app-bar dense style="position: absolute">
        <template v-if="accessToken">
          <div class="text-center" v-for="(item, idx) in menu" v-bind:key="idx">
            <v-btn depressed @click="routing(item)">
              {{ item.menu }}
            </v-btn>
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
  watch: {
    locale: function (v) {
      this.SET_LOCALE(v);
    },
  },
  components: {},
  async created() {
    await this.SET_LOCALE(this.locale);
    await this.SET_ROLE_TYPE();
    await this.SET_ALL_MENU();
  },
  methods: {
    ...mapMutations("locale", ["SET_LOCALE"]),
    ...mapMutations("select", ["SET_ROLE_TYPE"]),
    ...mapMutations("menu", ["SET_ALL_MENU"]),
    routing(v) {
      this.$router.push(v.url);
    },
    changeLang(v) {
      this.locale = v;
    },
  },
};
</script>
<style>
.wrapper {
  justify-content: center;
  display: flex;
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
}
</style>
