<template>
  <div class="row list" ref="scrollComponent" v-if="items">
    <div class="col-6 col-md-4" v-for="(item, index) in items" :key="index">
      <template v-if="collection === 'articles'">
        <ArticleCard :item="item" :needToTransform="true"></ArticleCard>
      </template>
    </div>
    <div v-show="isLoading">
      <AppSpinner />
    </div>
  </div>
</template>

<script>
import { ref, toRefs, onMounted, onUnmounted } from "vue";
import apiService from "@/services/api.service";
import ArticleCard from "@/components/Swiper/ArticleCard";
import AppSpinner from "@/components/AppSpinner";

export default {
  name: "AppInfiniteList",
  components: {
    ArticleCard,
    AppSpinner,
  },
  setup(props) {
    const { collection, limit, filter, sort } = toRefs(props);
    const items = ref([]);
    const scrollComponent = ref(null);
    const isLoading = ref(false);
    const isFinish = ref(false);

    const getItems = async () => {
      try {
        if (limit.value) {
          isLoading.value = true;
          const newItems = await apiService.getCollectionStep(
            collection.value,
            {
              sort: sort.value,
              filter: filter.value,
              limit: limit.value,
              skip: items.value.length,
            }
          );
          items.value.push(...newItems.data);
          isLoading.value = null;
          if (newItems.data.length < limit.value) {
            isFinish.value = true;
            window.removeEventListener("scroll", handleScroll);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = (e) => {
      if (!isLoading.value) {
        let element = scrollComponent.value;
        if (element.getBoundingClientRect().bottom < window.innerHeight) {
          getItems();
        }
      }
    };

    getItems();

    return {
      items,
      scrollComponent,
      isLoading,
    };
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
    sort: {
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
