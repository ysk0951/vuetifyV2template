const popup = {
  namespaced: true,
  state: {
    param: {},
    dialogTitle: "",
    dialogText: "",
    maxWidth: 150,
    height: 150,
    closable: false,
    callback: undefined,
    customApprove: false,
    approveName: "확인",
  },
  mutations: {
    SET_PARAM(state, value) {
      state.param = value;
    },
    SET_POPUP_TITLE(state, value) {
      state.dialogTitle = value;
    },
    SET_POPUP_TEXT(state, value) {
      state.dialogText = value;
    },
    SET_MAX_WIDTH(state, value) {
      state.maxWidth = value;
    },
    SET_HIGHT(state, value) {
      state.height = value;
    },
    SET_CLOSABLE(state, value) {
      state.closable = value;
    },
    SET_CUSTOM_APPROVE(state, value) {
      state.customApprove = value;
    },
    SET_POPUP(state, value) {
      this.commit("popup/RESET_POPUP");
      state.param = value.param;
      state.dialogTitle = value.title;
      state.dialogText = value.text;
      state.maxWidth = value.width;
      state.height = value.height;
      state.closable = value.closable;
      state.callback = value.callback;
      state.customApprove = value.customApprove;
      state.approveName = value.approveName ? value.approveName : "확인";
    },
    RESET_POPUP(state) {
      state.param = {};
      state.dialogTitle = "";
      state.dialogText = "";
      state.maxWidth = 150;
      state.height = 150;
      state.closable = false;
      state.callback = undefined;
      state.customApprove = false;
      state.approveName = "확인";
    },
    SET_CALL_BACK(state, value) {
      state.callback = value;
    },
  },
  getters: {},
  actions: {},
};

export default popup;
