<template>
    <div class="topNV col-sm-12 ">

        <Header :cart='CountData.no' />
    </div>
    <div class="container">
    <div class="mt-2">
                <h2 class="text-center">SHOP BY PRODUCT</h2>
            </div>
            <div class="row p-3">
              <div class="col-md-6 col-lg-4 col-xl-3" v-for="items in productdata" :key="items.id">
                <router-link :to="`/ProductByChildCategory/${items.id}`"  class="nav-item nav-link active">
                <div class="card mb-5 "   style="width:16rem">
                   
                    <div  class="card-body p-5">
                        <img :src="items.categoryImage" class="img-fluid" width="250" height="100">
                    </div>
                   <p class="text-center m-0">{{ items.categoryName}}</p>
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
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
import { getChildCategoryById } from '../service/api/ApiServices';
export default{
    name:'ProductCatagory',
    components:{
        Header,
        Footer
    },
    data(){
        return{
            productdata:[],
            CountData: {
                no:localStorage.getItem("cartcount")
                }
        }
    },
    created()
    {
        this.id=this.$route.params.id;
        console.log(this.id);
    },
    async mounted(){

        getChildCategoryById(this.id).then((result)=>{
            if(result.status==200 && result.data.length>0)
            {
                const data=result.data;
                this.productdata=data;
                console.log(this.productdata);

            }

        })

        // await axios.get(`getChildCategoryById/${this.id}`).
        // then((result)=>{
        //     if(result.status==200 && result.data.length>0)
        //     {
        //         const data=result.data;
        //         this.productdata=data;
        //         console.log(this.productdata);

        //     }
            
        // })
    }

}
</script>