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
        <v-btn depressed v-if="accessToken" @click="openProfile">
          <v-icon disabled> mdi-account </v-icon>
        </v-btn>

        <v-btn depressed @click="account">{{
          this.accessToken ? "로그아웃" : "로그인"
        }}</v-btn>
      </v-app-bar>
      <v-container fill-height fluid class="mu-4" @click="closeProfile">
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
      <Address ref="address" @select="addressSelect" />
      <v-card class="profile pa-5" elevation="15" v-if="profile && accessToken">
        <div class="mb-3">
          <v-row style="height: 50px">
            <v-col cols="12" sm="2" class="mt-2">
              <v-icon disabled style="margin-left: 13px"> mdi-account </v-icon>
            </v-col>
            <v-col cols="12" sm="5">
              <div class="wrapperLeft">{{ userInfo.member_name }} 님</div>
              <div class="wrapperLeft smallText">{{ userInfo.company }}</div>
            </v-col>
            <v-col cols="12" sm="5">
              <v-select
                :items="this.language"
                v-model="myprofileLang"
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </div>
        <hr class="mb-5 mt-5" />
        <div class="wrapperLeft mb-5">기본 배송지 주소</div>
        <div v-if="userInfo.address">
          <div class="wrapperLeft smallText">
            * {{ userInfo.address }}{{ userInfo.address2 }}
          </div>
          <div class="wrapperLeft smallText mb-5">
            * 연락처 1 : {{ userInfo.phone1 }}
          </div>
        </div>
        <div v-else>등록된 기본배송지가 없습니다</div>
        <div style="display: flex; justify-content: center">
          <v-btn depressed color="primary" class="my-3" @click="openPost"
            >배송지 관리</v-btn
          >
        </div>
      </v-card>
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
  watch: {
    locale: function (v) {
      this.myprofileLang = v;
    },
    myprofileLang: function (v) {
      this.changeLang(v);
    },
  },
  data: () => ({
    profile: false,
    language: [
      { value: "ko", text: "한국어" },
      { value: "en", text: "English" },
    ],
    myprofileLang: "",
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
    closeProfile() {
      this.profile = false;
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
  mounted() {
    this.myprofileLang = this.locale;
  },
};
</script>
<style lang="scss">
.btn {
  margin: auto;
}
.sch {
  background: #f2f5f1;
  border: 1px solid #d6ebcd;
}
.ci {
  height: 40px;
  cursor: pointer;
}
.wrapper {
  justify-content: center;
  display: flex;
}
.wrapperTop {
  justify-content: center;
  display: flex;
  align-items: flex-start;
  .v-card__actions {
    padding-top: 3px;
  }
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
.col-12 {
  padding: 4px;
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
.v-tabs-bar__content {
  border-bottom: 1px solid #bcc0c8;
}
.v-tab--active {
  color: #60ab41 !important;
  font-weight: 900 !important;
  border-bottom: 4px solid #60ab41 !important;
}
.dimmRow {
  background-color: aquamarine !important;
}
.profile {
  z-index: 99;
  position: absolute;
  top: 49px;
  right: 21px;
}
.smallText {
  font-size: 13px;
  color: gray;
}
</style>
