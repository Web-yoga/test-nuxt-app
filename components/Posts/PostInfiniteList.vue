<template>
  <div class="row list" v-if="list">
    <section class="post-list">
      <!--
      <PostPreview
        v-for="post in items"
        :key="post.id"
        :id="post.id"
        :is-admin="isAdmin"
        :title="post.title"
        :previewText="post.previewText"
        :thumbnail="post.thumbnail"
      />
	  -->
      <div v-for="(item, $index) in list" :key="$index" :data-num="$index + 1">
        <p>post</p>
        <p>{$index}</p>
      </div>
      <client-only>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </client-only>
    </section>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import PostPreview from "@/components/Posts/PostPreview";
import AppSpinner from "@/components/AppSpinner";

export default {
  name: "PostInfiniteList",
  components: {
    PostPreview,
    AppSpinner,
    InfiniteLoading,
  },
  data() {
    return {
      list: [],
      page: 1,
      countItemsOnPage: 3,
    };
  },
  methods: {
    async getPostsByPage() {
      /** SIMULATION PAGE from firebase for TEST */
      const data = await this.$axios.$get(process.env.baseUrl + "/posts.json");
      const pastsArray = [];
      for (const key in data) {
        pastsArray.push({ ...data[key], id: key });
      }

      const pageItems = pastsArray.slice(
        this.page * this.countItemsOnPage - this.countItemsOnPage,
        this.page * this.countItemsOnPage
      );
      console.log("pastsArray");
      console.log(pageItems);
      return pageItems;
    },
    infiniteHandler($state) {
      axios
        .get(process.env.baseUrl + "/posts.json")
        .then(({ data }) => {
          /** SIMULATION PAGE from firebase for TEST */
          const pastsArray = [];
          for (const key in data) {
            pastsArray.push({ ...data[key], id: key });
          }
          const pageItems = pastsArray.slice(
            this.page * this.countItemsOnPage - this.countItemsOnPage,
            this.page * this.countItemsOnPage
          );
          console.log("pastsArray");
          console.log(pageItems);
          return pageItems;
        })
        .then(({ data }) => {
          if (data.length) {
            this.page += 1;
            this.list.push(...data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
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
