<template>
    <div class="topNV col-sm-12 ">
        <Header />
    </div>
    <div class="container">
        <div class="row">
            <div class="justify-content-center">
                <div class="col-12 mt-3">
                    <div class="heading text-center">
                        <h1>Registration From </h1>
                    </div>
                    <div v-if="error" class="alert alert-danger">
                        {{ error }}
                    </div>
                    <div v-if="msg" class="alert alert-success">
                        {{ msg }}
                    </div>
                    <div class="row">
                        <div class="col-md-8 col-lg-6 col-xl-5">
                            <div class="form-outline">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-control form-control-lg" v-model="postData.firstName"
                                    required />

                            </div>
                        </div>
                        <div class="col-md-6 mb-2">
                            <div class="form-outline">
                                <label class="form-label" for="form3Example1n">Last Name</label>
                                <input type="text" class="form-control form-control-lg" v-model="postData.lastName"
                                    required />

                            </div>
                        </div>
                    </div>
                    <div class="form-outline mb-2">
                        <label class="form-label" for="form3Example97">Email ID</label>
                        <input type="text" class="form-control form-control-lg" v-model="postData.email" required />

                    </div>

                    <div class="form-outline mb-2">
                        <label class="form-label" for="form3Example8">Phone Number</label>
                        <input type="number" class="form-control form-control-lg" v-model="postData.phoneno" required />

                    </div>

                    <div class="form-outline mb-2">
                        <label class="form-label" for="form3Example90">Password</label>
                        <input type="password" class="form-control form-control-lg" v-model="postData.password"
                            required />

                    </div>
                    <div class="form-outline mb-2">
                        <label class="form-label" for="form3Example90">Confirm Password</label>
                        <input type="text" class="form-control form-control-lg" v-model="postData.C_password"
                            required />

                    </div>

                    <div class="d-flex pt-3">
                        <button type="button" class="btn btn-success btn-lg " @click="submit">Submit</button>
                        <button type="reset" class="btn btn-secondary btn-lg ms-2" @click="clear">clear</button>
                    </div>
                    <p class="small fw-bold  pt-1 mb-0">Do have an account? <router-link to="/Login"
                            class="link-danger">Signin</router-link></p>
                </div>
            </div>
        </div>
        <div class="bg-light p-4">
        <Footer />
        </div>
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
                axios.post("http://192.168.1.161:8000/api/register", this.postData)
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