const member = {
  namespaced: true,
  state: {
    accessToken: "",
    refreshToken: "",
  },
  mutations: {
    SET_TOKEN(state, payload) {
      console.log(payload);
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
  },
  getters: {},
  actions: {},
};

export default member;
