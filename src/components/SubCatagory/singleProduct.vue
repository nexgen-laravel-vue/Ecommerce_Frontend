<template>
    <div class="container">
        <div class="topNV col-sm-12 ">
            <Header :cart='CountData.no' />
        </div>

        <div class="row mt-3  justify-content-center">
            <div class="col-md-10 col-lg-12 " v-for="items in productdata[0]" :key="items.id">
                <div class="card">
                    <div class="card-body">
                        <div v-if="msg" class="">
                            <h3 class="alert alert-success text-center">{{ msg }}</h3>
                        </div>
                        <div class=" d-flex justify-content-center">
                            <div class="img">
                                <img :src="items.product_img" class="img-fluid" width="300" height="150" />
                            </div>
                            <div class="details ">
                                <b class="ms-3">ProductId:</b>{{ items.id }}<br />
                                <b class="ms-3">ProductName:</b>{{ items.productName }}<br />
                                <b class="ms-3 ">ProductDescription:</b>{{ items.productDescription }}<br />
                                <b class="ms-3">Price:</b>₹ {{ items.product_price }}
                                <div class="cart ms-3">
                                    <!-- <button
                                        class="btn btn-outline-primary ms-3"
                                        :class="{active:isActive}"
                                        @click="toggle"
                                        >{{isActive ? "on" : 'Add to cart'}}</button> -->
                                        <button class="btn btn-outline-warning" v-on:click="decrement(items.id)"><i
                                                class="fa fa-minus fa-lg"></i></button>
                                        {{items.quantity }}
                        
                                        <button class="btn btn-outline-success" v-on:click="addToCart"><i
                                                class="fa fa-plus fa-lg "></i></button>
                                    
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </div>
        <Footer />
    </div>
</template>
<script>
import axios from 'axios';
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
export default {
    name: 'singleProduct',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            msg: "",
            prevData: localStorage.getItem("cartcount"),
            productdata: [],
            countValue: 0,
            value: null,
            CountData: {
                no: localStorage.getItem("cartcount")
            },
            isActive: false
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.$cookies.set("prodId", this.id)
    },
    async mounted() {
        var response = await axios.get(`getSignleProductById/${this.id}`);

        // console.log("res", response)
        // console.log("dataplayload", response.data.payload)
        // console.log("status", response.status)

        if (response.status == 200) {
            const data = response.data.payload
            this.productdata.push(data)
            console.log(this.productdata[0])
        }
    },
    methods: {
        toggle() {
            this.isActive = this.isActive ? false : true;
        },
        addToCart() {
            //Item count
            this.countvalue = this.prevData ? this.prevData : 0;
            this.countvalue++;
            console.log(this.countvalue, this.prevData)

            //product adding into the cart
            let prevCartData = localStorage.getItem("cartData");
            let cartDetails = prevCartData ? JSON.parse(prevCartData) : [];

            console.log(cartDetails)
            const result = cartDetails.find(({ id }) => id === this.productdata[0][0].id);
            if (result == undefined) {
                var addedItem = { ...this.productdata[0][0], quantity: 1 };
                cartDetails.push(addedItem);
                localStorage.setItem("cartData", JSON.stringify(cartDetails))
                localStorage.setItem("cartcount", this.countvalue)
                this.msg = "Item added to cart ";
            }
            else {
                alert("product already added")
            }

            // window.location.reload();
        }
    }


}
</script>