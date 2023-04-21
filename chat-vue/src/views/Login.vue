<template>
<section class="h-100 h-custom bg-light min-h-content mt-5" >
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col d-flex justify-content-center align-items-center">
        
        <div class="card border-0 " style="min-width:350px; max-width:500px">
          <div class="card-body">
            <h3 class="mb-4">Sign in</h3>
        <hr/>
            <div class="alert alert-danger alert-dismissible fade show" v-if="ShowError"  role="alert">
              {{ errorMgs }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <form @submit="onSubmit">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control"
                  v-model.trim="form.email"
                  @input="setTouched('email')"
                  :class="v$.form.email.$error?'is-invalid':''"
                required>
                <div class="invalid-feedback"> Please provide a correct email </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control"
                  v-model.trim="form.password"
                  @input="setTouched('password')"
                  :class="v$.form.password.$error?'is-invalid':''"
                required>
                <div class="invalid-feedback"> Please provide a password. </div>
              </div>
              <div class="mb-3 text-center">
              <SubmitButton
                  title="Login"
                  :isSendingForm="isSendingForm"
              />
            </div>
            <hr/>
            <div class="form-group d-md-flex mb-3">
                <div class="w-50 text-start">
                <label class="checkbox-wrap checkbox-primary mb-0">Remember Me
                  <input type="checkbox" checked>
                  <span class="checkmark"></span>
                </label>
                </div>

              </div>
              </form>
              <p class="text-center">
                Not a member? <router-link  class="mt-3" :to="{ name: 'Register'}"> Sign up </router-link>
              </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import SubmitButton from '../components/SubmitButton.vue'
export default {
  name: 'Login',
  setup() {
    return { v$: useVuelidate() }
  },
  components:{SubmitButton},
  data() {
    return {
      form: {
        email: '',
        password: '',
        recaptcha_token:'',
      },
      errorMgs: '',
      ShowError: false,
      show: true,
      isSendingForm: false,
    }
  },
  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      },
    }
  },
  methods: {
    setTouched(theModel) {
      if(theModel == 'email' || theModel == 'all' ){this.v$.form.email.$touch()}
      if(theModel == 'password' || theModel == 'all'){this.v$.form.password.$touch()} 
    },
    async onSubmit(event) {
      event.preventDefault()
      this.setTouched('all');
      if (!this.v$.$invalid) 
      {
       this.isSendingForm = true;
       axios.post(
        this.$store.state.backendUrl+'/login',this.form, 
        {
          headers: {"Content-Type": "application/json",}
        })
        .then((response) => {
          console.log(response);
      
          this.$store.commit('saveLogin',
          {
            "token":response.data.token,
            "name":response.data.name,
            "image":response.data.image,
            "id":response.data.id,
          });
          this.$router.push('/')
          this.isSendingForm = false;
       
        })
        .catch( (error) => {
          console.log(error);
          this.ShowError=true;
          this.errorMgs = error.response.data.error;
          this.isSendingForm = false;
        });
      
      }
    },
  },
}
</script>