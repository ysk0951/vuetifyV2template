<template>
  <div class="wrapper">
    <SetDialog ref="findModal" />
    <div class="pa-10">
      <h3 style="text-align: left">{{ `${tabKey(this.key)} 찾기` }}</h3>
      <hr class="mb-3" />
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item" @click="move(item)">
          {{ tabKey(item) }}
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="tab"
        :style="'min-width:' + (this.maxWidth - 100) + 'px'"
      >
        <v-tab-item v-for="item in items" :key="item">
          <v-card flat>
            <template v-if="key === 'id'">
              <template v-if="!isApproved">
                <FindIdForm @closeModal="closeModal" @onApprove="onApprove" />
              </template>
              <template v-else-if="isApproved">
                <FindIdResult
                  :setting="{
                    isSuccessFindId,
                    memberId,
                  }"
                />
              </template>
            </template>
            <template v-if="key === 'pw'">
              <template v-if="!isApproved">
                <FindPwForm @closeModal="closeModal" @onApprove="onApprove" />
              </template>
            </template>
            <template v-else> </template>
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
export const FindKey = {
  id: "아이디",
  pw: "패스워드",
};
export default {
  data() {
    return {
      //setting
      checkbox: false,
      showPwd: false,
      tab: 0,
      key: "id",
      text: "2",
      items: ["id", "pw"],
      //find ret
      isApproved: false,
      isSuccessFindId: false,
      isSuccessFindPW: false,
      memberId: "",
    };
  },
  components: {
    SetDialog,
    FindIdForm,
    FindIdResult,
    FindPwForm,
  },
  mounted() {
    this.key = this.param;
    this.setCb();
  },
  watch: {
    key: function () {
      this.setCb();
    },
  },
  computed: {
    ...mapState("modal", ["param", "maxWidth"]),
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
  methods: {
    ...mapMutations("modal", ["SET_PARAM", "SET_CALL_BACK"]),
    move(key) {
      this.key = key;
    },
    tabKey(key) {
      return FindKey[key];
    },
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
    findPwCb() {
      console.log("pw Cb");
    },
    setCb() {
      if (this.key === "id") {
        this.SET_CALL_BACK(this.findIdCb);
      } else if (this.key === "pw") {
        this.SET_CALL_BACK(this.findPwCb);
      }
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

.v-item-group div {
  color: black !important;
}
</style>
