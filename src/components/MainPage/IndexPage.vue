<template>
    <div class="container">
        <div class="row">
                <div class="topNV col-sm-12 ">
            
            <Header :cart='CountData.no' />
            </div>
                

                <div class="mt-5 mb-5">
                    <h2 class="text-center">SHOP BY CATEGORY</h2>
                </div>
                <div class="row p-3">
                    <div class=" d-flex justify-content-center">
                        <div class="col-md-6 col-lg-4 col-xl-3" v-for="items in list" :key="items.id">
                            <router-link :to="`/SubCatagory/${items.id}`" class="nav-item nav-link active">
                                <div class="card mb-5 p-5 " style="width:16rem">
                                    <p class="text-center m-0">{{ items.categoryName }}</p>
                                    <div v-on:click="image(items.categoryName)" class="card-body">
                                        <img :src="items.categoryImage" class="img-fluid" width="250" height="100">
                                    </div>

                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="mt-5 mb-5">
                    <h2 class="text-center">SHOP BY BRAND</h2>
                </div>
                <div class="row p-3">
                    <div class="col-md-6 col-lg-4 col-xl-3" v-for="items in Brandlist" :key="items.id">
                        <router-link :to="`/ProductByBrands/${items.id}`" class="nav-item nav-link active">
                            <div class="card mb-5 p-5" style="width:16rem">
                                <p class="text-center m-0">{{ items.brandName }}</p>
                                <div v-on:click="image(items.brandlogo)" class="card-body">
                                    <img :src="items.brandlogo" class="img-fluid" width="250" height="100">
                                </div>

                            </div>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>
        <div class="bg-light p-4">

            <Footer />
        </div>

</template>
<script>
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
import axios from 'axios';
export default {
    name: 'IndexPage',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            list: [],
            Brandlist: [],
            props: ['user'],
            CountData: {
                no: localStorage.getItem("cartcount")
            }
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
