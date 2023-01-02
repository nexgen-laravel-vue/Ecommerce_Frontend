<template>
    <div class="topNV col-sm-12 ">
        <Header :cart='CountData.no' />
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-9">
                <div class="card ">
                    <div class="card-header justify-content-center">
                        <h3 class="text-center">Cart Product</h3>
                    </div>
                    <div v-if="msg" class="nodata">
                        <h1 class="text-center"> {{ msg }}</h1>
                    </div>
                    <div class="card-body" v-for="items in cartData[0]" :key="items.id">
                        <div class=" d-flex justify-content-center">
                            <div class="img">
                                <img :src="items.product_img" class="img-fluid" width="150" height="150" />
                            </div>
                            <div class="details ">
                                <b class="ms-3">ProductId:</b>{{ items.id }}<br />
                                <b class="ms-3">ProductName:</b>{{ items.productName }}<br />
                                <b class="ms-3 ">ProductDescription:</b>{{ items.productDescription }}<br />
                                <b class="ms-3">Price:</b>₹ {{ items.product_price }}
                                <div class="d-flex ">
                                    <div class="cart">
                                        <!-- <button
                                        class="btn btn-outline-primary ms-3"
                                        :class="{active:isActive}"
                                        @click="toggle"
                                        >{{isActive ? "on" : 'Add to cart'}}</button> -->

                                        <button class="btn btn-outline-primary ms-2">Buy</button>
                                        <button class="btn btn-outline-primary ms-3" v-on:click="Remove(items.id)">Remove
                                            Product</button>
                                    </div>
                                    <div class="Qunatity ">
                                        <div class="ms-5">
                                            <button class="btn btn-outline-warning" v-on:click="decrement (items.id)"><i
                                                    class="fa fa-minus fa-lg"></i></button>
                                            {{ items.quantity }}
                                            <button class="btn btn-outline-success" v-on:click="increment(items.id)"><i
                                                    class="fa fa-plus fa-lg "></i></button>
                                        </div>
                                    </div>
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
    name: "Cart",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            // id: this.$cookies.get("prodId"),
            msg: "",
            productdata: [],
            cartData: [],
            CountData: {
                no: localStorage.getItem("cartcount")
            },
            Quantity: 0,

        }
    },
    async mounted() {
        // var response = await axios.get(`getSignleProductById/${this.id}`);
        // console.log("data",response.data)

        // if (response.status == 200) {
        //     const data = response.data.payload
        //     this.productdata.push(data)
        // }
        let LocalCartData = localStorage.getItem("cartData");
        if (LocalCartData == "" || LocalCartData == null) {
            this.msg = "no Item is added"
        }

        this.cartData.push(JSON.parse(LocalCartData))
            console.log(this.cartData)
    },
    methods: {
        shopping() {
            this.$router.push({ path: "/" })
        },
        Remove(items) {
            this.cartData[0]?.map((data, index)=>{
              if(data.id === items){
                this.cartData[0].splice(index,1)
                this.CountData.no--
              }
            })
            console.log(this.cartData[0]);
            localStorage.setItem("cartData",JSON.stringify(this.cartData[0]))
            localStorage.setItem("cartcount",this.CountData.no)
            // localStorage.removeItem("cartData");
            // window.location.reload();
            // localStorage.removeItem("cartcount") 
        },
        increment(items) {
            this.cartData[0]?.map((data, index)=>{
                console.log(data)
                console.log(items)
                console.log(items)
                if(data.id==items)
                {
                   data.quantity=data.quantity+1
                   console.log(data)
                }
            })
            
        },
        decrement() {
            this.Quantity--
        }
    }
}
</script>