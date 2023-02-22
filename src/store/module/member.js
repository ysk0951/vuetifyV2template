const member = {
  namespaced: true,
  state: {
    accessToken: "",
    refreshToken: "",
    defaultAddress: {},
    userInfo: {},
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    SET_DEFAULT_ADDRESS(state, payload) {
      state.defaultAddress = payload.data.data;
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload.data.data;
    },
    LOGOUT() {
      this.state = {
        accessToken: "",
        refreshToken: "",
        defaultAddress: {},
        userInfo: {},
      };
    },
  },
  getters: {},
  actions: {},
};

export default member;
