<template>
  <v-card height="600px">
    <div class="pa-10">
      <h1 style="text-align: center" class="mb-10">Login</h1>
      <form>
        <v-text-field label="ID"></v-text-field>
        <v-text-field
          append-icon="mdi-eye"
          :type="pwdType"
          label="Password"
          @click:append="togglePwdShow"
        >
        </v-text-field>
        <v-btn
          type="submit"
          color="blue lighten-1 text-capitalize"
          depressed
          large
          block
          dark
          class="mb-3"
          @click="login"
        >
          Login
        </v-btn>
        <v-btn
          color="blue lighten-1 text-capitalize"
          depressed
          large
          block
          dark
          class="mb-3"
          @click="signup"
        >
          Sign Up
        </v-btn>
        <v-btn
          color="blue lighten-1 text-capitalize"
          depressed
          large
          block
          dark
          @click="find"
        >
          아이디/비밀번호 찾기
        </v-btn>
        <v-checkbox
          class="d-flex flex-row mb-6"
          v-model="checkbox"
          :label="'비밀번호 저장'"
        />
      </form>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      checkbox: false,
      showPwd: false,
    };
  },
  components: {},
  computed: {
    pwdType() {
      if (this.showPwd) {
        return "Password";
      } else {
        return "text";
      }
    },
  },
  methods: {
    find() {},
    signup() {},
    login() {},
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
  },
};
</script>
