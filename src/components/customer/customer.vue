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
                <div class="font10">
                    <span class="ms-3 font10">Hello,{{ name }}</span>
                    <div class="dropdown ms-3">
                        <button class="btn btn-default btn-sm dropdown-toggle font10" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            My Account
                        </button>
                        <ul class="dropdown-menu font10 " aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">My Profile</a></li>
                            <li><a class="dropdown-item" href="#">My orders</a></li>
                            <li><a class="dropdown-item" href="" @click="Logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
                <div class="mcart">

                <router-link to="/Cart" class="link-secondary text-decoration-none"><i
                        class="bi bi-cart"></i><sup class="badge" id='lblCartCount'>{{ CountData.no
                        }}</sup></router-link>
                </div>
            </div>
        </div>
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
        <div class="mt-2">
            <h2 class="text-center">SHOP BY BRAND</h2>
        </div>
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
    <div>
        <div class="bg-light p-4">
        <Footer />
        </div>
    </div>
</template>
<script >
import axios from 'axios'
import Footer from '../Footer/Footer.vue';
export default {
    name: "customer",
    components: {
        Footer
    },
    data() {
        return {
            
            name: localStorage.getItem("firstName"),
            CountData: {
                no: localStorage.getItem("cartcount")
            },
            list: [],
            Brandlist: []
        }
    },
    methods: {
        Logout() {
            localStorage.removeItem("firstName");
            this.$router.push({ path: "/Login" })
            localStorage.removeItem('token')
        }
    },
    async mounted() {
        await axios.get(`getAllParentCategory`)
            .then((result) => {
                if (result.status == 200 && result.data.payload.length > 0) {
                    const data = result.data.payload;
                    this.list = data;
                    console.log(this.list);

                }
            })

        await axios.get(`getAllBrand`)
            .then((result) => {
                if (result.status == 200 && result.data.payload.length > 0) {
                    const data = result.data.payload;
                    this.Brandlist = data;
                    console.log(this.Brandlist);

                }
            })



    },

}
</script>