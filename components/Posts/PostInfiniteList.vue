<template>
  <div class="row list" ref="scrollComponent" v-if="items">
    <section class="post-list">
      <PostPreview
        v-for="post in items"
        :key="post.id"
        :id="post.id"
        :is-admin="isAdmin"
        :title="post.title"
        :previewText="post.previewText"
        :thumbnail="post.thumbnail"
      />
      <infinite-loading
        v-if="items.length"
        spinner="bubbles"
        @infinite="infiniteScroll"
      ></infinite-loading>
    </section>
    <div v-show="isLoading">
      <app-spinner />
    </div>
  </div>
</template>

<script>
import { ref, toRefs, onMounted, onUnmounted } from "vue";
import PostPreview from "@/components/Posts/PostPreview";
import AppSpinner from "@/components/AppSpinner";

export default {
  name: "PostInfiniteList",
  components: {
    PostPreview,
    AppSpinner,
  },
  data() {
    return {
      items: [],
      page: 1,
    };
  },
  computed: {
    url() {
      return "https://jsonplaceholder.typicode.com/photos?_page=" + this.page;
    },
  },
  created() {
    this.getPhotos();
  },
  props: {
    limit: {
      type: Number,
      default: 3,
    },
    filter: {
      type: Object,
      required: true,
    },
    collection: {
      type: String,
      default: "articles",
      /** articles | youbube */
    },
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
