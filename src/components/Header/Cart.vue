<template>
    <div class="topNV col-sm-12 ">
        <Header :cart='CountData.no' />
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4 col-xl-9">
                <div class="card ">
                    <div class="card-header justify-content-center">
                        <h3 class="text-center"> My Cart</h3>
                    </div>
                    <div class="card-body" v-for="items in cartData[0]">
                        <div class=" d-flex justify-content-center">
                            <div class="img">
                                <router-link :to="`/singleProduct/${items.id}`"><img :src="items.product_img"
                                        class="img-fluid" width="150" height="150" /></router-link>
                            </div>
                            <div class="details ">
                                <b class="ms-3">ProductId:</b>{{ items.id }}<br />
                                <b class="ms-3">ProductName:</b>{{ items.productName }}<br />
                                <b class="ms-3 ">ProductDescription:</b>{{ items.productDescription }}<br />
                                <b v-if="!msg" class="ms-3">Actual Price:₹ {{ items.product_price }}</b>
                                <strike v-if="msg" ><b class="ms-3">Actual Price:</b>₹ {{ items.product_price }}</strike>
                                <b v-if="msg" class="ms-3">₹ {{ items.product_price-(items.product_price*pcDiscountfactor) }}</b>
                                <div class="d-flex ">
                                    <div class="Qunatity ">
                                        <div class="ms-5">

                                            <button :disabled="items?.quantity === 0" class="btn btn-outline-warning"
                                                v-on:click="decrement(items.id)">
                                                <i class="fa fa-minus fa-lg"></i></button>
                                            {{ items.quantity }}
                                            <button :disabled="items?.quantity === items.product_stock"
                                                class="btn btn-outline-success" v-on:click="increment(items.id)"><i
                                                    class="fa fa-plus fa-lg "></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-center">
                        <div class="pricecard text-center">

                            <div class="col-md-6 col-lg-4 col-xl-3 mb-2 mt-5 ms-3">
                                <div class="form-outline ">
                                    <div class="d-flex">
                                        <label class="form-label text-nowrap">Total Price:</label>
                                        <label class="form-label"><b>₹{{ TotalAmount }}</b></label>
                                    </div>
                                </div>

                                <div class="form-outline d-flex">
                                    <label class="form-label text-nowrap mt-2">Promo Code:</label>
                                    <input type="text" class="form-control " style="width: 100px;"
                                        v-model="promocode" />
                                </div>
                                <div class="mt-3">
                                    <button type="button" class="btn btn-outline-success text-center  text-nowrap ms-4"
                                        v-on:click="procode">
                                        Apply promo code
                                    </button>
                                </div>
                                <div class="form-outline d-flex mt-2">
                                    <label class="form-label text-nowrap">Discount:</label>
                                    <label class="form-label "><b>₹{{ discount }}</b></label>
                                    <div class="error text-danger"></div>
                                </div>
                                <div class="form-outline  mt-2 buyingprice">
                                    <label class="form-label text-nowrap  " >Buying Price: </label>
                                    <label class="form-label "><b>₹{{ TotalAmount-discount }}</b></label>
                                    <div class="error text-danger"></div>
                                </div>

                                <div class="mt-3">
                                    <button v-if="!close" type="button" class="btn btn-outline-success text-center text-nowrap" v-on:click="processed">processed with payment</button>
                                    <router-link to="/" class="btn btn-outline-warning ms-3 mt-3 text-nowrap">continue shopping</router-link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div v-if="close" class="form-label text-nowrap">
                        <div class="form-outline d-flex justify-content-center">
                            <label class="form-label text-nowrap mt-2">Payment referral code: </label>
                            <input type="text" class="form-control " style="width: 100px;" v-model="referralCode" />
                        </div>
                        
                        <div class="d-flex justify-content-center">

                            <button class="btn btn-outline-success "  v-on:click="pay">Pay</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>


        <div class="bg-light p-4">
             <Footer />
        </div>
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
            close:"",
            promocode: "",
            pcDiscountfactor:0.1,
            referralCode:"",
            productdata: [],
            TotalAmount: 0,
            AddDiscount: 0,
            discount: 0,
            cartData: [],
            storeData: [],
            CountData: {
                no: localStorage.getItem("cartcount")
            },
            Quantity: 0,

        }
    },
    async mounted() {
        let token = localStorage.getItem('tokken')
        let LocalCartData = localStorage.getItem("cartData");
        if (LocalCartData == "" || LocalCartData == null) {
            this.msg = "no Item is added"
        }

        this.cartData.push(JSON.parse(LocalCartData))
        //console.log(this.cartData);

        if (this.cartData == null || this.cartData == "") {
            alert("card details are empty");
        }
        else  {
            var TotalPrice = 0;
            this.cartData.map((prodData, index) => {
                prodData.map((data, index) => {
                    console.log("data", data)
                    let Amount = data.quantity * data.product_price
                TotalPrice = TotalPrice + Amount;
                console.log("Amount", Amount)
                    let obj = {
                        productId: data.id,
                        quantity: data.quantity,
                        Actual_price:data.product_price,
                        selling_price:data.product_price-this.discount,
                        promocode:"pc123"

                    }
                    this.storeData.push(obj)
                })
            })
            console.log("storedata", this.storeData)
            
        }
        const response = axios.post('addtoCart', this.storeData)
        console.log(response)


        var TotalPrice = 0;
        this.cartData.map((cartItem, index) => {
            cartItem.map((items, index) => {

                let Amount = items.quantity * items.product_price
                TotalPrice = TotalPrice + Amount;
                console.log("Amount", Amount)

            })

        })
        this.TotalAmount = TotalPrice
        console.log("total", TotalPrice)
    },
    methods: {
        procode() {
            if (this.promocode == "pc123") {
                this.discount = (this.TotalAmount) * this.pcDiscountfactor
                // this.TotalAmount=this.TotalAmount-this.discount
                this.msg="12"
                // this.AddDiscount = this.TotalAmount - this.discount
            }
        },
        processed(){
            this.close="fake"
        },
        pay(){
            console.log(this.referralCode)
           // console.log(this.TotalAmount-this.discount)

            let TotalPrice=this.TotalAmount-this.discount
            console.log(TotalPrice);

         axios.post('shopping',{
                payment_amount:TotalPrice,
                payment_ref:this.referralCode}).then((rest)=>{
                    alert("payment successful")
                })
                

        },
        increment(items) {
            let cartArray = []
            this.cartData[0]?.map((data, index) => {
                if (data.id == items) {
                    console.log(data.id);
                    if (data.quantity < data.product_stock) {
                        data.quantity = data.quantity + 1
                        this.CountData.no = parseInt(this.CountData.no) + 1

                        cartArray.push(data)
                        console.log("q", data.quantity)
                        console.log("id", data.id)
                        let obj = {
                            productId: data.id,
                            quantity: data.quantity
                        }
                        this.storeData.push(obj)
                        const response = axios.post('addtoCart', this.storeData)
                        console.log(response)



                        localStorage.setItem("cartData", JSON.stringify(cartArray))
                        localStorage.setItem("cartcount", this.CountData.no)
                    }
                    else if (data.quantity == data.product_stock) {

                        cartArray.push(data)
                        localStorage.setItem("cartData", JSON.stringify(cartArray))
                    }

                }
                else {
                    cartArray.push(data)
                    localStorage.setItem("cartData", JSON.stringify(cartArray))
                }

            })
            //location.reload()
        },
        decrement(items) {
            let cartArray = []
            this.cartData[0]?.map((data, index) => {
                if (data.id == items) {
                    if (data.quantity > 0) {
                        data.quantity = data.quantity - 1
                        this.CountData.no = parseInt(this.CountData.no) - 1
                        cartArray.push(data)
                        localStorage.setItem("cartData", JSON.stringify(cartArray))
                        localStorage.setItem("cartcount", this.CountData.no)
                    }
                    else if (data.quantity == 0) {
                        // cartArray.splice(index,1)
                        // console.log(cartArray)
                        cartArray.push(data)
                        localStorage.setItem("cartData", JSON.stringify(cartArray))


                    }

                }
                else {
                    cartArray.push(data)
                    localStorage.setItem("cartData", JSON.stringify(cartArray))
                }

            })
            //location.reload()
        }
    }
}
</script>