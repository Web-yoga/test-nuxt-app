export default function(context) {
// Getting token from Local store if exist and save it in Vuex store
    context.store.dispatch("initAuth", context.req);
}
