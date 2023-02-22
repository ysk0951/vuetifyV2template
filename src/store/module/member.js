const member = {
  namespaced: true,
  state: {
    accessToken: "",
    refreshToken: "",
    defaultAddress: {},
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    SET_DEFAULT_ADDRESS(state, payload) {
      state.defaultAddress = payload.data.data;
    },
  },
  getters: {},
  actions: {},
};

export default member;
