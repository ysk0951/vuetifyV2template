const member = {
  state: {
    accessToken: "",
    refreshToken: "",
  },
  mutations: {
    SET_ACCESS_TOKEN(state, value) {
      state.accessToken = value;
    },
    SET_REFRESH_TOKEN(state, value) {
      state.refreshToken = value;
    },
  },
  getters: {},
  actions: {},
};

export default member;
