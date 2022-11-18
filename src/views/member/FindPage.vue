<template>
  <div class="wrapper">
    <v-card height="600px" width="450px">
      <SetDialog ref="findModal" />{{}}
      <div class="pa-10">
        <h3 style="text-align: left">{{ `${tabKey(this.key)}` }}</h3>
        <hr class="mb-3" />
        <v-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item" @click="move(item)">
            {{ tabKey(item) }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card flat>
              <template v-if="key === 'id'">
                <v-layout row style="margin-top: 18px">
                  <v-col cols="12" sm="3">
                    <v-subheader>이름</v-subheader>
                  </v-col>
                  <v-col cols="12" sm="9">
                    <v-text-field
                      placeholder="이름을 입력해주요"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-row>
                  <v-col cols="12" sm="3">
                    <v-subheader>휴대폰 번호</v-subheader>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-select :items="numbers"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" style="padding-left: 0px">
                    <v-text-field placeholder="000-0000-0000"></v-text-field>
                  </v-col>
                </v-row>
                <v-flex class="approveWrapper" mt-6>
                  <v-btn style="right: 6px" @click="cancel">취소</v-btn>
                  <v-btn style="right: -6px" @click="approve" color="primary"
                    >확인</v-btn
                  >
                </v-flex>
              </template>
              <template v-if="key === 'pw'"></template>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";
export const FindKey = {
  id: "아이디",
  pw: "패스워드",
};
export default {
  name: "FindPage",
  data() {
    return {
      checkbox: false,
      showPwd: false,
      tab: 0,
      key: "id",
      text: "2",
      items: ["id", "pw"],
      numbers: [1, 2],
    };
  },
  components: {
    SetDialog,
  },
  computed: {
    pwdType() {
      if (this.showPwd) {
        return "Password";
      } else {
        return "text";
      }
    },
  },
  mounted() {
    if (this.$route.params.key) {
      this.key = this.$route.params.key;
    }
  },
  methods: {
    move(key) {
      this.key = key;
    },
    tabKey(key) {
      return FindKey[key];
    },
    cancel() {
      this.$router.push({ name: "login" });
    },
    approve(params) {
      this.$router.push({ name: "find", params: { params } });
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    login() {
      this.setDialogText("아이디를 입력해주세요");
      this.$refs.findModal.openModal();
    },
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
    setDialogText(text) {
      this.setDialog.dialogText = text;
    },
  },
};
</script>
<style>
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}

.v-subheader {
  width: 97px;
}
.approveWrapper {
  text-align: center;
}
.underLogin {
  display: flex;
  justify-content: space-between;
}

.underLogin span {
  cursor: pointer;
}
.v-input__slot {
  margin-bottom: 0px;
}
</style>
