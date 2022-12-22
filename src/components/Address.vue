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
          <v-btn depressed color="primary" @click="addAddress"
            >배송지 추가</v-btn
          >
        </div>
        <div class="pa-5 border mb-3">
          <div
            v-for="(item, idx) in addresList"
            :key="idx"
            class="wrapperSpace my-2"
          >
            <div class="wrapperSpace" style="width: 100%">
              <div>
                <v-subheader>{{ item.postcode }}</v-subheader>
                {{ `${item.address} ${item.address2}` }}
              </div>
              <div>
                <v-btn depressed color="primary">선택</v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <v-btn depressed color="primary" @click="approve">확인</v-btn>
        </div>
      </div>
    </SetDialogVue>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SetDialogVue from "./SetDialog.vue";
import { addressbookList } from "api/address/address";
import SignupPost from "@/views/member/SignupPost";
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
    closePost() {
      this.$refs.postModal.closeModal();
      this.SET_MODAL({
        height: 600,
        width: 800,
        closable: true,
        customApprove: true,
      });
    },
    approvePost(post) {
      this.param.post = post;
    },
    open() {
      this.SET_MODAL({
        height: 100,
        width: 800,
        closable: true,
        customApprove: true,
      });
      addressbookList()
        .then((res) => {
          const response = res.data;
          this.addresList = response.data;
        })
        .catch(() => {});
      this.$refs.dialog.openModal();
    },
    addAddress() {
      this.SET_MODAL({
        height: 600,
        width: 650,
        closable: true,
        customApprove: true,
      });
      this.$refs.postModal.openModal();
    },
    approve() {
      this.$refs.dialog.closeModal();
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
<style scss>
.border {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15) !important;
}
.addressSelect .v-subheader {
  display: inline;
}
</style>
