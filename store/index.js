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
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit("setPosts", [
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
            ]);
            resolve();
          }, 1000);
        });
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
