<template>
  <div class="wrapper">
    <v-card height="600px" width="450px">
      <SetDialog :setDialog="this.setDialog" ref="loginModal" />
      <div class="pa-10">
        <h3 style="text-align: left">{{ `${tabKey(this.key)} 찾기` }}</h3>
        <hr class="mb-3" />

        <v-tabs>
          <v-tab v-for="item in items" :key="item" @click="move(item)">
            {{ tabKey(item) }}
          </v-tab>
        </v-tabs>

        <v-tabs-items>
          <v-tab-item v-for="item in items" :key="item">
            <v-card flat>
              <v-card-text v-text="text"></v-card-text>
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
  data() {
    return {
      setDialog: {
        dialogTitle: "알림",
        dialogText: "",
      },
      checkbox: false,
      showPwd: false,
      key: "id",
      text: "2",
      items: ["id", "pw"],
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
    findString() {
      return `${FindKey[this.key]} 찾기`;
    },
  },
  mounted() {
    if (this.$route.params.key) {
      this.key = this.$route.params.key;
    }
  },
  methods: {
    move(key) {
      console.log("move", key);
      this.key = key;
    },
    tabKey(key) {
      return FindKey[key];
    },
    find(key) {
      this.$router.push("./member/find", key);
    },
    signup() {
      this.$router.push("./member/signup");
    },
    login() {
      this.setDialogText("아이디를 입력해주세요");
      this.$refs.loginModal.openModal();
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

.v-item-group div {
  color: black !important;
}
</style>
