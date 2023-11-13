<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  async asyncData({ $axios, params }) {
    //firebase request have to end by '.json'
    return $axios
      .get(
        "https://nuxt-blog-dffff-default-rtdb.firebaseio.com/posts/" +
          params.postId +
          ".json"
      )
      .then((res) => {
        // Add ID from firebase for feture updates
        return {
          loadedPost: { ...res.data, id: params.postId },
        };
      })
      .catch((e) => context.error(e));
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    },
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
