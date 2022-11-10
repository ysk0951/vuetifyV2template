<template>
  <div class="wrapper" :style="'height:' + this.height + 'px; width:100%'">
    <SetDialog ref="findModal" />
    <div class="pa-10">
      <h3 style="text-align: left">{{ `${tabKey(this.tab)}` }}</h3>
      <hr class="mb-3" />
      <v-tabs v-model="tab">
        <v-tab
          v-for="(item, index) in items"
          :key="item.key"
          @click="changeTab(index)"
        >
          {{ item.value }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="tab"
        :style="'min-width:' + (this.maxWidth - 100) + 'px'"
      >
        <v-tab-item v-for="item in items" :key="item.key">
          <v-card flat>
            <template v-if="tab === 0">
              <template v-if="!isApproved">
                <FindIdForm @closeModal="closeModal" @onApprove="onApprove" />
              </template>
              <template v-else-if="isApproved">
                <FindIdResult
                  :setting="{
                    isSuccessFindId,
                    memberId,
                    errorMessage,
                  }"
                  @loginByFindId="loginByFindId"
                  @back="back"
                />
              </template>
            </template>
            <template v-if="tab === 1">
              <FindPwForm @closeModal="closeModal" @onApprove="onApprove" />
            </template>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";
import FindIdForm from "@/views/member/FindIdForm.vue";
import FindIdResult from "@/views/member/FindIdResult.vue";
import FindPwForm from "@/views/member/FindPwForm.vue";

import { mapState, mapMutations } from "vuex";
import { searchUserId } from "api/member/member";
import _ from "lodash";
export default {
  props: ["propsTab"],
  watch: {
    propsTab: function (v) {
      this.tab = v;
    },
  },
  data() {
    return {
      //setting
      checkbox: false,
      showPwd: false,
      tab: this.propsTab,
      items: [
        { key: "id", value: "아이디 찾기" },
        { key: "pw", value: "패스워드 찾기" },
      ],
      //find ret
      isApproved: false,
      isSuccessFindId: false,
      isSuccessFindPW: false,
      memberId: "",
      errorMessage: "",
    };
  },
  components: {
    SetDialog,
    FindIdForm,
    FindIdResult,
    FindPwForm,
  },
  computed: {
    ...mapState("modal", ["maxWidth", "height"]),
    pwdType() {
      if (this.showPwd) {
        return "Password";
      } else {
        return "text";
      }
    },
  },
  methods: {
    ...mapMutations("modal", ["SET_PARAM", "SET_CALL_BACK"]),
    tabKey() {
      return this.items[this.tab].value;
    },
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
    changeTab(tab) {
      this.$emit("changeTab", tab);
    },
    closeModal() {
      this.$emit("close");
    },
    onApprove(param, key) {
      if (key === "id") {
        searchUserId(param)
          .then((res) => {
            const resBody = res.data;
            this.isApproved = true;
            if (!_.isEmpty(resBody.errorCode)) {
              this.isSuccessFindId = false;
              this.errorMessage = resBody.errorMessage;
            } else {
              this.isSuccessFindId = true;
              this.memberId = resBody.data.item.memberid;
            }
          })
          .catch(() => {})
          .finally(() => {});
      } else if (key === "pw") {
        key;
      }
    },
    loginByFindId(id) {
      this.clearSetting();
      this.$emit("loginByFindId", id);
    },
    back() {
      this.clearSetting();
    },
    clearSetting() {
      this.isSuccessFindId = false;
      this.isSuccessFindPW = false;
      this.isApproved = false;
      this.memberId = "";
      this.errorMessage = "";
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
