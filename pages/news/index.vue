<template>
  <div class="container py-5">
    <app-infinite-list
      :limit="6"
      :filter="filter"
      :sort="{ date: -1 }"
      collection="articles"
    />
  </div>
</template>

<script>
import apiService from "@/services/api.service";
import { mapState } from "vuex";
import { setMetaTitle } from "@/services/util";
import AppInfiniteList from "@/components/AppInfiniteList";

export default {
  components: {
    AppInfiniteList,
  },
  data() {
    return {
      type: "Статья",
      title: "",
      content: "",
      images: [],
      articles: [],
      search: "",
      curDirection: "OpenGround",
      curDirectionId: "OpenGround",
    };
  },
  computed: {
    filter() {
      let filter = { type: this.type };
      if (this.curDirectionId) {
        filter["direction"] = this.curDirectionId;
      }
      if (this.search && this.search.length > 2) {
        filter["title"] = { $regex: `(${this.search})` };
        return filter;
      } else if (this.search === "") {
        return filter;
      }
      return filter;
    },
    breadcrumbs() {
      const curSeo =
        this.$route.name === "News" ? this.seo.news : this.seo.articles;
      if (this.title) {
        return [
          {
            name: curSeo.title,
            link: "/" + curSeo.slug,
          },
          {
            name: this.title,
          },
        ];
      }
      return [
        {
          name: curSeo.title,
          link: "/" + curSeo.slug,
        },
      ];
    },
    contentWrapped() {
      const c = this.content.replace(
        /<table[^>]*>[\s\S]*?<\/table>/g,
        '<div class="table-responsive">$&</div>'
      );
      const e = document.createElement("div");
      e.innerHTML = c;

      e.querySelectorAll("table").forEach(function (obj, i) {
        obj.setAttribute("class", "table article-table small table-bordered");
      });
      return e.innerHTML;
    },
    typeTitle() {
      return this.$route.name === "News"
        ? this.seo.news.title
        : this.seo.articles.title;
    },
    typeLink() {
      return this.$route.name === "News"
        ? this.seo.news.slug
        : this.seo.articles.slug;
    },
    slug() {
      return this.$route.params.slug;
    },
    ...mapState({}),
  },
  methods: {
    getArticle: function () {
      apiService.findOneInCollection("articles", { slug: this.slug }).then(
        (response) => {
          this.title = response.data.title;
          this.type = response.data.type;
          this.content = response.data.content;
          this.images = response.data.images;
          setMetaTitle(this.title, `${this.title} ${this.content}`, false);
        },
        (error) => {
          const err = {
            message: error.message,
            status: error.response?.status,
          };
          this.$store.commit("setError", err);
        }
      );
    },
  },
  created() {
    this.type = this.$route.name === "News" ? "Новость" : "Статья";
    if (this.slug) {
      this.getArticle();
    }
  },
};
</script>

<style scoped></style>
