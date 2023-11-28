<template>
  <router-link :to="`${itemData.link}`">
    <div
      class="image-wraper ratio ratio-4x3"
      :style="{backgroundImage: `url(${itemData.image})`}"
    ></div>
    <div class="item-title fw-bold">
      {{ itemData.title }}
    </div>
    <div class="item-text" v-html="itemData.text"></div>
  </router-link>
</template>

<script>
import clip from 'text-clipper'
import {getAnnouncementImage} from '@/services/util'

export default {
  name: 'ArticleCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
    needToTransform: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    itemData() {
      if (this.needToTransform) {
        let announcementText = this.item.announcement.text
        if (!announcementText) {
          announcementText = this.item.content
        }
        announcementText = clip(announcementText, 160, {
          html: true,
          maxLines: 5,
          breakWords: true,
          indicator: '...',
        })
        /** TODO!!!!! remove cyrilic type */
        let link = this.item.type === 'Новость' ? '/news/' : '/articles/'
        return {
          image: this.announcementImage,
          title: this.item.title,
          text: announcementText,
          link: link + this.item.slug,
          tags: this.item.tags,
        }
      }
      return this.item
    },
    announcementImage() {
      return getAnnouncementImage(this.item)
    },
  },
}
</script>
<style scoped>
a:hover .image-wraper {
  box-shadow: 0px 2px 10px #ccc;
}
a:hover .item-text {
  color: var(--bs-body-color);
}
</style>
