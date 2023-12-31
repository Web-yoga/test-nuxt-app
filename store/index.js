import Vuex from "vuex";
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
	  token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
	  addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
		///posts.json?startAt=1&endAt=3
		//https://nuxt-blog-dffff-default-rtdb.firebaseio.com/posts.json?orderBy=%22updatedDate%22&startAt=1&print=pretty
        return this.$axios.$get(process.env.baseUrl + '/posts.json')
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
	  addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return this.$axios
          .$post(
            process.env.baseUrl + "/posts.json?auth=" +
              vuexContext.state.token,
            createdPost
          )
          .then(data => {
            vuexContext.commit("addPost", { ...createdPost, id: data.name });
          })
          .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
		//add auth token from store
        return this.$axios
          .$put(
            process.env.baseUrl + "/posts/" +
              editedPost.id +
              ".json?auth=" +
              vuexContext.state.token,
            editedPost
          )
          .then(res => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
	  authenticateUser(vuexContext, authData) {
		let authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.fireBaseAPIKey;
      if (authData.isLogin) {
        //sing in
        authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.fireBaseAPIKey;
      }
      //API_KEY from firebase project settings
      return this.$axios
        .$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
          .then(result => {
            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + result.expiresIn * 1000
            );
			Cookie.set('token', result.idToken);
			Cookie.set('expirationDate', new Date().getTime() + result.expiresIn * 1000);

			return this.$axios.$post('http://localhost:3000/api/track-data',{data: `Register email: ${authData.email}`})
          })
          .catch(e => console.log(e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
		// req - normal node.js request; req.headers.cookie - cookie header
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const tokenCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("token="));
          if (!tokenCookie) {
            return;
          }
          token = tokenCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else if (process.client) {
			//if not server rendering => use local storage
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }else {
			//static page genetation
			token = null;
			expirationDate = null;
		}
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
		  //vuexContext.commit('clearToken');
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
	  logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("token");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
	  isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
