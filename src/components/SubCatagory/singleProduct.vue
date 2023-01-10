<template>
    <div class="container">
        <div class="topNV col-sm-12 ">
            <Header :cart='CountData.no' />
        </div>

        <div class="row mt-3  justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5 " v-for="items in productdata" :key="items.id">
                <div class="card">
                    <div class="card-body p-5 ">
                        <div v-if="msg" class="">
                            <h3 class="alert alert-success text-center">{{ msg }}</h3>
                        </div>
                        <div class=" d-flex justify-content-center">
                            
                               
            
                            <div class="details ">
                                <div>

                                    <img :src="items.product_img" class="img-fluid ms-3 mb-5" width="300" height="150" />
                                </div>
                                <div>

                                    <b class="ms-3 text-nowrap">ProductId:</b>{{ items.id }}<br/>
                                    <b class="ms-3 text-nowrap">ProductName:</b>{{ items.productName }}<br />
                                    <b class="ms-3 text-nowrap ">ProductDescription:</b>{{ items.productDescription }}<br />
                                    <b class="ms-3 text-nowrap">Price:</b>₹ {{ items.product_price }}
                                    <div class="cart ms-3 d-flex ">
                                        <!-- <button
                                            class="btn btn-outline-primary ms-3"
                                            :class="{active:isActive}"
                                            @click="toggle"
                                            >{{isActive ? "on" : 'Add to cart'}}</button> -->
                                            <button  class="btn btn-outline-primary text-nowrap"  v-on:click="addToCart"> Add to Cart</button>
                            
                                        <button  class="btn btn-outline-warning  ms-2" v-on:click="decrement(items.id)"><i
                                                class="fa fa-minus fa-lg"></i></button>
                                        <button  class="btn btn-outline-success  ms-2" v-on:click="increment(items.id)"><i
                                                class="fa fa-plus fa-lg "></i></button>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            

            <div class="">
                <div class="d-flex justify-content-center">
                    <router-link to="/"><button class="btn btn-outline-warning text-nowrap">
                            Continue shopping
                        </button></router-link>

                    <router-link v-if="moveToCart()" to="/Cart"><button class="btn btn-outline-primary">GoToCart
                            --></button>
                    </router-link>


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
import store from '../Store/Store';
export default {
    name: 'singleProduct',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            msg: "",
            quantity: "",
            no:"",
            hello:null,
            cartindex:"",
            prevData: localStorage.getItem("cartcount"),
            productdata: [],
            Cartdata: [],
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
        this.no=this.quantity
        console.log("indexvalue",store.state.cartindex)
        var response = await axios.get(`getSignleProductById/${this.id}`);
        if (response.status == 200) {
            const data = response.data.payload
            var addedItem = { ...data[0], quantity: 1 };
            console.log(addedItem)
            this.productdata.push(addedItem)
            // var addedItem = { ...this.productdata[0][0], quantity: 1 };
            console.log(this.productdata)
        }

        let LocalCartData = localStorage.getItem("cartData");
        if (LocalCartData == "" || LocalCartData == null) {
            //this.msg = "no Item is added"
        }

        this.Cartdata.push(JSON.parse(LocalCartData))
        console.log(this.Cartdata)


        window.addEventListener('foo-key-localstorage-changed', (event) => {
                this.hello = event.detail.storage;
            });
            console.log("helo",this.hello)

    },
    methods: {
        toggle() {
            this.isActive = this.isActive ? false : true;
        },
        moveToCart() {
            // console.log(this.CountData.no);
            if (this.CountData.no > 0) {
                return true;
            }
            else {
                return false;

            }
        },
        addToCart(items) {
            //console.log("indexvalue",store.state.cartindex)
            //Item count
            this.countvalue = this.prevData ? this.prevData : 0;
            this.countvalue++;
            // console.log(this.countvalue, this.prevData)
            //product adding into the cart
            let prevCartData = localStorage.getItem("cartData");
            let cartDetails = prevCartData ? JSON.parse(prevCartData) : [];
            const result = cartDetails.find(({ id }) => id === this.productdata[0].id);
            if (result == undefined) {
                var addedItem = { ...this.productdata[0], quantity: 1 };
                cartDetails.push(addedItem);
                localStorage.setItem("cartData", JSON.stringify(cartDetails))
                localStorage.setItem("cartcount", this.countvalue)
                this.msg = "Item added to cart ";
                
                window.dispatchEvent(new CustomEvent('foo-key-localstorage-changed', {
                        detail: {
                            storage: localStorage.getItem('cartcount')
                        }
                        }));

            }
            else {
                this.msg = "product already added";
            }
            location.reload()
        },
        increment(items){
            let cartArray=[]
            this.Cartdata.map((cart,index)=>{
                cart.map((data, index)=>{
                if(data.id==items)
                {
                    console.log(data.id);
                    if(data.quantity< data.product_stock)
                    {
                        data.quantity=data.quantity+1
                        this.CountData.no=parseInt(this.CountData.no)+1
                        this.quantity=data.quantity
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

            })

        },
        decrement(items){
            let cartArray=[];
            this.Cartdata.map((cart,index)=>{
                cart.map((data, index)=>{
                    if(data.id==items)
                {
                    if(data.quantity>0)
                    {
                   data.quantity=data.quantity-1
                   this.CountData.no=parseInt(this.CountData.no)-1
                   this.quantity=data.quantity
                   cartArray.push(data)
                   localStorage.setItem("cartData", JSON.stringify(cartArray))
                   localStorage.setItem("cartcount",this.CountData.no)
                    }
                    else if(data.quantity==0)
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
            })


        }
    }


}
</script>