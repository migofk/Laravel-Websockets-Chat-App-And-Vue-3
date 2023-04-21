<template>
    <section class="h-100 h-custom bg-light min-h-content" >
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col d-flex justify-content-center align-items-center">
            
            <div class="card border-0 " style="min-width:350px; max-width:500px">
              <div class="card-body">
                <h3 class="mb-4">Sign up</h3>
            <hr/>
                <div class="alert alert-danger alert-dismissible fade show" v-if="ShowError"  role="alert">
                  {{ errorMgs }}
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <form @submit="onSubmit">
                  <div class="mb-3">
                    <label class="form-label">First name</label>
                    <input type="text" class="form-control"
                      v-model.trim="form.first_name"
                      @input="setTouched('first_name')"
                      :class="v$.form.first_name.$error?'is-invalid':''"
                    required>
                    <div class="invalid-feedback"> Please provide your first name </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Last name</label>
                    <input type="text" class="form-control"
                      v-model.trim="form.last_name"
                      @input="setTouched('last_name')"
                      :class="v$.form.last_name.$error?'is-invalid':''"
                    required>
                    <div class="invalid-feedback"> Please provide your Last name</div>
                  </div>
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
                  <div class="mb-3">
                    <label class="form-label">Repeat your password</label>
                    <input type="password" class="form-control"
                      v-model.trim="form.confirmPassword"
                      @input="setTouched('confirmPassword')"
                      :class="v$.form.confirmPassword.$error?'is-invalid':''"
                    required>
                    <div class="invalid-feedback"> Please re-enter password. </div>
                  </div>
                  <div class="mb-3 text-center">
                  <SubmitButton
                      title="Sign up"
                      :isSendingForm="isSendingForm"
                  />
                </div>
                <hr/>

                  </form>
                  <p class="text-center">
                   A member? <router-link  class="mt-3" :to="{ name: 'Login'}"> Sign in </router-link>
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
    import { required, email, sameAs } from '@vuelidate/validators'
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
            first_name: '',
            last_name: '',
            confirmPassword: '',
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
            first_name: {
              required,
            },
            last_name: {
              required,
            },
            confirmPassword: {
                sameAsPassword: sameAs(this.form.password),
            },
          },
        }
      },
      methods: {
        setTouched(theModel) {
          if(theModel == 'email' || theModel == 'all' ){this.v$.form.email.$touch()}
          if(theModel == 'password' || theModel == 'all'){this.v$.form.password.$touch()} 
          if(theModel == 'first_name' || theModel == 'all'){this.v$.form.first_name.$touch()} 
          if(theModel == 'last_name' || theModel == 'all'){this.v$.form.last_name.$touch()} 
          if(theModel == 'confirmPassword' || theModel == 'all'){this.v$.form.confirmPassword.$touch()} 
        },
       async onSubmit(event) {
          event.preventDefault()
          this.setTouched('all');
          if (!this.v$.$invalid) 
          {
           this.isSendingForm = true;
           axios.post(
            this.$store.state.backendUrl+'/register',this.form, 
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
              });
              this.$router.push({
              name: 'emailValidation',
              params: { email: this.form.email.replace(".", "--")},
              })
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