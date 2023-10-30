<template>
  <section class="post-list">
    <PostPreview
      id="1"
      title="Title Post 1"
      previewText="Preview Text 1"
      thumbnail="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    />
    <PostPreview
      id="2"
      title="Title Post 2"
      previewText="Preview Text 2"
      thumbnail="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    />
    <PostPreview
      id="3"
      title="Title Post 3"
      previewText="Preview Text 3"
      thumbnail="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  name: "PostList",
  components: {
    PostPreview,
  },
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
