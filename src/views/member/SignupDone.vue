<template>
  <div class="cardWrapper" style="width: 100%">
    <v-card class="mt-12" style="width: 60%">
      <div class="pa-10">
        <h3 style="text-align: left" class="mb-3">회원가입</h3>
        <hr class="mb-6" />
        <v-card class="infoCard">
          <div class="wrapper col">
            <div
              class="wrapper"
              style="width: 40%; margin: auto; margin-bottom: 25px"
            >
              <template v-if="this.locale === 'ko'">
                <v-img src="../../../assets/dwel_logo_ko.png" alt="" />
              </template>
              <template v-else>
                <v-img src="../../../assets/dwel_logo_en.png" alt="" />
              </template>
            </div>
            <div><b>회원가입</b>이 완료되었습니다.</div>
            <div class="wrapper">
              <table>
                <tr>
                  <td>아이디</td>
                  <td>이름</td>
                </tr>
                <tr>
                  <td>{{ this.$route.params.memberId }}</td>
                  <td>{{ this.$route.params.memberName }}</td>
                </tr>
              </table>
            </div>
          </div>
        </v-card>
        <div class="wrapper">
          <v-card-actions>
            <v-btn depressed @click="onApprove">확인</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn depressed color="primary" @click="login">로그인</v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { login, userInfo } from "api/member/member";
import { addressbookDefault } from "api/address/address";
export default {
  name: "SignupDone",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState("locale", ["message", "locale"]),
  },
  methods: {
    ...mapMutations("member", [
      "SET_TOKEN",
      "SET_DEFAULT_ADDRESS",
      "SET_USER_INFO",
    ]),
    onApprove() {
      login({
        memberId: this.$route.params.memberId,
        memberpw: this.$route.params.memberPw,
      })
        .then(async (res) => {
          const resBody = res.data;
          this.SET_TOKEN(resBody.data);
          const defaultAddress = await addressbookDefault();
          const loginUserInfo = await userInfo();
          this.SET_DEFAULT_ADDRESS(defaultAddress);
          this.SET_USER_INFO(loginUserInfo);
        })
        .catch(() => {
          this.openModal("회원가입후 자동로그인 에러 : 관리자에게 문의하세요");
        })
        .finally(() => {});
    },
    login() {
      this.$router.push({
        name: "login",
        params: { memberId: this.$route.params.memberId },
      });
    },
  },
};
</script>
<style scoped>
.cardWrapper {
  display: flex;
  justify-content: center;
}
.col {
  flex-direction: column;
}

table {
  border: 1px solid;
  border-collapse: collapse;
  width: 60%;
  margin-top: 15px;
}
th,
td {
  border: 1px solid;
}
</style>
