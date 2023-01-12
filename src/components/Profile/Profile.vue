<template>
    <div class="container">
<div class="row">
    <div class="topNV col-sm-12 ">
            <Header :cart='CountData.no' />
        </div>
      <div class="col-lg-4">
        <div class="card m-5 font12">
          <div class="card-body text-center " >
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style="width: 150px;">
            <h5 class="my-3">{{ CountData.name }}</h5>
            <p class="text-muted mb-1">{{ CountData.Role }}</p>
            <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
          </div>
        </div>
        </div>
        <div class="col-lg-8">
        <div class="card m-5 font12">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ CountData.name }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Mobile</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ CountData.number }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ CountData.Email }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Changed Password</p>
              </div>
              <div class="col-sm-9">
                <p class="password-muted mb-0">(098) 765-4321</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">DOB</p>
              </div>
              <div class="col-sm-9">
                <p class="date-muted mb-0"></p>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Time-Zone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
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
</template>
<script>
import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';
export default{
    name:"Profile",
    components:{
        Header,
        Footer
    },
    data(){
        return{
            CountData: {
                no: localStorage.getItem("cartcount"),
                name:localStorage.getItem("firstName"),
                Email:localStorage.getItem("Email"),
                number:localStorage.getItem("number"),
                Role:localStorage.getItem("Role")
            },
        }
    }

}
</script>