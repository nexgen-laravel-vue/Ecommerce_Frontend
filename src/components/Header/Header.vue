<template>

    <div class="row nav">
        <div class="col-sm-2 text-center mt-3">
            <router-link to="/" class="link-secondary text-decoration-none">
                <h3>Logo</h3>
            </router-link>
        </div>
        <div class="col-sm-7 ">
            <div class="form-outline mt-3">
                <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
            </div>
        </div>
        <div class="col-3 d-flex">
            <div class="card-body d-flex">
                <div v-if="!auth">

                    <p class="mt-4">
                        <b>
                            <router-link to="/Login" class="link-secondary text-decoration-none">
                                Login
                            </router-link>
                        </b>
                    </p>
                </div>
                <div v-if="auth">

                    <p class="mt-3"><b>
                        <button class="btn btn-outline-warning" v-on:click="Logout">
                            Logout
                    </button></b></p>
                </div>
                <router-link to="/Cart" class="link-secondary text-decoration-none"><i
                        class="bi bi-cart fa-2x ms-3"></i><sup class="badge" id='lblCartCount'>{{ cart
                        }}</sup></router-link>
            </div>



        </div>
    </div>
    <div class="row nav d-flex">
        <div class="col-sm-12  col-md-12 col-lg-12 text-center ">
            <router-link to="" class="link-secondary text-decoration-none ms-3">Electronics&Computers</router-link>
            <router-link to="" class="link-secondary text-decoration-none ms-3">Home,Garden&Pets</router-link>
            <router-link to="" class="link-secondary text-decoration-none ms-3">Sports & Outdoors</router-link>
            <router-link to="" class="link-secondary text-decoration-none ms-3">Entertainments</router-link>

        </div>

    </div>

</template>
<script>
import axios from 'axios';
import store from '../Store/Store';
export default {
    name: 'Header',
    props: ['cart'],
    data() {
        return {
            list: [],
            auth: ""

        }
    },
    async mounted() {

        this.auth = store.state.routerAuthcheck
        await axios.get(`getAllParentCategory`)
            .then((result) => {
                if (result.status == 200 && result.data.payload.length > 0) {
                    const data = result.data.payload;
                    this.list = data;

                }
            })
    },
    methods:{
        Logout(){
            localStorage.removeItem("firstName");
            this.$router.push({ path: "/Login" })
            this.$store.dispatch('setrouterAuthcheck', false)
            localStorage.setItem("check",false)
            
        }
    }



}
</script>
<style>
.nav {
    background-color: white;
}
</style>