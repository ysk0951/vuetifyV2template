export function setToken(context, { accessToken, refreshToken }) {
  context.$store.commit("SET_ACCESS_TOKEN", accessToken);
  context.$store.commit("SET_REFRESH_TOKEN", refreshToken);
}
