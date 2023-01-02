import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      routerAuthcheck: false,
      Role: localStorage.getItem("Role"),
      token: localStorage.getItem("token"),
      cartItemCount: 0,
      cartItems: [],
    };
  },
  mutations: {
    setrouterAuthcheck(state, playload) {
      state.routerAuthcheck = playload;
    },
    ADD_TO_CART(state, { product, quantity }) {
      state.cart.push({
        product,
        quantity,
      });
    },
  },
  actions: {
    setrouterAuthcheck(context, playload) {
      context.commit("setrouterAuthcheck", playload);
    },
    addProductTocart(commit, { product, quantity }) {
      commit("ADD_TO_CART", { product, quantity });
    },
  },
});

export default store;
