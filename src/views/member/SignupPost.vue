<template>
  <v-text-field></v-text-field>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    opApprove() {
      this.$router.push({ name: "main" });
    },
    login() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
.cardWrapper {
  display: flex;
  justify-content: center;
}
.col {
  flex-direction: column;
}

table {
  border: 1px solid;
  border-collapse: collapse;
  width: 60%;
  margin-top: 15px;
}
th,
td {
  border: 1px solid;
}
</style>
