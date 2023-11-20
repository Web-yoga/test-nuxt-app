export default function(context) {
// Getting token from Local store if exist and save it in Vuex store
  if (process.client) {
    context.store.dispatch("initAuth");
  }
}
