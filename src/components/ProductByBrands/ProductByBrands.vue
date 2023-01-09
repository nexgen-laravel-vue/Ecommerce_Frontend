<template>
    <div class="topNV col-sm-12 ">

        <Header CountData.no />
    </div>
    <div class="container ">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-3 col-sm-12 mt-5" v-for="items in productdata" :key="items.id">
                
                    <div class="card mb-5 " style="width:16rem">

                        <div class="card-body p-5">
                            <router-link :to="`/singleProduct/${items.id}`" class="nav-item nav-link active">
                            <img :src="items.product_img" class="img-fluid" width="250" height="100">
                            </router-link>
                        </div>
                        <p class="text-center m-0">{{ items.productName }}</p>
                    </div>
                
            </div>

        </div>
        <div class="bg-light p-4">
        <Footer />
        </div>
    </div>
</template>
<script>
import Header from '../Header/Header.vue';
import axios from 'axios';
import Footer from '../Footer/Footer.vue';
export default {
    name: "ProductByBrands",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            productdata: [],
            CountData: {
                no: localStorage.getItem("cartcount"),
            }
        }
    },
    created() {
        this.id = this.$route.params.id;
        console.log(this.id);
    },
    async mounted() {
        await axios.get(`getAllPRoductByBrandId/${this.id}`)
            .then((result) => {
                //console.log(result.data);
                if (result.status == 200 && result.data.length > 0) {
                    const data = result.data;
                    this.productdata = data;
                    console.log(this.productdata.id);

                }
            })
    },
}
</script>
<style>
.topNV {
    top: 0% !important;
    z-index: 99 !important;
    position: sticky;
}
</style>