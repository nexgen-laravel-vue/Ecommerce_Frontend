<template>
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
                                <li><a class="dropdown-item" href="#">Profile</a></li>
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
                <router-link to="" class="link-secondary text-decoration-none ms-3">ProductDetails</router-link>
            </div>
        </div> -->
    </div>
    <div class="container">
        <div class="row ">
            <div class="col-12">
                <h1 class="text-center">Product Details</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">productName</th>
                            <th scope="col">productDescription</th>
                            <th scope="col">product_img</th>
                            <th scope="col">Modify</th>
                            <th scope="col">Remove</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in getData[0]" :key="index">
                            <td>{{ index }}</td>
                            <td>{{ item.productName }}</td>
                            <td>{{ item.productDescription }}</td>
                            <td> <img :src="item.product_img" class="img-fluid" width="50" height="100"></td>

                            <td>
                                <router-link to=""> <button type="button"
                                        class="btn btn-primary">Update</button></router-link>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" @click="delete (item.id)">Delete</button>
                            </td>

                        </tr>

                    </tbody>
                </table>

            </div>

        </div>

    </div>
</template>
<script>
import axios from 'axios';
import { getAllProduct } from '../service/api/ApiServices';
export default {
    name: "UserDetails",
    data() {
        return {
            getData: [],
            name: localStorage.getItem("firstName"),
            CountData: {
                no: this.$cookies.get("count")
            }
        }
    },
    async created() {

        getAllProduct().then((res)=>{

            if (res.status == 200) {
            const data = res.data.payload;
            console.log("Product", data)
            this.getData.push(data);
        }

        })
    },
    methods: {
        Logout() {
            this.$router.push({ path: "/Login" })
            localStorage.removeItem("firstName");
            localStorage.removeItem("token");
            this.$store.dispatch('setrouterAuthcheck', false)


        },
        deleteProdu(){
             this.axois("")
        }

    }

}
</script>