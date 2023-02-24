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
                    <template v-if="locale === 'ko'">
                      {{ item.menu }}
                    </template>
                    <template v-else-if="locale === 'en'">
                      {{ item.menu_eng }}
                    </template>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(it, idx) in item.subMenu" :key="idx">
                    <v-list-item-title
                      @click="routing(it)"
                      style="cursor: pointer"
                    >
                      <template v-if="locale === 'ko'">
                        {{ it.menu }}
                      </template>
                      <template v-else-if="locale === 'en'">
                        {{ it.menu_eng }}
                      </template>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
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
        <v-avatar tile v-if="accessToken">
          <v-icon @mouseover="openProfile"> mdi-account </v-icon>
        </v-avatar>

        <v-btn depressed @click="account">{{
          this.accessToken ? "로그아웃" : "로그인"
        }}</v-btn>
      </v-app-bar>
      <v-container fill-height fluid class="mu-4">
        <Address ref="address" @select="addressSelect" />
        <v-card
          class="profile pa-3"
          v-if="profile && accessToken"
          @mouseleave="openProfile"
        >
          <div class="wrapper mb-3">{{ userInfo.member_name }} 님</div>
          <div class="wrapperLeft">* 회사명: {{ userInfo.company }}</div>
          <div class="wrapperLeft">* 기본 배송지 주소</div>
          <div v-if="userInfo.address">
            <div class="wrapperLeft">
              {{ userInfo.address }}
            </div>
            <div class="wrapperLeft">
              {{ userInfo.address2 }}
            </div>
            <div class="wrapperLeft">
              * 배송지 연락처 1 : {{ userInfo.phone1 }}
            </div>
            <div class="wrapperLeft">
              * 배송지 연락처 2 : {{ userInfo.phone2 }}
            </div>
          </div>
          <div v-else>등록된 기본배송지가 없습니다</div>
          <div class="wrapper">
            <v-btn depressed color="primary" class="my-3" @click="openPost"
              >배송지 관리</v-btn
            >
          </div>
        </v-card>
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
import Address from "@/components/Address.vue";
import { addressbookUt } from "api/address/address";
import { userInfo } from "api/member/member";
export default {
  name: "App",
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken", "userInfo"]),
    ...mapState("menu", ["menu"]),
    ...mapState("locale", ["locale"]),
  },
  data: () => ({
    profile: false,
    language: [
      { value: "ko", text: "한국어" },
      { value: "en", text: "English" },
    ],
    dom1: "realgrid1",
    dom2: "realgrid2",
  }),
  components: {
    Address,
  },
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
    await this.SET_CODE("Q");
    await this.SET_CODE("R");
  },
  methods: {
    ...mapMutations("select", ["SET_ROLE_TYPE"]),
    ...mapMutations("menu", ["SET_ALL_MENU", "SELECT_MENU"]),
    ...mapMutations("common", ["SET_CODE"]),
    ...mapMutations("member", ["SET_TOKEN", "SET_USER_INFO"]),
    ...mapMutations("locale", ["SET_LOCALE"]),
    routing(v) {
      this.$router.push({ name: "service" });
      this.SELECT_MENU(v);
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
    openProfile() {
      this.profile = !this.profile;
    },
    openPost() {
      this.$refs.address.open();
    },
    addressSelect(v) {
      addressbookUt(v.idx)
        .then(async () => {
          const loginUserInfo = await userInfo();
          this.SET_USER_INFO(loginUserInfo);
        })
        .catch(() => {});
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
.v-text-field__slot > input::placeholder {
  font-size: 14px;
}
.v-tabs-slider {
  display: none;
}
.v-tab--active {
  border-bottom: 2px solid;
}
.dimmRow {
  background-color: aquamarine !important;
}
.profile {
  z-index: 99;
  position: absolute;
  top: 29px;
  right: 127px;
  width: 300px;
}
</style>
