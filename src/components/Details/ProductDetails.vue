<template>
    <div class="row nav">
        <div class="col-sm-2 text-center mt-3">
            <router-link to="/" class="link-secondary text-decoration-none">
                <h3>Logo</h3>
            </router-link>
        </div>
        <div class="col-sm-7 ">
            <div class="form-outline mt-3">
                <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
            </div>
        </div>
        <div class="col-3 d-flex">
            <div class="card-body d-flex">
                <i class="bi bi-person-circle fa-2x m-0"></i>
                <div>
                    <span class="ms-3">Hello,{{ name }}</span>
                    <div class="dropdown">
                        <button class="btn btn-default btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            My Account
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">My Profile</a></li>
                            <li><button class="dropdown-item" v-on:click="Logout">Logout</button></li>
                        </ul>
                    </div>
                </div>
                <i class="bi bi-cart-fill fa-2x ms-3"></i>{{ CountData.no }}
                <i class="bi bi-0-circle-fill"></i>
            </div>
        </div>
        <div class="row nav d-flex">
            <div class="col-sm-12  col-md-12 col-lg-12 text-center ">
                <router-link to="/UserDetails"
                    class="link-secondary text-decoration-none ms-3">UserDetails</router-link>
                <router-link to="" class="link-secondary text-decoration-none ms-3">ProductDetails</router-link>
            </div>
        </div>
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
        let res = await axios.get('getAllProduct');
        console.log(res);
        if (res.status == 200) {
            const data = res.data.payload;
            console.log("Product", data)
            this.getData.push(data);
        }
    },
    methods: {
        Logout() {
            this.$router.push({ path: "/Login" })
            localStorage.removeItem("firstName");
            localStorage.removeItem("token");
            this.$store.dispatch('setrouterAuthcheck', false)


        }

    }

}
</script>