<template>
    <div class="topNV col-sm-12 ">
        <Header />
    </div>
    <div class="container">
        <div class="row">
        <div class="col-md-12 col-lg-6 col-xl-12">
            <div class=" d-flex justify-content-center">
                <div class="card  m-5 font12">
                    <div class="card-header">
                        Register
                    </div>
                    <div class=" card-body">
                        <div class=" col-md-10   mb-2  ">
                            <div class="form-outline">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-control form-control-sm" v-model="postData.firstName" required /> 
                            </div>
                        </div>
                        <div class=" col-md-10 mb-2  ">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example1n">Last Name</label>
                                <input type="text" class="form-control form-control-sm" v-model="postData.lastName" required />
                            </div>
                        </div>
                        <div class=" col-md-10 mb-2  ">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example97">Email ID</label>
                                <input type="text" class="form-control form-control-sm" v-model="postData.email" required />
                            </div>
                        </div>
                        <div class=" col-md-10 mb-2  ">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example8">Phone Number</label>
                                <input type="number" class="form-control form-control-sm" v-model="postData.phoneno" required />
                            </div>
                        </div>
                        <div class=" col-md-10 mb-2  ">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example90">Password</label>
                                <input type="password" class="form-control form-control-sm" v-model="postData.password" required />
                            </div>
                        </div>
                        <div class=" col-md-10 mb-2  ">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example90">Confirm Password</label>
                                <input type="text" class="form-control form-control-sm" v-model="postData.C_password" required />
                            </div>
                        </div>
                        <div class="d-flex pt-3">
                        <button type="button" class="btn btn-success btn-sm " @click="submit">Submit</button>
                        <button type="reset" class="btn btn-secondary btn-sm ms-2" @click="clear">clear</button>
                    </div>
                    <p class="small fw-bold  pt-1 mb-0">Do have an account? <router-link to="/Login"
                            class="link-danger">Sign-in</router-link></p>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>  
        <div class="bg-light p-4">
        <Footer />
        </div>
</template>
<script >
import axios from 'axios';
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
export default {
    name: "Register",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            postData: {
                firstName: "",
                lastName: "",
                email: "",
                phoneno: "",
                password: "",
                C_password: ""
            },
            msg: "",
            error: ""
        }
    },
    methods: {

        submit() {
            if (this.postData.firstName == "" || this.postData.lastName == "" || this.postData.email == "" || this.postData.phoneno == "" ||
                this.postData.password == "" || this.postData.C_password == "") {
                this.error = "fields must be filled"
            }
            else if (this.postData.password != this.postData.C_password) {
                this.error = "Password and confirmPassword must be Match"
            }
            else {
                console.log(this.postData)
                axios.post("register", this.postData)
                    .then((res) => {
                        console.log(res);
                        this.msg = "Registration was done";
                        this.postData.firstName = "",
                            this.postData.lastName = "",
                            this.postData.email = "",
                            this.postData.phoneno = "",
                            this.postData.password = "",
                            this.postData.C_password = ""
                    })


            }

        },
        clear() {
            this.postData.firstName = "",
                this.postData.lastName = "",
                this.postData.email = "",
                this.postData.phoneno = "",
                this.postData.password = "",
                this.postData.C_password = ""

        }

    }
}
</script>