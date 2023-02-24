<template>
  <div class="address">
    <SetDialogVue ref="postModal">
      <SignupPost
        @closeModal="this.closePost"
        @onApprove="this.approvePost"
      ></SignupPost>
    </SetDialogVue>
    <SetDialogVue ref="dialog">
      <div class="pa-5 addressSelect">
        <h4>주소록</h4>
        <hr class="mt-3 mb-3" />
        <div class="wrapperSpace mb-3">
          <i></i>
          <v-btn depressed color="primary" @click="addAddress" class="my-3"
            >배송지 추가</v-btn
          >
        </div>
        <div class="pa-5 border mb-3">
          <div v-for="(item, idx) in addresList" :key="idx" class="my-2">
            <div class="wrapperSpace mb-3" style="width: 100%; height: 20px">
              <div class="ml-4">
                <span style="">
                  {{ item.defaultYn ? "[기본배송지] " : "" }}
                </span>
                {{ `${item.name} ${item.pickname}` }}
              </div>
              <div>
                <v-btn small depressed @click="deleteAdd(item)">삭제</v-btn>
              </div>
            </div>
            <div class="wrapperSpace mb-5" style="width: 100%; height: 20px">
              <div>
                <v-subheader style="margin-left: 16px">{{
                  item.postcode
                }}</v-subheader>
                {{ `${item.address} ${item.address2}` }}
              </div>
              <div>
                <v-btn small depressed color="primary" @click="selectAdd(item)"
                  >선택</v-btn
                >
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <v-btn depressed color="primary" @click="approve">닫기</v-btn>
        </div>
      </div>
    </SetDialogVue>
  </div>
</template>

<script>
import SetDialogVue from "./SetDialog.vue";
import SignupPost from "@/views/member/SignupPost";
import { mapMutations } from "vuex";
import { insertBook } from "api/address/address";
import { addressbookList, addressbookDel } from "api/address/address";
export default {
  name: "Address",
  data: function () {
    return {
      param: {},
      addresList: [],
    };
  },
  watch: {},
  methods: {
    ...mapMutations("modal", ["SET_MODAL"]),
    ...mapMutations("popup", ["SET_POPUP"]),
    deleteAdd(v) {
      addressbookDel({ idx: v.idx }).then(() => {
        this.loadData();
      });
    },
    selectAdd(v) {
      console.log("selectValue", v);
      this.$emit("select", v);
      this.close();
    },
    closePost() {
      this.$refs.postModal.closeModal();
      this.SET_MODAL({
        width: 800,
        closable: true,
        customApprove: true,
      });
    },
    async approvePost(post) {
      this.param.post = post;
      // eslint-disable-next-line no-unused-vars
      const resAddress = await insertBook({
        ...post,
        memberId: this.param.email,
      });
      this.loadData();
    },
    open() {
      this.SET_MODAL({
        height: 100,
        width: 800,
        closable: true,
        customApprove: true,
      });
      this.loadData(() => {
        this.$refs.dialog.openModal();
      });
    },
    loadData(cb) {
      addressbookList()
        .then((res) => {
          const response = res.data;
          this.addresList = response.data;
          cb();
        })
        .catch(() => {});
    },
    close() {
      this.$refs.dialog.closeModal();
    },
    addAddress() {
      this.SET_MODAL({
        width: 650,
        closable: true,
        customApprove: true,
      });
      this.$refs.postModal.openModal();
    },
    approve() {
      this.close();
      this.$emit("onApprove", this.param);
    },
  },
  mounted() {},
  components: {
    SetDialogVue,
    SignupPost,
  },
};
</script>
<style lang="scss">
.border {
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.5) !important;
}
.addressSelect {
  .v-subheader {
    display: inline;
  }
  .scroll {
    max-height: 420px;
    overflow: auto;
  }
  .v-subheader {
    padding: 0px;
  }
}
</style>
