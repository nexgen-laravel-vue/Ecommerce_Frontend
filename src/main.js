import { createApp } from 'vue';
import App from './App.vue';
import router from './components/Routing/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import store from './components/Store/Store';
import VueCookies from 'vue3-cookies'
import './Styles/Styles.css'

axios.defaults.baseURL=`${import.meta.env.VITE_APP_ROOT_API}`;
axios.defaults.headers.common['Authorization']=`Bearer  ${localStorage.getItem('token')}`;
createApp(App)
.use(store)
.use(router)
.use(VueCookies, {
    expireTimes: "30d",
})
.mount('#app')


