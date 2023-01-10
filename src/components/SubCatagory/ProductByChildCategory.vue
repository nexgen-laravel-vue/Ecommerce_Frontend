<template>
    <div class="container">
        <div class="topNV col-sm-12 ">

            <Header :cart='CountData.no'/>
        </div>
        <div class="mt-2">
            <h2 class="text-center">SHOP BY PRODUCT</h2>
        </div>
        <div class="row p-3">
            <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in productdata[0]" :key="item.id">

                <div class=" d-flex justify-content-center">
                <div class="card mb-5 p-5 " style="width:16rem">

                    <div class="card-body">
                        <router-link :to="`/singleProduct/${item.id}`" class="nav-item nav-link active">
                            <img :src="item.product_img" class="img-fluid" width="250" height="100">
                        </router-link>
                    </div>
                    <p class="text-center m-0">{{ item.productName }}</p>
                </div>
                </div>
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
    name: 'ProductByChildCategory',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            msg:"",
            productdata: [],
            count: {},
            props:['user'],
            value:null,
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
        var response = await axios.get(`getAllProductByChildCategoryId/${this.id}`);
        console.log("res", response)
        console.log("dataplayload", response.data.payload)
        console.log("status", response.status)

        if (response.status == 200) {
            const data = response.data.payload
            this.productdata.push(data)
        }
        if(response.data.payload=="")
            {
                alert(" no items")
            }
        
    },
    methods: {
        AddToCart() {
           this.value= this.count++
            this.$cookies.set("count",  this.value)
            localStorage.setItem("count",this.value)
           
        }
    }

}
</script>