<template>
  <div class="cardWrapper">
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
                  <td>이름</td>
                  <td>홍길동</td>
                </tr>
                <tr>
                  <td>아이디</td>
                  <td>test@test.com</td>
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
import { mapState } from "vuex";
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
    onApprove() {
      this.$router.push({ name: "main" });
    },
    login() {
      this.$router.push({ name: "login" });
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
