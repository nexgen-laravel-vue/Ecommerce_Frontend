import { createApp } from 'vue';
import App from './App.vue';
import router from './components/Routing/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import store from './components/Store/Store';
import VueCookies from 'vue3-cookies'
import './Styles/Styles.css'

let token=localStorage.getItem('token');
console.log(token)
axios.defaults.baseURL='http://192.168.1.250:8000/api/';
axios.defaults.headers.common['Authorization']=`Bearer  ${localStorage.getItem('token')}`;
createApp(App)
.use(store)
.use(router)
.use(VueCookies, {
    expireTimes: "30d",
})
.mount('#app')


