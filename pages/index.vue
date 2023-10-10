<template>
  <button @click="onClick">Products</button>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    onClick() {
      this.$router.push("/products");
    },
  },
};
</script>
