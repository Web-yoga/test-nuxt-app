<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
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
  methods: {
    onSubmitted(postData) {
      //Add update Date to the post Data and send to farebase
      this.$axios
        .post(
          "https://nuxt-blog-dffff-default-rtdb.firebaseio.com/posts.json",
          { ...postData, updatedDate: new Date() }
        )
        .then((result) => console.log(result))
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
