<template>

    <div class="row nav">
        <div class="col-sm-2 text-center mt-3">
            <router-link to="/" class="link-secondary text-decoration-none">
                <img src="https://d1hbpr09pwz0sk.cloudfront.net/logo_url/nexgile-1d69d085" class="img-fluid" width="50">
            </router-link>
        </div>
        <div class="col-sm-7 ">
            <div class="form-outline mt-3 font12">
                <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
            </div>
        </div>
        <div class="col-3 d-flex">
            <div class="card-body d-flex">
                <div v-if="!auth">

                    <p class="mt-4">
                        <b>
                            <router-link to="/Login" class="link-secondary text-decoration-none">
                                Login
                            </router-link>
                        </b>
                    </p>
                </div>
                <div class="font11" v-if="auth">

                    <div class="font10">
                    <span class="ms-4">Hello,{{ name }}</span>
                    <div class="dropdown ms-3 font10">
                        <button class="btn btn-default btn-sm dropdown-toggle font10" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            My Account
                        </button>
                        <ul v-if="check=='User'" class="dropdown-menu font10" aria-labelledby="dropdownMenuButton1">
                            <li><router-link to="/Profile" class="dropdown-item">Profile</router-link></li>
                            <li><a class="dropdown-item" href="#">My orders</a></li>
                            <li><a class="dropdown-item" href="" @click="Logout">Logout</a></li>
                        </ul>
                        <ul v-if="check=='Admin'" class="dropdown-menu font10" aria-labelledby="dropdownMenuButton1">
                            <li><router-link to="Profile" class="dropdown-item">Profile</router-link></li>
                            <li><a class="dropdown-item" href="#">Order Management</a></li>
                            <li><a class="dropdown-item" href="#">Address Management</a></li>
                            <li><a class="dropdown-item" href="#">Payment Management</a></li>
                            <li><a class="dropdown-item" href="/UserDetails">UserDetails</a></li>
                            <li><a class="dropdown-item" href="/Productdetails">productDetails</a></li>
                            <li><a class="dropdown-item" href="" @click="Logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
                </div>
                <div class="mcart">

                <router-link to="/Cart" class="link-secondary text-decoration-none"><i
                        class="bi bi-cart"></i><sup class="badge" id='lblCartCount'>{{ cart
                        }}</sup></router-link>
                </div>
            </div>



        </div>
    
    <div class="row nav d-flex mt-3 font12">
        <div class="col-xs-12 col-md-12 col-lg-12 col-xl-12 text-center ">
            <router-link to="/SubCatagory/1" class="link-secondary text-decoration-none ms-3 ">Electronics & Computers</router-link>&nbsp&nbsp&nbsp
            <router-link to="" class="link-secondary text-decoration-none ">Home,Garden & Pets</router-link>&nbsp&nbsp&nbsp
            <router-link to="" class="link-secondary text-decoration-none ">Sports & Outdoors</router-link>&nbsp&nbsp&nbsp
            <router-link to="" class="link-secondary text-decoration-none ">Entertainments</router-link>

        </div>

    </div>
</div>

</template>
<script>
import axios from 'axios';
export default {
    name: 'Header',
    props: ['cart'],
    data() {
        return {
            auth: "",
            Role:"",
            check:localStorage.getItem('Role'),
            name: localStorage.getItem("firstName"),
            CountData: {
                no: localStorage.getItem("cartcount")
            },

        }
    },
    async mounted() {

        this.auth = localStorage.getItem('token');
        console.log("role", this.check)
    },
    methods:{
        Logout(){
            localStorage.removeItem("firstName");
            localStorage.removeItem('token');
            localStorage.removeItem('Role');
            this.$router.push({ path: "/Login" })
            this.$store.dispatch('setrouterAuthcheck', false)
            localStorage.setItem("check",false)
            
        }
    }



}
</script>
<style>
.nav {
    background-color: white;
}
</style>