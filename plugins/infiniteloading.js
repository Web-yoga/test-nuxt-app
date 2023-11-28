import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
/**
 * 
   1 Create a list base on v-for in your template;
   2 Put the InfiniteLoading component on the bottom of the list;
   3 Listen the infinite event on the InfiniteLoading component.

 */
Vue.component('infinite-loading', InfiniteLoading)