<template>
    <div class="topNV col-sm-12 ">

        <Header :cart='CountData.no' />
    </div>
    <div class="container">

        <div class="mt-2">
            <h2 class="text-center">SHOP BY SUBCATEGORY</h2>
        </div>
        <div class="row p-3">
            <div class="col-md-6 col-lg-4 col-xl-3" v-for="items in list" :key="items.id">
                <router-link :to="`/ProductCatagory/${items.id}`" class="nav-item nav-link active">
                    <div class="card mb-5 p-5" style="width:16rem">

                        <div class="card-body">
                            <img :src="items.categoryImage" class="img-fluid" width="250" height="100">
                        </div>
                        <p class="text-center m-0">{{ items.categoryName }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <div class="bg-light p-4">
        <Footer />
    </div>
</template>
<script>
import axios from 'axios';
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
export default {
    name: 'SubCatagory',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            list: [],
            CountData: {
                no: localStorage.getItem("cartcount")
            }
        }

    },
    created() {
        this.id = this.$route.params.id;
        console.log(this.id);
    },
    async mounted() {
        await axios.get(`getChildCategoryById/${this.id}`)
            .then((result) => {
                //console.log(result.data);
                if (result.status == 200 && result.data.length > 0) {
                    const data = result.data;
                    this.list = data;
                    console.log(this.list);

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