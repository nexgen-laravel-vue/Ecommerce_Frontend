import { createRouter, createWebHistory } from "vue-router";
import Header from "../Header/Header.vue";
import Footer from "../Footer/Footer.vue";
import IndexPage from "../MainPage/IndexPage.vue";
import NavBar from "../Header/NavBar.vue";
import SubCatagory from "../SubCatagory/SubCatagory.vue";
import ProductByBrands from "../ProductByBrands/ProductByBrands.vue";
import ProductCatagory from "../SubCatagory/ProductCatagory.vue";
import Register from "../Register/RegistrationPage.vue";
import Login from "../Login/LoginPage.vue";
import Admin from "../Admin/AdminPage.vue";
import customer from "../customer/customer.vue";
import store from "../Store/Store";
import UserDetails from "../Details/UserDetails.vue";
import ProductByChildCategory from "../SubCatagory/ProductByChildCategory.vue";
import singleProduct from "../SubCatagory/singleProduct.vue";
import ProductDetails from "../Details/ProductDetails.vue";
import Cart from "../Header/Cart.vue";

const routes = [
  {
    name: "Header",
    component: Header,
    path: "/Header",
  },
  {
    name: "Footer",
    component: Footer,
    path: "/Footer",
  },
  {
    name: "IndexPage",
    component: IndexPage,
    path: "/",
  },
  {
    name: "NavBar",
    component: NavBar,
    path: "/NavBar",
  },
  {
    name: "SubCatagory",
    component: SubCatagory,
    path: "/SubCatagory/:id",
  },
  {
    name: "ProductByBrands",
    component: ProductByBrands,
    path: "/ProductByBrands/:id",
  },
  {
    name: "ProductCatagory",
    component: ProductCatagory,
    path: "/ProductCatagory/:id",
  },
  {
    name: "Register",
    component: Register,
    path: "/Register",
  },
  {
    name: "Login",
    component: Login,
    path: "/Login",
  },
  {
    name: "Admin",
    component: Admin,
    path: "/Admin",
    meta: { auth: true },
  },
  {
    name: "customer",
    component: customer,
    path: "/customer",
    meta: { auth: true },
  },
  {
    name: "UserDetails",
    component: UserDetails,
    path: "/UserDetails",
    meta: { auth: true },
  },
  {
    name: "ProductByChildCategory",
    component: ProductByChildCategory,
    path: "/ProductByChildCategory/:id",
  },
  {
    name: "singleProduct",
    component: singleProduct,
    path: "/singleProduct/:id",
  },
  {
    name: "ProductDetails",
    component: ProductDetails,
    path: "/ProductDetails",
    meta: { auth: true },
  },
  {
    name: "Cart",
    component: Cart,
    path: "/Cart",
    meta: { auth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {

  let routerAuthcheck = store.state.routerAuthcheck;
  let token =localStorage.getItem("token")
  if (to.matched.some((record) => record.meta.auth)) {
    if (routerAuthcheck || token) {
      next();
    } else {
      router.replace("/login");
    }
  } else {
    next();
  }
});
export default router;
