<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
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
        return {
          loadedPost: res.data,
        };
      })
      .catch((e) => context.error(e));
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
