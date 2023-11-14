import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
	  addPost(state, post){
		state.loadedPosts.push(post)
	  },
	  editPost(state, editedPost){
		const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
		state.loadedPosts[postIndex] = editedPost
	  },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return this.$axios.get(process.env.baseUrl + '/posts.json')
		.then(res => {
			// From firebase come object => transform to array
			//also add id
			const pastsArray = []
			for( const key in res.data){
				pastsArray.push({ ...res.data[key], id: key })
			}
			vuexContext.commit('setPosts', pastsArray)
		})
		.catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
	  addPost(vuexContext, postData) {
		const createdPost = {
			...postData,
			updatedDate: new Date()
		}
		return this.$axios
        .post(
			process.env.baseUrl + "/posts.json",
          createdPost
        )
        .then((result) => {
			//id - берем из результата записи в бд (name возвращаемое firebase) и добавляем в store
			vuexContext.commit('addPost', {...createdPost, id: result.data.name})
        })
        .catch((e) => console.log(e));
	  },
	  editPost(vuexContext, editedPost) {
      // this.$axios - т.к. код выполняется на клиенте
      return this.$axios
        .put(
          process.env.baseUrl + "/posts/" +
		  editedPost.id +
            ".json",
          editedPost
        )
        .then((res) => {
			vuexContext.commit('editPost', editedPost)
        })
        // context.error(e) - не можем показать 404 т.к. это запускается на клиенте
        .catch((e) => console.log(e));
	  },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
