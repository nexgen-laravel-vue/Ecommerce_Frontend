<template>
    <div class="topNV col-sm-12 ">
        <Header :cart='CountData.no' />
    </div>
    <div class="container">
        <div class="row justify-content-center ms-5">
            <div class="col-md-6 ">
                <div class="heading justify-content-center mt-3">
                    <h1>Login Form</h1>
                </div>
                <div v-if="error" class="alert alert-danger">
                    {{ error }}

                </div>
                <div class="col-md-6 mb-2 ">
                    <div class="form-outline">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control form-control-lg" v-model="email" />
                        <div class="error text-danger"></div>
                        <p></p>
                    </div>
                </div>
                <div class="col-md-6 mb-2">
                    <div class="form-outline">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control form-control-lg" v-model="password" />
                        <div class="error text-danger"></div>
                    </div>
                </div>
                <div class="d-flex pt-2">
                    <button type="button" class="btn btn-success btn-lg " @click="login">Login</button>
                    <button type="reset" class="btn btn-secondary btn-lg ms-2" @click="clear">clear</button>

                </div>
                <p class="small fw-bold  pt-1 mb-0">Don't have an account? <router-link to="/Register"
                        class="link-danger">SignUp</router-link></p>
            </div>
        </div>
    </div>
    <Footer />
</template>
<script>
import axios from 'axios';
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
export default {
    name: "Login",
    components: {
        Header,
        Footer
    },
    data() {
        return {

            email: "",
            password: "",
            error: "",
            errors: [],
            CountData: {
                no: localStorage.getItem("cartcount")
            }
        }
    },
    methods: {
        login() {
            if (this.email == "" || this.password == "") {
                this.error = "fields must be filled"
            }
            else {
                axios.post('login', {
                    email: this.email,
                    password: this.password,

                })
                    .then((res) => {
                        console.log(res.data)
                        console.log(res.data.status)
                        if (res.data.status == 500) {
                            this.error = "Invalid Email and Password"
                        }
                        else if (res.data.status == 200) {
                            const getData = res.data.payload;
                            let token = getData.token
                            console.log(token)
                            let Role = getData.role
                            console.log(Role)
                            let FirstName = getData.firstName

                            console.log("name", FirstName)
                            console.log(getData)
                            if (token) {
                                if (Role == "Admin" || Role == "SuperAdmin") {
                                    localStorage.setItem("token", token)
                                    this.$store.dispatch('setrouterAuthcheck', true)
                                    localStorage.setItem("firstName", FirstName)
                                    this.$router.push({ path: '/Admin' })
                                }
                                if (Role == "User") {
                                    this.$store.dispatch('setrouterAuthcheck', true)
                                    localStorage.setItem("token", token)
                                    localStorage.setItem("firstName", FirstName)
                                    // check the last action and redirect user to that page
                                    // this can be 2 types
                                    // - 1 pervious url - example product page or contact page or any other page
                                    // - 2 click action on icon ( example car icon, cart page )
                                    this.$router.push({ path: '/' })
                                }
                            }
                        }
                    })
            }

        },
        clear() {

            this.email = "",
                this.password = ""

        },
    }
}
</script>

