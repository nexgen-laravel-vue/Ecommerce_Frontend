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
                    <div class="card-body" v-for="items in cartData[0]">
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
                                        <!-- <button class="btn btn-outline-primary ms-3" v-on:click="Remove(items.id)">Remove
                                            Product</button> -->
                                    </div>
                                    <div class="Qunatity ">
                                        <div class="ms-5">
                                            
                                            <button :disabled="items?.quantity === 0" class="btn btn-outline-warning" v-on:click="decrement (items.id)"  >
                                                <i   class="fa fa-minus fa-lg"></i></button>
                                            {{ items.quantity }}
                                            <button :disabled="items?.quantity===items.product_stock" class="btn btn-outline-success" v-on:click="increment(items.id)"><i
                                                    class="fa fa-plus fa-lg "></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buy text-center">
                        <button v-if="!msg"  class="btn btn-outline-success">Buy</button>
                        <router-link to="/" class="btn btn-outline-warning ms-3">continue shopping</router-link>
                    </div>
                </div>
            </div>

        </div>
        <Footer />
    </div>
</template>
<script>
import axios from 'axios';
import store from "../Store/Store";
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
            storeData:[],
            CountData: {
                no: localStorage.getItem("cartcount")
            },
            Quantity: 0,

        }
    },
    async mounted() {
        let auth=store.state.routerAuthcheck
        console.log("a",auth)
        let LocalCartData = localStorage.getItem("cartData");
        if (LocalCartData == "" || LocalCartData == null) {
            this.msg = "no Item is added"
        }

        this.cartData.push(JSON.parse(LocalCartData))
        //console.log(this.cartData);

        if(this.cartData==null || this.cartData=="")
        {
            alert("card details are empty");
        }
        else if(auth)
        {
            this.cartData.map((prodData,index)=>{
                prodData.map((data,index)=>{
                    console.log("data",data)
                    let obj = {
                        productId : data.id,
                        quantity:data.quantity
                }
                this.storeData.push(obj)
                })  
            })
            console.log("storedata",this.storeData)
        }

        const response=axios.post('addtoCart',this.storeData)
        console.log(response)




    },
    methods: {
    
        // Remove(items) {
        //     this.cartData?.map((data, index)=>{
        //       if(data.id === items){
        //         this.cartData.splice(data.id,1)
        //         this.CountData.no--
        //       }
        //     })
        //     console.log(this.cartData[0]);
        //     localStorage.setItem("cartData",JSON.stringify(this.cartData))
        //     localStorage.setItem("cartcount",this.CountData.no)
        // },
        increment(items) {
            let cartArray=[]
            this.cartData[0]?.map((data, index)=>{
                if(data.id==items)
                {
                    console.log(data.id);
                    if(data.quantity< data.product_stock)
                    {
                        data.quantity=data.quantity+1
                        this.CountData.no=parseInt(this.CountData.no)+1

                        cartArray.push(data)
                        localStorage.setItem("cartData", JSON.stringify(cartArray))
                        localStorage.setItem("cartcount",this.CountData.no)
                    }
                    else if(data.quantity==data.product_stock)
                    {

                        cartArray.push(data)
                        localStorage.setItem("cartData", JSON.stringify(cartArray))
                    }

                }
                else
                {
                    cartArray.push(data)
                        localStorage.setItem("cartData", JSON.stringify(cartArray))
                }
                
            })
        },
        decrement(items){
            let cartArray=[]
            this.cartData[0]?.map((data, index)=>
            {
                if(data.id==items)
                {
                    if(data.quantity>0)
                    {
                   data.quantity=data.quantity-1
                   this.CountData.no=parseInt(this.CountData.no)-1
                   cartArray.push(data)
                   localStorage.setItem("cartData", JSON.stringify(cartArray))
                   localStorage.setItem("cartcount",this.CountData.no)
                    }
                    else if(data.quantity==0 ) 
                    {
                         // cartArray.splice(index,1)
                        // console.log(cartArray)
                        cartArray.push(data)
                        localStorage.setItem("cartData", JSON.stringify(cartArray))

                    
                    }  
                  
                }
                else
                {
                   cartArray.push(data)
                   localStorage.setItem("cartData", JSON.stringify(cartArray))
                }
                
            })
        }
    }
}
</script>