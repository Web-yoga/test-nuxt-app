<template>
  <div class="post-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList,
  },
  asyncData(context, callback) {
    callback(null, {
      loadedPosts: [
        {
          id: "1",
          title: "Alexaned Post 1",
          content: "Super Post content",
          previewText: "preview text of post",
          thumbnail:
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        },
        {
          id: "2",
          title: "Alexaned Post 2",
          content: "Super Post content",
          previewText: "preview text of post",
          thumbnail:
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        },
        {
          id: "3",
          title: "Alexaned Post 3",
          content: "Super Post content",
          previewText: "preview text of post",
          thumbnail:
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        },
      ],
    });
  },
};
</script>

<style scoped>
.post-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
