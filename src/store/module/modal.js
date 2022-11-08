const modal = {
  namespaced: true,
  state: {
    param: {},
    dialogTitle: "",
    dialogText: "",
    maxWidth: 450,
    height: 450,
    closable: false,
    callback: undefined,
    customApprove: false,
  },
  mutations: {
    SET_PARAM(state, value) {
      state.param = value;
    },
    SET_DIALOG_TITLE(state, value) {
      state.dialogTitle = value;
    },
    SET_DIALOG_TEXT(state, value) {
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
    SET_MODAL(state, value) {
      this.commit("modal/RESET_MODAL");
      state.param = value.param;
      state.dialogTitle = value.title;
      state.dialogText = value.text;
      state.maxWidth = value.width;
      state.height = value.height;
      state.closable = value.closable;
      state.callback = value.callback;
      state.customApprove = value.customApprove;
    },
    RESET_MODAL(state) {
      state.param = {};
      state.dialogTitle = "";
      state.dialogText = "";
      state.maxWidth = 450;
      state.height = 450;
      state.closable = false;
      state.callback = undefined;
      state.customApprove = false;
    },
    SET_CALL_BACK(state, value) {
      state.callback = value;
    },
  },
  getters: {},
  actions: {},
};

export default modal;
