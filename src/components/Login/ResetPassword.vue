<template>

    <div class="container">

        <div class="row">
            <div class="topNV col-sm-12 ">
                <Header :cart='CountData.no' />
            </div>
            <div class="col-md-6 col-lg-6 col-xl-12">
                <div class=" d-flex justify-content-center">
                    <div class="card  m-5 font12">
                        <div class="card-header">
                            Reset Your Password
                        </div>
                        <div class=" card-body">
                            <div class="col-md-10 mb-2  ">
                                <div class="form-outline">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control form-control-sm" v-model="email" />
                                </div>
                            </div>
                            <div class="col-md-10 mb-2 ">
                                <div class="form-outline">
                                    <label class="form-label">Create New Password</label>
                                    <input type="email" class="form-control form-control-sm" v-model="email" />
                                </div>
                            </div>
                            <div class="col-md-10 mb-2 ">
                                <div class="form-outline">
                                    <label class="form-label">Re-Enter Password</label>
                                    <input type="email" class="form-control form-control-sm" v-model="email" />
                                </div>
                            </div>
                            <div class="col-md-10 mb-2 ">
                                <div class="form-outline ">

                                    <button type="button" class="btn btn-success btn-sm  " @click="login">Update
                                        Password</button>
                                </div>
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
export default {
    name: "ResetPassword",
    components: {
        Header,
        Footer
    },
    data() {
        return {
            CountData: {
                no: localStorage.getItem("cartcount")
            },
        }
    }
}
</script>