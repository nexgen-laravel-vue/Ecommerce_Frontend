import { createRouter, createWebHistory } from "vue-router";
import Header from "../Header/Header.vue";
import Footer from "../Footer/Footer.vue";
import IndexPage from "../MainPage/IndexPage.vue";
import SubCatagory from "../category/SubCatagory.vue";
import ProductCatagory from "../category/ProductCatagory.vue";
import Register from "../Register/RegistrationPage.vue";
import Login from "../Login/LoginPage.vue";
import Admin from "../Admin/AdminPage.vue";
import customer from "../customer/customer.vue";
import store from "../Store/Store";
import UserData from "../Admin/UserData.vue";
import ProductByChildCategory from "../category/ProductByChildCategory.vue";
import singleProduct from "../category/singleProduct.vue";
import ProductData from "../Admin/ProductData.vue";
import Cart from "../cart/Cart.vue";
import ResetPassword from "../Login/ResetPassword.vue";
import Profile from '../Profile/Profile.vue';
import SendingMail from '../Login/SendingMail.vue'
import ProductByBrands from "../category/ProductByBrands/ProductByBrands.vue";
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
    name: "UserData",
    component: UserData,
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
    name: "ProductData",
    component: ProductData,
    path: "/ProductDetails",
    meta: { auth: true },
  },
  {
    name: "Cart",
    component: Cart,
    path: "/Cart",
    meta: { auth: true },
  },
  {
    name:"ResetPassword",
    component:ResetPassword,
    path:"/ResetPassword"
  },
  {
    name:'Profile',
    component:Profile,
    path:'/Profile'
  },
  {
    name:'SendingMail',
    component:SendingMail,
    path:'/sendingmail'
  }
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
