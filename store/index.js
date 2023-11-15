import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return this.$axios.$get('https://nuxt-blog-dffff-default-rtdb.firebaseio.com/posts.json')
		.then(data => {
			// From firebase come object => transform to array
			//also add id
			const pastsArray = []
			for( const key in data){
				pastsArray.push({ ...data[key], id: key })
			}
			vuexContext.commit('setPosts', pastsArray)
		})
		.catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
