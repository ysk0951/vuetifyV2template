const member = {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    TOGGLE_LOADING(state) {
      state.loading = !state.loading;
    },
  },
  getters: {},
  actions: {},
};

export default member;
