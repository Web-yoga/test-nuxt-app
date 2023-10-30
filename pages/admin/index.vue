<template>
  <div class="admin-page">
    <section class="new-post">
      <button>Create Post</button>
    </section>
    <section class="existing-posts">
      <PostList />
    </section>
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList,
  },
};
</script>
