export function setToken(context, { accessToken, refreshToken }) {
  context.$store.commit("SET_ACCESS_TOKEN", accessToken);
  context.$store.commit("SET_REFRESH_TOKEN", refreshToken);
}

export function getToken(context) {
  console.log("get", context);
  return {
    accessToken: context.$store.state.member.accessToken,
    refreshToken: context.$store.state.member.refreshToken,
  };
}
