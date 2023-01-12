<template>

    <div class="topNV col-sm-12 ">
        <Header :cart='CountData.no' />
    </div>
    <div class="container">
        <div class="row">

            <div class="col-md-12 col-lg-12 col-xl-12">
                <div class=" d-flex justify-content-center">
                    <div class="card  m-5 font12">

                        <div class="card-header">
                            Login
                        </div>
                        <div class=" card-body">
                            <div class=" col-md-10 mb-2  ">
                                <div class="form-outline">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control form-control-sm" v-model="login_data.email" />
                                    <div class="error text-danger"></div>
                                    <p></p>
                                </div>
                            </div>
                            <div class="col-md-10 mb-2 ">
                                <div class="form-outline">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-control form-control-sm" v-model="login_data.password" />
                                </div>
                            </div>
                            <div class="d-flex pt-2">
                                <button type="button" class="btn btn-success btn-sm " @click="login">Login</button>
                                <button type="reset" class="btn btn-secondary btn-sm ms-2" @click="clear">Reset</button>

                            </div>
                            <div v-if="error" class="alert alert-danger">
                                {{ error }}

                            </div>
                            <div class="checkbox mt-2">
                                <input type="checkbox" />
                                <label class="ms-2">keep me signed-in</label>
                            </div>
                            <div class="forgot fs-10 mt-2">
                                <router-link to="/SendingMail" class="link-danger">Forgot Password</router-link>
                                <router-link to="/Register" class="link-danger ms-3">Sign Up</router-link>
                            </div>
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
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
import { login } from '../service/api/ApiServices';
export default {
    name: "Login",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            login_data:{
                email: "",
                password: "",
            },
            
            error: "",
            errors: [],
            CountData: {
                no: localStorage.getItem("cartcount")
            }
        }
    },
    methods: {
        login() {
            if (this.login_data.email == "" || this.login_data.password == "") {
                this.error = "fields must be filled"
            }
            else {
                    console.log("pass",this.password)
                login(this.login_data).then((res) => {
                     
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
                        let number = getData.phoneno
                        let Email = getData.email

                        console.log("name", FirstName)
                        console.log(getData)
                        if (token) {
                            if (Role == "Admin" || Role == "SuperAdmin") {
                                localStorage.setItem("token", token)
                                localStorage.setItem("Role", Role)
                                this.$store.dispatch('setrouterAuthcheck', true)
                                localStorage.setItem("firstName", FirstName)
                                localStorage.setItem('number', number)
                                localStorage.setItem('Email', Email)
                                this.$router.push({ path: '/Admin' })
                                // window.location="/Admin"
                            }
                            if (Role == "User") {
                                // this.$session.setItem("username", "user123");
                                // console.log(this.$session("username"));
                                this.$store.dispatch('setrouterAuthcheck', true)
                                localStorage.setItem("token", token)
                                localStorage.setItem("Role", Role)
                                localStorage.setItem("firstName", FirstName)
                                localStorage.setItem('number', number)
                                localStorage.setItem('Email', Email)
                                // check the last action and redirect user to that page
                                // this can be 2 types
                                // - 1 pervious url - example product page or contact page or any other page
                                // - 2 click action on icon ( example car icon, cart page )
                                this.$router.push({ path: '/customer' })
                                // window.location="/customer"

                            }
                        }
                    }
                })
            }

        },
        clear() {
            this.login_data.email="",
            this.login_data.password=""
        },
    }
}
</script>

