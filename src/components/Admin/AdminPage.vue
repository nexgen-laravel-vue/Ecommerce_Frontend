<template>
    <div class="container">

   
    <div class="row nav">
        <div class="col-sm-2 text-center mt-3">
            <router-link to="/" class="link-secondary text-decoration-none">
                <img src="https://d1hbpr09pwz0sk.cloudfront.net/logo_url/nexgile-1d69d085" class="img-fluid" width="50">
            </router-link>
        </div>
        <div class="col-sm-7 ">
            <div class="form-outline mt-3">
                <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
            </div>
        </div>
        <div class="col-3 d-flex">
            <div class="card-body d-flex">
                <div class="font11">

                    <div class="font10">
                        <span class="ms-2">Hello,{{ name }}</span>
                        <div class="dropdown">
                            <button class="btn btn-default btn-sm dropdown-toggle font10" type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                My Account
                            </button>
                            <ul class="dropdown-menu font10" aria-labelledby="dropdownMenuButton1">
                                <li><router-link to="/Profile" class="dropdown-item"> Profile</router-link></li>
                                <li><a class="dropdown-item" href="#">Order Management</a></li>
                                <li><a class="dropdown-item" href="#">Address Management</a></li>
                                <li><a class="dropdown-item" href="#">Payment Management</a></li>
                                <li><a class="dropdown-item" href="/UserDetails">UserDetails</a></li>
                                <li><a class="dropdown-item" href="/Productdetails">productDetails</a></li>
                                <li><button class="dropdown-item" v-on:click="Logout">Logout</button></li>
    
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="row nav d-flex">
            <div class="col-sm-12  col-md-12 col-lg-12 text-center ">
                <router-link to="/UserDetails"
                    class="link-secondary text-decoration-none ms-3">UserDetails</router-link>
                <router-link to="/ProductDetails"
                    class="link-secondary text-decoration-none ms-3">ProductDetails</router-link>
            </div>
        </div> -->
    </div>


    <div class="container">
        <div class="mt-2">
            <h2 class="text-center">SHOP BY CATEGORY</h2>
        </div>
        <div class="row p-3">
            <div class="col-md-3 col-sm-12" v-for="items in list" :key="items.id">
                <router-link :to="`/SubCatagory/${items.id}`" class="nav-item nav-link active">
                    <div class="card mb-5 p-5" style="width:16rem">
                        <p class="text-center m-0">{{ items.categoryName }}</p>
                        <div v-on:click="image(items.categoryName)" class="card-body">
                            <img :src="items.categoryImage" class="img-fluid" width="250" height="100">
                        </div>

                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <div class="container">
        
            <h2 class="text-center mt-2">SHOP BY BRAND</h2>
        
        <div class="row p-3">
            <div class="col-md-3 col-sm-12" v-for="items in Brandlist" :key="items.id">
                <router-link :to="`/ProductByBrands/${items.id}`" class="nav-item nav-link active">
                    <div class="card mb-5 p-5 " style="width:16rem">
                        <p class="text-center m-0">{{ items.brandName }}</p>
                        <div v-on:click="image(items.brandlogo)" class="card-body">
                            <img :src="items.brandlogo" class="img-fluid" width="250" height="100">
                        </div>

                    </div>
                </router-link>
            </div>
        </div>
        </div>
        <div class="bg-light p-4">

        <Footer />
        </div>
    </div>

</template>
<script>
import axios from 'axios';
import Footer from '../Footer/Footer.vue';
import { getAllParentCategory } from '../service/api/ApiServices';
import {getAllBrand} from '../service/api/ApiServices';
export default {
    name: "Admin",
    components: {
        Footer

    },
    data() {
        return {
            name: localStorage.getItem("firstName"),
            list: [],
            Brandlist: [],
            CountData: {
                no: localStorage.getItem("cartcount")
            }
        }
    },
    methods: {
        Logout() {

            localStorage.removeItem("firstName");
            localStorage.removeItem("token");
            this.$router.push({ path: "/Login" });

        }
    },
    async mounted() {
        getAllParentCategory('getAllParentCategory').then((result)=>{
            
            if (result.status == 200 && result.data.payload.length > 0) {
                    const data = result.data.payload;
                    this.list = data;
                    console.log(this.list);

                 }
            })

            getAllBrand('getAllBrand').then((result)=>{


                if (result.status == 200 && result.data.payload.length > 0) {
                        const data = result.data.payload;
                        this.Brandlist = data;
                        console.log(this.Brandlist);

                    }

})



    },

}
</script>